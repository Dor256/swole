import { Maybe } from '@unpacked/tool-belt';
import React from 'react';
import { BottomTabs } from '.';
import { renderComponentAndCreateDriver } from './index.driver';

describe('Bottom Tabs', () => {
  it('Shows a loader while fetching workouts', async () => {
    const driver = renderComponentAndCreateDriver(<BottomTabs fetchWorkouts={jest.fn()} maybeWorkouts={Maybe.Nothing()} />);

    const loader = await driver.get.loader();

    expect(loader).toBeDefined();
  });
});
