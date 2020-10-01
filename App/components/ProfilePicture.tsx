import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Profile } from '../utils/types';

const styles = StyleSheet.create({
  item: {
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 8,
    width: 70,
    height: 70,
    transform: [{ rotate: '90deg' }],
  },
  active: {
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#b1d8ff',
    borderRadius: 70 / 2,
  },
});

interface Props {
  item: Profile;
  onPress?: () => void;
  isSelected?: boolean;
}

class ProfilePicture extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { item, onPress, isSelected = false } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, isSelected && styles.active]}>
        <Image source={item.picture} />
      </TouchableOpacity>
    );
  }
}

export default ProfilePicture;
