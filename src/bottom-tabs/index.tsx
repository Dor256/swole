import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Maybe } from '@unpacked/tool-belt';
import { IWorkout } from '../common/api';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../common/constants/Colors';
import { TabBarIcon } from '../common/components/TabBarIcon';
import { Loader } from '../common/components/Loader';
import { WorkoutList } from '../workouts-tab/workout-list';
import { Profile } from '../profile-tab/profile';
import { FloatingActionButton } from '../common/components/FloatingActionButton';
import { useNavigation } from '../hooks/useNavigation';

export type BottomTabParamList = {
  Workouts: undefined;
  Profile: undefined;
  Workout: { name: string };
  AddWorkout: undefined;
};

const { Navigator: TabNavigator, Screen: Tab } = createBottomTabNavigator<BottomTabParamList>();

export type TabProps = {
  fetchWorkouts(): Promise<void>;
  maybeWorkouts: Maybe<IWorkout[]>;
}

export const BottomTabs: React.FC<TabProps> = (props) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<BottomTabParamList>();

  useEffect(() => {
    props.fetchWorkouts();
  }, []);

  function onAddWorkout() {
    navigation.navigate('AddWorkout');
  }

  return (
    <TabNavigator
      initialRouteName="Workouts"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <Tab
        name="Workouts"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="dumbbell" color={color} />
        }}
      >
        {() => {
          return props.maybeWorkouts.inCaseOf({
            Nothing: () => <Loader />,
            Just: (workouts) => {
             return (
                <>
                  <WorkoutList workouts={workouts} />
                  <FloatingActionButton onPress={onAddWorkout} />
                </>
             );
            }
          });
        }}
      </Tab>
      <Tab
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user-alt" color={color} />
        }}
      />
    </TabNavigator>
  );
};
