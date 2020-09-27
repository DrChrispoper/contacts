import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle, Text, View } from 'react-native';
import { Profile } from '../utils/types';

interface Style {
  item: ViewStyle;
  firstName: TextStyle;
  name: TextStyle;
  role: TextStyle;
  aboutTitle: TextStyle;
  description: TextStyle;
}

const styles = StyleSheet.create<Style>({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  firstName: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '300',
  },
  role: {
    fontSize: 14,
    textAlign: 'center',
    color: '#808080',
  },
  aboutTitle: {
    paddingTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#808080',
    fontWeight: '300',
  },
});

interface Props {
  item: Profile;
  onPress: () => void;
  style: ViewStyle;
}

const ProfileDetails: React.FC<Props> = ({ item, onPress, style }: Props) => {
  const names = item.name.split(' ');
  const firstName = names.shift();
  const lastName = names.join(' ');

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={styles.name}>
        <Text style={styles.name}>
          <Text style={styles.firstName}>{firstName}</Text>
          {` ${lastName}`}
        </Text>
      </View>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.aboutTitle}>About me</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );
};

export default ProfileDetails;
