/* eslint-disable comma-dangle */
import React, { FC, useState, useRef, useCallback } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Dimensions, Animated, ViewStyle } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import _ from 'lodash';

import getProfiles from '../utils/loadData';
import { checkIndex } from '../utils/help';
import ProfilePicList from '../components/ProfilePicList';
import ProfileDetList from '../components/ProfileDetList';

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

const Home: FC = () => {
  const [selectedId, setSelectedId] = useState<string>(profiles[0].id);
  const headerHeight = useHeaderHeight();
  const detailsRef = React.useRef<null | any>(null);
  const picsRef = React.useRef<null | any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  // const [isPicsScrolling, setisPics] = useState(false);

  const itemHeight = ScreenHeight - (StatusBar.currentHeight || 0) - headerHeight - 20;

  const delayedScrollDetails = useCallback(
    _.throttle(q => {
      detailsRef.current.scrollToOffset({
        offset: (q.value / PICS_WIDTH) * itemHeight,
        animated: false,
      });
    }, 100),
    []
  );

  const checkAndSelectIndex = (index: number) => {
    setSelectedId(profiles[checkIndex(index, profiles.length)].id);
  };

  const picsScrolling = (v: { value: number }) => {
    if (detailsRef?.current) {
      checkAndSelectIndex(Math.round(v.value / PICS_WIDTH));
      delayedScrollDetails(v);
    }
  };

  const detsScrolling = (v: { value: number }) => {
    if (picsRef?.current) {
      checkAndSelectIndex(Math.round(v.value / itemHeight));
      picsRef.current.scrollToOffset({
        offset: (v.value / itemHeight) * PICS_WIDTH,
        animated: false,
      });
    }
  };

  /* React.useEffect(() => {
    if (!isPicsScrolling) {
      scrollY.addListener(v => {
        if (picsRef?.current) {
          checkAndSelectIndex(Math.round(v.value / itemHeight));
          picsRef.current.scrollToOffset({
            offset: (v.value / itemHeight) * PICS_WIDTH,
            animated: false,
          });
        }
      });
    } else {
      scrollX.addListener(v => {
        if (detailsRef?.current) {
          checkAndSelectIndex(Math.round(v.value / PICS_WIDTH));
          delayedScrollDetails(v);
        }
      });
    }

    return function cleanup() {
      scrollX.removeAllListeners();
      scrollY.removeAllListeners();
    };
  }, [isPicsScrolling]); */

  const scrollToAndSelect = (id: string) => {
    const index = profiles.findIndex(item => item.id === id);

    if (detailsRef && detailsRef.current && index >= 0) {
      detailsRef.current.scrollToIndex({ index, viewPosition: 0 });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfilePicList
        profiles={profiles}
        PICS_WIDTH={PICS_WIDTH}
        selectedId={selectedId}
        picsRef={picsRef}
        scrollToAndSelect={scrollToAndSelect}
        scrollX={scrollX}
        picsScrolling={picsScrolling}
      />
      <ProfileDetList
        profiles={profiles}
        itemHeight={itemHeight}
        selectedId={selectedId}
        detailsRef={detailsRef}
        scrollY={scrollY}
        detsScrolling={detsScrolling}
      />
    </SafeAreaView>
  );
};

export default Home;
