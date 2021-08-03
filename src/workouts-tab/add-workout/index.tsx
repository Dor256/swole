import { Maybe } from '@unpacked/tool-belt';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Goal, IWorkout } from '../../common/api';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { useThemeColor, View } from '../../common/components/Themed';
import { useMaybeState } from '../../hooks/useMaybeState';
import { Picker } from '@react-native-picker/picker';

export type AddWorkoutProps = {
  addWorkout(workout: Omit<IWorkout, 'id'>): Promise<void>;
};

export const AddWorkout: React.FC<AddWorkoutProps> = (props) => {
  const [maybeName, setMaybeName] = useMaybeState<string>();
  const [goal, setGoal] = useState<Goal>('strength');
  const color = useThemeColor({}, 'text');

  function onAddWorkout() {
    maybeName.inCaseOf({
      Nothing: () => console.warn('Must enter name'),
      Just: async (name) => {
        await props.addWorkout({ name, goal });
      }
    });
  }

  function onNameChange(text: string) {
    setMaybeName(Maybe.fromValue(text));
  }

  return (
    <View style={styles.container}>
      <Input
        value={maybeName.orElse('')}
        onChangeText={onNameChange}
        autoFocus
      />
      <Picker
        style={styles.picker}
        selectedValue={goal}
        onValueChange={setGoal}
      >
        <Picker.Item color={color} label="Strength" value="strength" />
        <Picker.Item color={color} label="Hypertrophy" value="hypertrophy" />
      </Picker>
      <Button onPress={onAddWorkout}>
        Add Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: '45%'
  }
});
