import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../../common/constants/TestIDs';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async addWorkoutLink() {
      return base.findByTestId(testIDs.ADD_WORKOUT_LINK);
    }
  };

  const perform = {
    async tapAddWorkoutLink() {
      await fireEvent.press(await get.addWorkoutLink());
    }
  };

  return { perform, get };
}
