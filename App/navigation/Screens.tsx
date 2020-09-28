import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from '../screens/Home';

const Stack = createStackNavigator();

const HomeStack: FC = () => (
  <Stack.Navigator mode="card" headerMode="screen">
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ title: 'Contacts' }}
    />
  </Stack.Navigator>
);

export default HomeStack;
