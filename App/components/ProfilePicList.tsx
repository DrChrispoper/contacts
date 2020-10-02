import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Profile } from '../utils/types';
import ProfilePicture from './ProfilePicture';

const ScreenWidth = Dimensions.get('window').width;

interface Props {
  profiles: Array<Profile>;
  PICS_WIDTH: number;
  selectedId: string;
  picsRef: any;
  scrollToAndSelect: (id: string) => void;
  scrollHandlerPics: any;
}

const ProfilePicList = ({
  profiles,
  PICS_WIDTH,
  selectedId,
  picsRef,
  scrollToAndSelect,
  scrollHandlerPics,
}: Props): JSX.Element => (
  <FlatList
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
        inDetailsPage
      />
    )}
    keyExtractor={item => item.id}
    extraData={selectedId}
    snapToAlignment="start"
    snapToInterval={PICS_WIDTH}
    decelerationRate="fast"
    style={{ height: 100 }}
    horizontal
    renderScrollComponent={props => <Animated.ScrollView {...props} onScroll={scrollHandlerPics} />}
    ref={picsRef}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={1}
    initialNumToRender={profiles.length}
    getItemLayout={(data, index) => ({ length: PICS_WIDTH, offset: PICS_WIDTH * index, index })}
  />
);
export default ProfilePicList;
