import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../common/constants/TestIDs';

export function renderComponentAndCreateDriver(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  const base = render(component);

  const get = {
    async emailInput() {
      return base.findByTestId(testIDs.SIGNUP_EMAIL);
    },
    async passwordInput() {
      return base.findByTestId(testIDs.SIGNUP_PASSWORD);
    },
    async verifyPasswordInput() {
      return base.findByTestId(testIDs.SIGNUP_VERIFY);
    },
    async submitButton() {
      return base.findByTestId(testIDs.SIGNUP_SUBMIT);
    }
  };

  const perform = {
    async typeEmail(email: string) {
      await fireEvent.changeText(await get.emailInput(), email);
    },
    async typePassword(password: string) {
      await fireEvent.changeText(await get.passwordInput(), password);
    },
    async typeVerification(verification: string) {
      await fireEvent.changeText(await get.verifyPasswordInput(), verification);
    },
    async tapSubmitButton() {
      await fireEvent.press(await get.submitButton());
    }
  };

  return { perform, get };
}
