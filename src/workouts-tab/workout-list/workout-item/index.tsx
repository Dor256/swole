import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { IWorkout } from '../../../common/api';
import { Text } from '../../../common/components/Themed';

export type WorkoutItemProps = {
  workout: IWorkout;
  onPress(): void;
}

export const WorkoutItem: React.FC<WorkoutItemProps> = (props) => {
  return (
    <Pressable style={styles.item} onPress={props.onPress}>
      <Text>{props.workout.goal === 'strength' ? '🏋️' : '💪'}  {props.workout.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    padding: 10,
    width: '70%',
    alignItems: 'center',
    borderColor: '#616161',
    backgroundColor: '#383838',
    borderWidth: 1,
    borderRadius: 10
  }
});
