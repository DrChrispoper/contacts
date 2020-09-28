import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
}
