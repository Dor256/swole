import React from 'react';
import { WorkoutList } from '.';
import { IWorkout } from '../../common/api';
import { renderComponentAndCreateDriver } from './index.driver';

const mockedNavigate = jest.fn();

jest.mock('../../hooks/useNavigation', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate
    })
  };
});

describe('Workout List', () => {
  it('Hides fab when there are no workouts', async () => {
    const mockWorkoutList: IWorkout[] = [];
    const driver = renderComponentAndCreateDriver(<WorkoutList workouts={mockWorkoutList} />);

    const fab = await driver.get.addWorkoutFab();

    expect(fab).toBeNull();
  });

  it('Shows fab when the workout list is populated', async () => {
    const mockWorkoutList: IWorkout[] = [{ id: 'id', name: 'mockWorkout', goal: 'hypertrophy' }];
    const driver = renderComponentAndCreateDriver(<WorkoutList workouts={mockWorkoutList} />);

    const fab = await driver.get.addWorkoutFab();

    expect(fab).toBeDefined();
  });
});
