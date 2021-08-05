import React from 'react';
import { StyleSheet } from 'react-native';
import { IWorkout } from '../../common/api';
import { ScrollView } from 'react-native-gesture-handler';
import { WorkoutItem } from './workout-item';
import { useNavigation } from '../../hooks/useNavigation';
import { EmptyList } from './empty-list';
import { BottomTabParamList } from '../../bottom-tabs';
import { FloatingActionButton } from '../../common/components/FloatingActionButton';

export type WorkoutListProps = {
  workouts: IWorkout[];
};

export const WorkoutList: React.FC<WorkoutListProps> = (props) => {
  const navigation = useNavigation<BottomTabParamList>();

  function onWorkoutPress(name: string) {
    return function() {
      navigation.navigate('Workout', { name });
    };
  }

  function onAddWorkoutPress() {
    navigation.navigate('AddWorkout');
  }

  if (props.workouts.length == 0) {
    return <EmptyList />;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.list}>
        {props.workouts.map((workout) => {
          return (
            <WorkoutItem
              key={workout.name}
              workout={workout}
              onPress={onWorkoutPress(workout.name)}
            />
          );
        })}
      </ScrollView>
      <FloatingActionButton onPress={onAddWorkoutPress} />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: '40%',
    alignItems: 'center'
  }
});
