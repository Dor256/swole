import React from 'react';
import { render } from '@testing-library/react-native';
import { testIDs } from '../common/constants/TestIDs';
import { NavigationContainer } from '@react-navigation/native';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(
    <NavigationContainer>
      {component}
    </NavigationContainer>
  );

  const get = {
    async loader() {
      return base.queryByTestId(testIDs.LOADER);
    }
  };

  return { get };
}
