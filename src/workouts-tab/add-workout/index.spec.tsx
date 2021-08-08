import React from 'react';
import { AddWorkout } from '.';
import { renderComponentAndCreateDriver } from './index.driver';

const mockAddWorkout = jest.fn();

describe('Add Workout', () => {
  it('Renders correctly', async () => {
    const driver = renderComponentAndCreateDriver(<AddWorkout addWorkout={mockAddWorkout} />);

    const nameInput = await driver.get.nameInput();
    const goalPicker = await driver.get.goalPicker();
    const submitButton = await driver.get.submitButton();

    expect(nameInput).toBeDefined();
    expect(goalPicker).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('Adds a workout', async () => {
    const mockWorkoutName = 'mockWorkoutName';
    const mockWorkoutGoal = 'hypertrophy';
    const driver = renderComponentAndCreateDriver(<AddWorkout addWorkout={mockAddWorkout} />);

    await driver.perform.typeWorkoutName(mockWorkoutName);
    await driver.perform.pickGoal(mockWorkoutGoal);
    await driver.perform.tapSubmitButton();

    expect(mockAddWorkout).toHaveBeenCalledWith({ name: mockWorkoutName, goal: mockWorkoutGoal });
  });

  it('Does not add a workout when missing the workout name', async () => {
    const driver = renderComponentAndCreateDriver(<AddWorkout addWorkout={mockAddWorkout} />);
    
    await driver.perform.tapSubmitButton();

    expect(mockAddWorkout).not.toHaveBeenCalled();
  });
});
