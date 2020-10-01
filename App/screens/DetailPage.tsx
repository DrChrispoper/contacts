import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ViewStyle, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../utils/types';
import ProfilePicture from '../components/ProfilePicture';
import ProfileDetails from '../components/ProfileDetails';

interface Style {
  container: ViewStyle;
  image: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'DetailPage'>;

type Props = {
  route: ProfileScreenRouteProp;
};

const DetailPage: FC<Props> = ({ route }: Props): JSX.Element => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <ProfilePicture item={item} />
      </View>

      <ProfileDetails item={item} inDetailsPage />
    </SafeAreaView>
  );
};

export default DetailPage;
