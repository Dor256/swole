import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../common/constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { TabBarIcon } from '../common/components/TabBarIcon';
import { WorkoutsTab } from '../workouts-tab';
import { ProfileTab } from '../profile-tab';
import { Ports } from '../types';

export type BottomTabParamList = {
  WorkoutsTab: undefined;
  ProfileTab: undefined;
};

export type BottomTabNavigatorProps = Ports;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ api }) => {
  const colorScheme = useColorScheme();

  return (
    <Navigator
      initialRouteName="WorkoutsTab"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false }}
    >
      <Screen
        name="WorkoutsTab"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="dumbbell" color={color} />,
          title: 'Workouts'
        }}
      >
        {(props) => <WorkoutsTab api={api} {...props} />}
      </Screen>
      <Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user-alt" color={color} />,
          title: 'Profile'
        }}
      />
    </Navigator>
  );
};
