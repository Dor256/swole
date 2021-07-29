import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../common/components/Themed';
import { IWorkout } from '../../api';
import { ScrollView } from 'react-native-gesture-handler';
import { WorkoutItem } from './workout-item';
import { WorkoutsTabParams } from '..';
import { useNavigation } from '../../hooks/useNavigation';

export type WorkoutListProps = {
  workouts: IWorkout[];
};

export const WorkoutList: React.FC<WorkoutListProps> = (props) => {
  const navigation = useNavigation<WorkoutsTabParams>();

  const onWorkoutPress = (name: string) => () => {
    navigation.navigate('Workout', { name });
  };

  if (props.workouts.length == 0) {
    return <Text>Empty Workout List</Text>;
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: '40%',
    alignItems: 'center'
  }
});
