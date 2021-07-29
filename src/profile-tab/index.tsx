import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from './profile';

export type ProfileTabParams = {
  Profile: undefined;
};


const { Navigator, Screen } = createStackNavigator<ProfileTabParams>();

export const ProfileTab: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'Profile' }}
      />
    </Navigator>
  );
};
