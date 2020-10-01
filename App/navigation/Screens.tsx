import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from '../screens/Home';
import DetailPage from '../screens/DetailPage';

// types
import { RootStackParamList } from '../utils/types';

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack: FC = () => (
  <Stack.Navigator mode="card" headerMode="screen">
    <Stack.Screen name="Home" component={Home} options={{ title: 'Contacts' }} />
    <Stack.Screen
      name="DetailPage"
      component={DetailPage}
      options={({ route }) => ({ title: route.params.item.fullName })}
    />
  </Stack.Navigator>
);

export default HomeStack;
