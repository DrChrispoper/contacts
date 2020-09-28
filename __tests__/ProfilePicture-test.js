/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableOpacity } from 'react-native';
import ProfilePicture from '../components/ProfilePicture';

Enzyme.configure({ adapter: new Adapter() });

describe('Profile Picture Component', () => {
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

  test('renders correctly', () => {
    const onPressEvent = jest.fn();

    const tree = renderer
      .create(<ProfilePicture item={profile} onPress={onPressEvent} isSelected={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles onPress', () => {
    // Create a mock function to pass as a handler
    const onPress = jest.fn();

    // Render our component
    const wrapper = shallow(<ProfilePicture item={profile} onPress={onPress} isSelected={false} />);
    // Find a TouchableOpacity and press it
    wrapper.find(TouchableOpacity).first().props().onPress();

    // Check that our handler have been called 1 time
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
