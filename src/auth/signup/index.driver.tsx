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
    async confirmPasswordInput() {
      return base.findByTestId(testIDs.SIGNUP_CONFIRMATION);
    },
    async submitButton() {
      return base.findByTestId(testIDs.SIGNUP_SUBMIT);
    },
    async invalidEmailError() {
      return base.queryByText('Invalid email');
    },
    async passwordConfirmationError() {
      return base.queryByText('Password and confirmation do not match');
    },
    async passwordLengthError() {
      return base.queryByText('Password must be at least 6 characters');
    }
  };

  const perform = {
    async typeEmail(email: string) {
      await fireEvent.changeText(await get.emailInput(), email);
    },
    async typePassword(password: string) {
      await fireEvent.changeText(await get.passwordInput(), password);
    },
    async typeConfirmation(confirmation: string) {
      await fireEvent.changeText(await get.confirmPasswordInput(), confirmation);
    },
    async tapSubmitButton() {
      await fireEvent.press(await get.submitButton());
    }
  };

  return { perform, get };
}
