import { Maybe } from '@unpacked/tool-belt';
import React, { useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Goal, IWorkout } from '../../common/api';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { useThemeColor, View } from '../../common/components/Themed';
import { useMaybeState } from '../../hooks/useMaybeState';
import { Picker } from '@react-native-picker/picker';
import { TouchableWithoutFeedback } from 'react-native';
import { testIDs } from '../../common/constants/TestIDs';

export type AddWorkoutProps = {
  addWorkout(workout: Omit<IWorkout, 'id'>): Promise<void>;
};

export const AddWorkout: React.FC<AddWorkoutProps> = (props) => {
  const [maybeName, setMaybeName] = useMaybeState<string>();
  const [goal, setGoal] = useState<Goal>('strength');
  const [loading, setLoading] = useState(false);
  const color = useThemeColor({}, 'text');

  function onAddWorkout() {
    maybeName.inCaseOf({
      Nothing: () => console.warn('Must enter name!'),
      Just: async (name) => {
        setLoading(true);
        await props.addWorkout({ name, goal });
      }
    });
  }

  function onNameChange(text: string) {
    setMaybeName(Maybe.fromValue(text));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Input
          testID={testIDs.ADD_WORKOUT_NAME}
          value={maybeName.orElse('')}
          onChangeText={onNameChange}
          placeholder="Enter Workout Name"
          autoFocus
        />
        <Picker
          testID={testIDs.ADD_WORKOUT_PICKER}
          style={styles.picker}
          selectedValue={goal}
          onValueChange={setGoal}
        >
          <Picker.Item color={color} label="Strength" value="strength" />
          <Picker.Item color={color} label="Hypertrophy" value="hypertrophy" />
        </Picker>
        <Button
          testID={testIDs.ADD_WORKOUT_SUBMIT}
          onPress={onAddWorkout}
          showLoader={loading}
        >
          Add Workout
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%'
  },
  picker: {
    width: '45%'
  }
});
