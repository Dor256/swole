import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { testIDs } from '../../common/constants/TestIDs';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async loginButton() {
      return base.queryByTestId(testIDs.LOGIN_BUTTON);
    },
    async signUpButton() {
      return base.queryByTestId(testIDs.SIGNUP_BUTTON);
    }
  };

  const perform = {
    async loginButtonPress() {
      return await fireEvent.press(await get.loginButton());
    },
    async signupButtonPress() {
      return await fireEvent.press(await get.signUpButton());
    }
  };

  return { perform, get };
}
