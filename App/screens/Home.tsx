import React, { FC, useState, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  ViewStyle,
  PanResponder,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import ProfilePicture from '../components/ProfilePicture';
import ProfileDetails from '../components/ProfileDetails';
import getProfiles from '../utils/loadData';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

interface flatListRefFunc {
  viewableItems: Array<any>;
}

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
});

const profiles = getProfiles();

const Home: FC = () => {
  const [selectedId, setSelectedId] = useState<string>(profiles[0].id);
  const headerHeight = useHeaderHeight();
  const detailsRef = React.useRef<null | any>(null);
  const picsRef = React.useRef<null | any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isPicsScrolling, setisPics] = useState(false);

  const panResponderPics = React.useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        if (!isPicsScrolling) {
          setisPics(true);
        }
      },
      // eslint-disable-next-line comma-dangle
    })
  ).current;

  const panResponderDetails = React.useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        if (isPicsScrolling) {
          setisPics(false);
        }
      },
      // eslint-disable-next-line comma-dangle
    })
  ).current;

  const onScrollDetails = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });

  const onScrollPics = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: true,
  });

  const itemHeight = ScreenHeight - (StatusBar.currentHeight || 0) - headerHeight - 20;

  React.useEffect(() => {
    if (!isPicsScrolling) {
      scrollY.addListener(v => {
        if (picsRef?.current) {
          /* picsRef.current.scrollToIndex({
            index: Math.round(v.value / 86),
            animated: true,
          }); */

          picsRef.current.scrollToOffset({
            offset: (v.value / itemHeight) * 86,
            animated: false,
          });
        }
      });
    } else {
      scrollX.addListener(v => {
        if (detailsRef?.current) {
          console.log('scroll to v.value:', Math.round(v.value / 86));
          detailsRef.current.scrollToIndex({ index: Math.round(v.value / 86), animated: true });
          /* detailsRef.current.scrollToOffset({
            offset: (v.value / 86) * itemHeight,
            animated: false,
          }); */
        }
      });
    }

    return function cleanup() {
      scrollX.removeAllListeners();
      scrollY.removeAllListeners();
    };
  }, [isPicsScrolling]);

  const scrollToAndSelect = (id: string) => {
    const index = profiles.findIndex(item => item.id === id);

    if (detailsRef && detailsRef.current && index >= 0) {
      detailsRef.current.scrollToIndex({ index, viewPosition: 0 });
    }
  };

  const onViewRef = React.useRef(({ viewableItems }: flatListRefFunc) => {
    if (viewableItems && viewableItems[0]) {
      // Use viewable items in state or as intended
      // Get the first viewable item
      const firstViewItem = viewableItems[0].key;
      // Get its index into the items
      const index = profiles.findIndex(item => item.id === firstViewItem);
      // console.log(index);
      if (index >= 0 && firstViewItem !== selectedId) {
        setSelectedId(firstViewItem);
      }
    }
  });

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={{
          paddingLeft: ScreenWidth / 2 - 70 / 2,
          paddingRight: ScreenWidth / 2 - 70 / 2,
        }}
        data={profiles}
        renderItem={({ item }) => (
          <ProfilePicture
            item={item}
            onPress={() => scrollToAndSelect(item.id)}
            isSelected={item.id === selectedId}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selectedId}
        horizontal
        snapToAlignment="start"
        snapToInterval={70 + 16}
        decelerationRate="fast"
        style={{ height: 100 }}
        ref={picsRef}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScrollPics}
        {...panResponderPics.panHandlers}
      />
      <Animated.FlatList
        data={profiles}
        renderItem={({ item }) => <ProfileDetails item={item} style={{ height: itemHeight }} />}
        keyExtractor={item => item.id}
        extraData={selectedId}
        snapToAlignment="start"
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        ref={detailsRef}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollDetails}
        scrollEventThrottle={16}
        bounces={false}
        getItemLayout={(data, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
        {...panResponderDetails.panHandlers}
      />
    </SafeAreaView>
  );
};

export default Home;
