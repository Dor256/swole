import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { TabBarIcon } from '../tab-bar-icon';
import { WorkoutsTab } from '../workouts-tab';
import { ProfileTab } from '../profile-tab';
import { Ports } from '../types';

export type BottomTabParamList = {
  Workouts: undefined;
  Profile: undefined;
};

export type BottomTabNavigatorProps = Ports;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ api }) => {
  const colorScheme = useColorScheme();

  return (
    <Navigator
      initialRouteName="Workouts"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <Screen
        name="Workouts"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="dumbbell" color={color} />
        }}
      >
        {(props) => <WorkoutsTab fetchWorkouts={api.fetchAllWorkouts} {...props} />}
      </Screen>
      <Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user-alt" color={color} />
        }}
      />
    </Navigator>
  );
};
