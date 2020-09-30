import React from 'react';
import { Animated, PanResponder } from 'react-native';
import { Profile } from '../utils/types';
import ProfileDetails from './ProfileDetails';

interface Props {
  profiles: Array<Profile>;
  itemHeight: number;
  selectedId: string;
  detailsRef: React.MutableRefObject<any>;
  scrollY: Animated.Value;
  detsScrolling: (v: { value: number }) => void;
}

const ProfileDetList = ({
  profiles,
  itemHeight,
  selectedId,
  detailsRef,
  scrollY,
  detsScrolling,
}: Props): JSX.Element => {
  const panResponderDetails = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        // setisPics(false);
        console.log('add details listener');
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
    console.log('remove details listener');
    scrollY.removeAllListeners();
  };

  return (
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
      onMomentumScrollEnd={onMomentumScrollEnd}
      scrollEventThrottle={1}
      bounces={false}
      getItemLayout={(data, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
      {...panResponderDetails.panHandlers}
    />
  );
};

export default ProfileDetList;
