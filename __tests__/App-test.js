import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from '../App/App';
import HomeStack from '../App/navigation/Screens';

/* describe('HomeStack', () => {
  it('renders the correct screen', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );
    await waitFor(() => getByText('Home'));
  });
});

describe('App', () => {
  it('renders home stack', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => getByText('Home'));
  });
}); */
