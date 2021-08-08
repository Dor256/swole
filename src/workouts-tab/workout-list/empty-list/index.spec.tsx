import React from 'react';
import { EmptyList } from '.';
import { renderComponentAndCreateDriver } from './index.driver';

const mockedNavigate = jest.fn();

jest.mock('../../../hooks/useNavigation', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate
    })
  };
});

describe('Empty List', () => {
  it('Navigates to Add Workout modal', async () => {
    const driver = renderComponentAndCreateDriver(<EmptyList />);

    await driver.perform.tapAddWorkoutLink();

    expect(mockedNavigate).toHaveBeenCalledWith('AddWorkout');
  });
});
