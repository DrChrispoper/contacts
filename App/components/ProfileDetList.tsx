import React from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { Profile } from '../utils/types';
import ProfileDetails from './ProfileDetails';

interface Props {
  profiles: Array<Profile>;
  itemHeight: number;
  detailsRef: any;
  scrollHandlerDetails: any;
}

const ProfileDetList = ({
  profiles,
  itemHeight,
  detailsRef,
  scrollHandlerDetails,
}: Props): JSX.Element => (
  /* const panResponderDetails = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        // setisPics(false);
        scrollY.addListener(v => {
          detsScrolling(v);
        });
        return false;
      },
      // eslint-disable-next-line comma-dangle
    })
  ).current;

  const onScrollDetails = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });

  const onMomentumScrollEnd = () => {
    scrollY.removeAllListeners();
  }; */

  <FlatList
    data={profiles}
    renderItem={({ item }) => <ProfileDetails item={item} style={{ height: itemHeight }} />}
    keyExtractor={item => item.id}
    snapToAlignment="start"
    snapToInterval={itemHeight}
    decelerationRate="fast"
    renderScrollComponent={props => (
      <Animated.ScrollView {...props} onScroll={scrollHandlerDetails} />
    )}
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={1}
    ref={detailsRef}
    bounces={false}
    initialNumToRender={profiles.length}
    getItemLayout={(data, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
  />
);
export default ProfileDetList;
