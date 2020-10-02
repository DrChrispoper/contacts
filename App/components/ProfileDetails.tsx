import React from 'react';
import { StyleSheet, TextStyle, ViewStyle, Text, View } from 'react-native';
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
    paddingRight: 20,
    paddingLeft: 20,
    marginVertical: 0,
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
  style?: ViewStyle;
  inDetailsPage?: boolean;
}

class ProfileDetails extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { item, style, inDetailsPage = false } = this.props;
    return (
      <View style={[styles.item, style]}>
        {!inDetailsPage && (
          <View style={styles.name}>
            <Text style={styles.name}>
              <Text style={styles.firstName}>{item.firstName}</Text>
              {` ${item.lastName}`}
            </Text>
          </View>
        )}
        <Text style={styles.role}>{item.role}</Text>
        <Text style={styles.aboutTitle}>About me</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }
}

export default ProfileDetails;
