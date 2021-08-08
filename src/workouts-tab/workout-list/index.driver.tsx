import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../common/constants/TestIDs';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async addWorkoutFab() {
      return base.queryByTestId(testIDs.ADD_WORKOUT_FAB);
    }
  };

  const perform = {
    async tapAddWorkoutFab() {
      await fireEvent.press(await get.addWorkoutFab());
    }
  };

  return { perform, get };
}
