import { ImageSourcePropType } from 'react-native';

export interface Profile {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  picture: ImageSourcePropType;
  description: string;
}
