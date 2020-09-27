import { ImageSourcePropType } from 'react-native';

export interface Profile {
  id: string;
  name: string;
  role: string;
  picture: ImageSourcePropType;
  description: string;
}
