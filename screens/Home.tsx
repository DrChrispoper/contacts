import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '4dqdsq',
    title: '4th Item',
  },
  {
    id: '5dsdsq',
    title: '5th Item',
  },
  {
    id: '6dqsdqs',
    title: '6th Item',
  },
  {
    id: '7dsqdsq',
    title: '7th Item',
  },
];

const NB_ITEMS_SCREEN = 1;

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemH: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 32,
  },
});

const ItemH = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.itemH, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const ItemV = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const Home: FC = () => {
  const [selectedId, setSelectedId] = useState(null);
  const headerHeight = useHeaderHeight();
  const [currentPage, setCurrentPage] = useState(0);
  const listVRef = React.useRef(null);

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems) {
      // Use viewable items in state or as intended
      // Get the first viewable item
      const firstViewItem = viewableItems[0].key;
      // Get its index into the items
      const index = DATA.findIndex(item => item.id === firstViewItem);
      console.log(index);
      // If the index is a multiple of the number of items displayable on the screen
      // by checking for a reminder on the modulo operation
      if (index % NB_ITEMS_SCREEN === 0) {
        // get page
        const newCurrentPage = index / NB_ITEMS_SCREEN;
        if (newCurrentPage !== currentPage) {
          setCurrentPage(newCurrentPage);
        }
      }
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  const itemHeight = ScreenHeight - (StatusBar.currentHeight || 0) - headerHeight - 20;

  const renderItemV = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <ItemV
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor, height: itemHeight }}
      />
    );
  };

  const renderItemH = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return <ItemH item={item} onPress={() => setSelectedId(item.id)} style={{ backgroundColor }} />;
  };

  const handleScrollH = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log((event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width) * 100);
    if (listVRef && listVRef.current && listVRef.current.scrollToOffset) {
      listVRef.current.scrollToOffset({ offset: event.nativeEvent.contentOffset.x * 10 });
    }
  };

  const handleScrollV = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log((event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.height) * 100);
    // console.log();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingLeft: ScreenWidth / 2 - 50 }}
        data={DATA}
        renderItem={renderItemH}
        keyExtractor={item => item.id}
        extraData={selectedId}
        snapToAlignment="start"
        snapToInterval={50 + 16}
        decelerationRate="fast"
        horizontal
        onScroll={handleScrollH}
      />
      <FlatList
        data={DATA}
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
      />
    </SafeAreaView>
  );
};

export default Home;
