import { Maybe } from '@xpacked/tool-belt';
import React from 'react';
import { BottomTabs } from '.';
import { renderComponentAndCreateDriver } from './index.driver';

describe('Bottom Tabs', () => {
  it('Shows a loader while fetching workouts', async () => {
    const mockedUser = {
      email: 'mockEmail',
      password: 'mockPassword',
      id: 'mockId'
    };
    const driver = renderComponentAndCreateDriver(
      <BottomTabs
        user={mockedUser}
        fetchWorkouts={jest.fn()}
        maybeWorkouts={Maybe.Nothing()}
      />
    );

    const loader = await driver.get.loader();

    expect(loader).toBeDefined();
  });
});
