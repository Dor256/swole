import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '.';

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          WorkoutsTab: {
            screens: {
              WorkoutList: 'one'
            }
          },
          ProfileTab: {
            screens: {
              Profile: 'two'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
