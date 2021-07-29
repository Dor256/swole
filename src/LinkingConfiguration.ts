import * as Linking from 'expo-linking';

export default {
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
