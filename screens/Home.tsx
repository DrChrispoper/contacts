import React, { FC, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import { Profile } from '../utils/types';
import ProfilePicture from '../components/ProfilePicture';
import ProfileDetails from '../components/ProfileDetails';
import getProfiles from '../utils/loadData';

const NB_ITEMS_SCREEN = 1;

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

interface flatListRefFunc {
  viewableItems: Array<any>;
}

interface renderItem {
  item: Profile;
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
  const listVRef = React.useRef<null | any>(null);
  const listHRef = React.useRef<null | any>(null);
  const [hScroll, sethScroll] = useState(false);
  const [vScroll, setvScroll] = useState(false);

  const scrollToAndSelect = (id: string) => {
    const index = profiles.findIndex(item => item.id === id);

    if (listHRef && listHRef.current && index >= 0) {
      listVRef.current.scrollToIndex({ index, viewPosition: 0 });
    }
  };

  const onViewRef = React.useRef(({ viewableItems }: flatListRefFunc) => {
    if (viewableItems && viewableItems[0] && !hScroll) {
      sethScroll(true);
      setvScroll(false);
      // Use viewable items in state or as intended
      // Get the first viewable item
      const firstViewItem = viewableItems[0].key;
      // Get its index into the items
      const index = profiles.findIndex(item => item.id === firstViewItem);
      // console.log(index);
      if (listHRef && listHRef.current && index >= 0) {
        listHRef.current.scrollToIndex({ index, viewPosition: 0.5 });
        setSelectedId(firstViewItem);
      }
    }
  });

  const onViewRefH = React.useRef(({ viewableItems }: flatListRefFunc) => {
    if (viewableItems && !vScroll) {
      sethScroll(false);
      setvScroll(true);
      // Use viewable items in state or as intended
      // Get the first viewable item
      let itemToSelect = 0;
      if (viewableItems.length === 4) {
        itemToSelect = 1;
      }
      if (viewableItems.length === 5) {
        itemToSelect = 2;
      }
      const firstViewItem = viewableItems[itemToSelect].key;
      console.log(viewableItems.length);
      // Get its index into the items
      const index = profiles.findIndex(item => item.id === firstViewItem);
      // console.log(index);
      if (listHRef && listHRef.current && index >= 0) {
        listVRef.current.scrollToIndex({ index, viewPosition: 0 });
        setSelectedId(firstViewItem);
      }
    }
  });

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
  });

  const itemHeight = ScreenHeight - (StatusBar.currentHeight || 0) - headerHeight - 20;

  const renderItemV = ({ item }: renderItem) => (
    <ProfileDetails
      item={item}
      onPress={() => scrollToAndSelect(item.id)}
      style={{ height: itemHeight }}
    />
  );

  const renderItemH = ({ item }: renderItem) => (
    <ProfilePicture
      item={item}
      onPress={() => scrollToAndSelect(item.id)}
      isSelected={item.id === selectedId}
    />
  );

  const handleScrollH = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log((event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width) * 100);
    if (listVRef && listVRef.current && listVRef.current) {
      // listVRef.current.scrollToOffset({ offset: event.nativeEvent.contentOffset.x * 10 });
    }
  };

  const handleScrollV = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log((event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.height) * 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingLeft: ScreenWidth / 2 - 50 }}
        data={profiles}
        renderItem={renderItemH}
        keyExtractor={item => item.id}
        extraData={selectedId}
        horizontal
        onScroll={handleScrollH}
        style={{ height: 100 }}
        ref={listHRef}
        onViewableItemsChanged={onViewRefH.current}
        onMomentumScrollEnd={({ nativeEvent }) => sethScroll(false)}
      />
      <FlatList
        data={profiles}
        renderItem={renderItemV}
        keyExtractor={item => item.id}
        extraData={selectedId}
        snapToAlignment="start"
        snapToInterval={itemHeight + 16}
        decelerationRate="fast"
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onScroll={handleScrollV}
        ref={listVRef}
        onMomentumScrollEnd={({ nativeEvent }) => setvScroll(false)}
      />
    </SafeAreaView>
  );
};

export default Home;
