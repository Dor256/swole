import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../common/constants/TestIDs';
import { Goal } from '../../common/api';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async nameInput() {
      return base.findByTestId(testIDs.ADD_WORKOUT_NAME);
    },
    async goalPicker() {
      return base.findByTestId(testIDs.ADD_WORKOUT_PICKER);
    },
    async submitButton() {
      return base.findByTestId(testIDs.ADD_WORKOUT_SUBMIT);
    }
  };

  const perform = {
    async typeWorkoutName(name: string) {
      await fireEvent.changeText(await get.nameInput(), name);
    },
    async pickGoal(goal: Goal) {
      await fireEvent(await get.goalPicker(), 'onValueChange', goal);
    },
    async tapSubmitButton() {
      await fireEvent.press(await get.submitButton());
    }
  };

  return { perform, get };
}
