import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../../common/components/Button';
import { View } from '../../common/components/Themed';

export type AddWorkoutProps = {
  onAddWorkout(): void;
};

export const AddWorkout: React.FC<AddWorkoutProps> = (props) => {
  return (
    <View style={styles.container}>
      <Button onPress={props.onAddWorkout}>
        Add Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
  }
});
