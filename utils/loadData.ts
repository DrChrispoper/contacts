import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import profilesJSON from '../constants/profiles.json';
import { Profile } from './types';
import images from './imageLoader';

const getProfiles = (): Array<Profile> => {
  const profiles: Array<Profile> = [];

  profilesJSON.data.forEach(jsonProfile => {
    const imgURL: string = jsonProfile.name.split(' ')[0];

    const profile: Profile = {
      id: uuidv4(),
      name: jsonProfile.name,
      role: jsonProfile.role,
      picture: images[imgURL],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };

    profiles.push(profile);
  });

  return profiles;
};

export default getProfiles;
