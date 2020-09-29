/* eslint-disable comma-dangle */
import React, { FC, useState, useRef, useCallback } from 'react';
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
import _ from 'lodash';

import ProfilePicture from '../components/ProfilePicture';
import ProfileDetails from '../components/ProfileDetails';
import getProfiles from '../utils/loadData';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

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
        setisPics(true);
      },
      // eslint-disable-next-line comma-dangle
    })
  ).current;

  const panResponderDetails = React.useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        setisPics(false);
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

  const checkIndex = (index: number): number => {
    let checkedIndex = 0;

    // Check for out of bounds index from scroll bouncing;
    if (index >= 0) {
      if (index >= profiles.length) {
        checkedIndex = profiles.length - 1;
      } else {
        checkedIndex = index;
      }
    }

    return checkedIndex;
  };

  const delayedScrollDetails = useCallback(
    _.throttle(q => {
      detailsRef.current.scrollToIndex({
        index: checkIndex(Math.round(q.value / 86)),
        animated: true,
      });
    }, 100),
    []
  );

  const delayedScrollPics = useCallback(
    _.throttle(q => {
      picsRef.current.scrollToOffset({ offset: (q.value / itemHeight) * 86, animated: false });
    }, 0),
    []
  );

  const checkAndSelectIndex = (index: number) => {
    setSelectedId(profiles[checkIndex(index)].id);
  };

  React.useEffect(() => {
    if (!isPicsScrolling) {
      scrollY.addListener(v => {
        if (picsRef?.current) {
          checkAndSelectIndex(Math.round(v.value / itemHeight));
          delayedScrollPics(v);
        }
      });
    } else {
      scrollX.addListener(v => {
        if (detailsRef?.current) {
          checkAndSelectIndex(Math.round(v.value / 86));
          delayedScrollDetails(v);
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
