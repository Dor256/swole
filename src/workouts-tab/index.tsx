import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkoutList } from './workout-list';
import { Workout } from './workout';
import { IWorkout } from '../common/api';
import { Maybe } from '@unpacked/tool-belt';
import { useMaybeState } from '../hooks/useMaybeState';
import { Loader } from '../common/components/Loader';
import { AddWorkout } from './add-workout';

export type WorkoutsTabParams = {
  WorkoutList: { workouts: Maybe<IWorkout[]> };
  Workout: { name: string };
  AddWorkout: undefined;
  Main: undefined;
};

export type WorkoutsTabProps = {
  fetchWorkouts(): Promise<Maybe<IWorkout[]>>;
};

const { Navigator, Screen } = createStackNavigator<WorkoutsTabParams>();

const MainStack: React.FC<WorkoutsTabProps> = (props) => {
  const [maybeWorkouts, setMaybeWorkouts] = useMaybeState<IWorkout[]>();

  async function fetchWorkouts() {
    const workouts = await props.fetchWorkouts();
    setMaybeWorkouts(workouts);
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Navigator screenOptions={{ headerShown: false }}>
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
    </Navigator>
  );
};

export const WorkoutsTab: React.FC<WorkoutsTabProps> = (props) => {
 

  return (
    <Navigator mode="modal">
      <Screen name="Main" options={{ title: 'Workouts' }}>
        {(navProps) => <MainStack {...props} {...navProps} />}
      </Screen>
      <Screen name="AddWorkout">
        {(props) => <AddWorkout onAddWorkout={() => console.log('LALALA')} {...props} />}
      </Screen>
    </Navigator>
  );
};
