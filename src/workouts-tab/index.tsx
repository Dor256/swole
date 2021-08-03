import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { WorkoutList } from './workout-list';
import { Workout } from './workout';
import { Api, IWorkout } from '../common/api';
import { Maybe } from '@unpacked/tool-belt';
import { useMaybeState } from '../hooks/useMaybeState';
import { Loader } from '../common/components/Loader';
import { AddWorkout } from './add-workout';
import { ModalCloseIcon } from '../common/components/ModalCloseIcon';
import { useNavigation } from '../hooks/useNavigation';

export type WorkoutsTabParams = {
  WorkoutList: { workouts: Maybe<IWorkout[]> };
  Workout: { name: string };
  AddWorkout: undefined;
};

export type WorkoutsTabProps = {
  api: Api;
};

const { Navigator, Screen, Group } = createStackNavigator<WorkoutsTabParams>();

export const WorkoutsTab: React.FC<WorkoutsTabProps> = ({ api }) => {
  const [maybeWorkouts, setMaybeWorkouts] = useMaybeState<IWorkout[]>();

  const navigation = useNavigation<WorkoutsTabParams>();

  async function fetchWorkouts() {
    const workouts = await api.fetchAllWorkouts();
    setMaybeWorkouts(workouts);
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

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
    <Navigator screenOptions={{ title: 'Workouts' }}>
      <Group>
        <Screen name="WorkoutList">
          {(props) => {
            return maybeWorkouts.inCaseOf({
              Just: (workouts) => <WorkoutList workouts={workouts} {...props} />,
              Nothing: () => <Loader />
            });
          }}
        </Screen>
        <Screen
          name="Workout"
          component={Workout}
        />
      </Group>
      <Group screenOptions={modalOptions}>
        <Screen options={{ title: 'Add Workout' }} name="AddWorkout">
          {(props) => <AddWorkout addWorkout={addWorkout} {...props} />}
        </Screen>
      </Group>
    </Navigator>
  );
};

const modalOptions: StackNavigationOptions = {
  presentation: 'modal',
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerBackImage: ModalCloseIcon,
  headerBackTitleVisible: false
};
