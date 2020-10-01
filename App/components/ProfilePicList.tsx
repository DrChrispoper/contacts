import React from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import { Profile } from '../utils/types';
import ProfilePicture from './ProfilePicture';

const ScreenWidth = Dimensions.get('window').width;

interface Props {
  profiles: Array<Profile>;
  PICS_WIDTH: number;
  selectedId: string;
  picsRef: React.MutableRefObject<any>;
  scrollToAndSelect: (id: string) => void;
  scrollX: Animated.Value;
  picsScrolling: (v: { value: number }) => void;
}

const ProfilePicList = ({
  profiles,
  PICS_WIDTH,
  selectedId,
  picsRef,
  scrollToAndSelect,
  scrollX,
  picsScrolling,
}: Props): JSX.Element => {
  const panResponderPics = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        // Listen for your events and show UI feedback here
        // setisPics(true);
        scrollX.addListener(v => {
          picsScrolling(v);
        });
        return false;
      },
      // eslint-disable-next-line comma-dangle
    })
  ).current;

  const onScrollPics = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: true,
  });

  const onMomentumScrollEnd = () => {
    scrollX.removeAllListeners();
  };

  return (
    <Animated.FlatList
      contentContainerStyle={{
        paddingLeft: ScreenWidth / 2 - PICS_WIDTH / 2,
        paddingRight: ScreenWidth / 2 - PICS_WIDTH / 2,
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
      snapToInterval={PICS_WIDTH}
      decelerationRate="fast"
      style={{ height: 100 }}
      ref={picsRef}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={1}
      onScroll={onScrollPics}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={(data, index) => ({ length: PICS_WIDTH, offset: PICS_WIDTH * index, index })}
      {...panResponderPics.panHandlers}
    />
  );
};

export default ProfilePicList;
