import React from 'react';
import { WorkoutItem } from '.';
import { IWorkout } from '../../../common/api';
import { renderComponentAndCreateDriver } from './index.driver';

const mockWorkout: IWorkout = {
  name: 'name',
  id: 'id',
  goal: 'hypertrophy'
};

describe('Workout Item', () => {
  it('Renders correctly', async () => {
    const driver = renderComponentAndCreateDriver(<WorkoutItem onPress={jest.fn()} workout={mockWorkout} />);

    const workoutCard = await driver.get.workoutItemCard();

    expect(workoutCard).toBeDefined();
  });

  it('Opens the workout page when pressed', async () => {
    const mockWorkoutPress = jest.fn();
    const driver = renderComponentAndCreateDriver(<WorkoutItem onPress={mockWorkoutPress} workout={mockWorkout} />);

    await driver.perform.tapWorkoutItemCard();

    expect(mockWorkoutPress).toHaveBeenCalled();
  });
});
