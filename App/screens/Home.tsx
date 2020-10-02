/* eslint-disable comma-dangle */
import React, { FC, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Dimensions, ViewStyle, Platform } from 'react-native';
import { useHeaderHeight, StackNavigationProp } from '@react-navigation/stack';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
} from 'react-native-reanimated';

import getProfiles from '../utils/loadData';
import { checkIndex } from '../utils/help';
import ProfilePicList from '../components/ProfilePicList';
import ProfileDetList from '../components/ProfileDetList';
import { RootStackParamList } from '../utils/types';

const ScreenHeight = Dimensions.get('window').height;
const PICS_WIDTH = 86;

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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: FC<Props> = ({ navigation }: Props) => {
  const [selectedId, setSelectedId] = useState<string>(profiles[0].id);
  const headerHeight = useHeaderHeight();
  const detailsRef: any = useAnimatedRef();
  const picsRef: any = useAnimatedRef();
  const isScrollingPics = useSharedValue(false);
  const isScrollingDetails = useSharedValue(false);
  const transYD = useSharedValue(0);
  const transYP = useSharedValue(0);
  const sharedSelectedId = useSharedValue(0);

  const itemHeight = ScreenHeight - (StatusBar.currentHeight || 0) - headerHeight - 20;

  const checkAndSelectIndex = (index: number) => {
    const checked = checkIndex(index, profiles.length);
    const { id } = profiles[checked];
    setSelectedId(id);
  };

  const scrollToAndSelect = (id: string) => {
    const index = profiles.findIndex(item => item.id === id);

    if (selectedId === id) {
      navigation.navigate('DetailPage', { item: profiles[index] });
    } else {
      sharedSelectedId.value = index;
      if (Platform.OS === 'android') {
        setSelectedId(id);
      }
    }
  };

  useDerivedValue(() => {
    scrollTo(detailsRef, 0, sharedSelectedId.value * itemHeight, true);
    scrollTo(picsRef, 0, sharedSelectedId.value * PICS_WIDTH, true);
  });
  const scrollHandlerPics = useAnimatedScrollHandler({
    onScroll: event => {
      transYP.value = event.contentOffset.y;

      const index = Math.round(event.contentOffset.y / PICS_WIDTH);
      if (Platform.OS === 'ios') {
        checkAndSelectIndex(index);
      }
      const offset = (event.contentOffset.y / PICS_WIDTH) * itemHeight;
      scrollTo(detailsRef, 0, offset, false);
    },
    onBeginDrag: () => {
      isScrollingPics.value = true;
    },
    onEndDrag: () => {
      isScrollingPics.value = false;
    },
    onMomentumEnd: event => {
      const index = Math.round(event.contentOffset.y / PICS_WIDTH);
      checkAndSelectIndex(index);
    },
  });

  const scrollHandlerDetails = useAnimatedScrollHandler({
    onScroll: event => {
      transYD.value = event.contentOffset.y;
      const index = Math.round(event.contentOffset.y / itemHeight);
      if (Platform.OS === 'ios') {
        checkAndSelectIndex(index);
      }
      const offset = (event.contentOffset.y / itemHeight) * PICS_WIDTH;
      scrollTo(picsRef, 0, offset, false);
    },
    onBeginDrag: () => {
      isScrollingDetails.value = true;
    },
    onEndDrag: () => {
      isScrollingDetails.value = false;
    },
    onMomentumEnd: event => {
      const index = Math.round(event.contentOffset.y / itemHeight);
      checkAndSelectIndex(index);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ProfilePicList
        profiles={profiles}
        PICS_WIDTH={PICS_WIDTH}
        selectedId={selectedId}
        picsRef={picsRef}
        scrollToAndSelect={scrollToAndSelect}
        scrollHandlerPics={scrollHandlerPics}
      />
      <ProfileDetList
        profiles={profiles}
        itemHeight={itemHeight}
        detailsRef={detailsRef}
        scrollHandlerDetails={scrollHandlerDetails}
      />
    </SafeAreaView>
  );
};

export default Home;
