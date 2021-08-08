import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../../common/constants/TestIDs';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async workoutItemCard() {
      return base.findByTestId(testIDs.WORKOUT_ITEM_CARD);
    }
  };

  const perform = {
    async tapWorkoutItemCard() {
      await fireEvent.press(await get.workoutItemCard());
    }
  };

  return { perform, get };
}
