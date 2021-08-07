import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../common/constants/TestIDs';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async emailInput() {
      return base.findByTestId(testIDs.LOGIN_EMAIL);
    },
    async passwordInput() {
      return base.findByTestId(testIDs.LOGIN_PASSWORD);
    },
    async submitButton() {
      return base.findByTestId(testIDs.LOGIN_SUBMIT);
    }
  };

  const perform = {
    async typeEmail(email: string) {
      await fireEvent.changeText(await get.emailInput(), email);
    },
    async typePassword(password: string) {
      await fireEvent.changeText(await get.passwordInput(), password);
    },
    async tapSubmitButton() {
      await fireEvent.press(await get.submitButton());
    }
  };

  return { perform, get };
}
