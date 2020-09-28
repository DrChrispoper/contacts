import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import ProfileDetails from '../App/components/ProfileDetails';

test('renders correctly', () => {
  const profile = {
    id: 'DJKDSQLDQKS',
    fullName: 'Christopher Hockley',
    firstName: 'Christopher',
    lastName: 'Hockley',
    role: 'Developer',
    picture: jest.mock('../assets/images/avatars/Allan-Munger.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  };

  const tree = renderer.create(<ProfileDetails item={profile} style={{ height: 580 }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
