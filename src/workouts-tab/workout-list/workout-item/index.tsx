import React from 'react';
import { StyleSheet } from 'react-native';
import { IWorkout } from '../../../common/api';
import { Card } from '../../../common/components/Card';
import { Text } from '../../../common/components/Themed';
import { GoalsToEmoji } from '../../../common/constants/GoalsToEmoji';

export type WorkoutItemProps = {
  workout: IWorkout;
  onPress(): void;
}

export const WorkoutItem: React.FC<WorkoutItemProps> = (props) => {
  return (
    <Card style={styles.item} onPress={props.onPress}>
      <Text>{GoalsToEmoji[props.workout.goal]}  {props.workout.name}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20
  }
});
