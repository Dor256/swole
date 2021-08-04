import React from 'react';
import { Ports } from '../types';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { IWorkout } from '../common/api';
import { Workout } from '../workouts-tab/workout';
import { AddWorkout } from '../workouts-tab/add-workout';
import { useNavigation } from '../hooks/useNavigation';
import { ModalCloseIcon } from '../common/components/ModalCloseIcon';
import { useMaybeState } from '../hooks/useMaybeState';
import { BottomTabParamList, BottomTabs } from '../bottom-tabs';

export type HomeProps = Ports;

const { Navigator, Screen } = createStackNavigator();

export const Home: React.FC<HomeProps> = ({ api }) => {
  const [maybeWorkouts, setMaybeWorkouts] = useMaybeState<IWorkout[]>();
  const navigation = useNavigation<BottomTabParamList>();

  async function fetchWorkouts() {
    const workouts = await api.fetchAllWorkouts();
    setMaybeWorkouts(workouts);
  }

  async function addWorkout(workout: Omit<IWorkout, 'id'>) {
    try {
      await api.addWorkout(workout);
      fetchWorkouts();
      navigation.goBack();
    } catch (err) {
      console.warn('Adding workout failed');
    }
  }

  return (
    <Navigator>
      <Screen
        name="BottomTabs"
        options={{ headerShown: false }}
      >
        {(props) => {
          return (
            <BottomTabs
              maybeWorkouts={maybeWorkouts}
              fetchWorkouts={fetchWorkouts}
              {...props}
            />
          );
        }}
      </Screen>
      <Screen
        name="Workout"
        options={{ headerBackTitle: 'Back' }}
        component={Workout}
      />
      <Screen options={{ title: 'Add Workout', ...modalOptions }} name="AddWorkout">
        {(props) => <AddWorkout addWorkout={addWorkout} {...props} />}
      </Screen>
    </Navigator>
  );
};

const modalOptions: StackNavigationOptions = {
  presentation: 'modal',
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerBackImage: ModalCloseIcon,
  headerBackTitleVisible: false
};
