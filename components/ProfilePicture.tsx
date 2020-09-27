import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Profile } from '../utils/types';
import { Allan } from '../utils/imageLoader';

const styles = StyleSheet.create({
  item: {
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 70,
    height: 70,
  },
  active: {
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#b1d8ff',
    borderRadius: 150 / 2,
  },
});

interface Props {
  item: Profile;
  onPress: () => void;
  isSelected: boolean;
}

const ProfilePicture: React.FC<Props> = ({ item, onPress, isSelected }: Props) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, isSelected && styles.active]}>
    <Image source={item.picture} />
  </TouchableOpacity>
);

export default ProfilePicture;
