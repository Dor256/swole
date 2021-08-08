import React from 'react';
import { SignUpPage } from '.';
import { renderComponentAndCreateDriver } from './index.driver';
import {} from '../../hooks/useAuth';

const mockedSignup = jest.fn();

jest.mock('../../hooks/useAuth', () => {
  return {
    useAuth: () => {
      return {
        signUp: mockedSignup
      };
    }
  };
});

describe('Sign up screen', () => {
  it('Renders correctyl', async () => {
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    const email = await driver.get.emailInput();
    const password = await driver.get.passwordInput();
    const passwordVerification = await driver.get.verifyPasswordInput();
    const submitButton = await driver.get.submitButton();

    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(passwordVerification).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('Signs the user up', async () => {
    const mockEmail = 'test@mail.com';
    const mockPassword = '111111';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeVerification(mockPassword);
    await driver.perform.tapSubmitButton();

    expect(mockedSignup).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
  });

  it('Does not sign the user up when password and verification are misaligned', async () => {
    const mockEmail = 'test@mail.com';
    const mockPassword = '111111';
    const mockVerification = '222222';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeVerification(mockVerification);
    await driver.perform.tapSubmitButton();

    expect(mockedSignup).not.toHaveBeenCalled();
  });

  it('Does not sign the user up when the email is invalid', async () => {
    const mockEmail = 'invalidEmail';
    const mockPassword = '111111';
    const driver = renderComponentAndCreateDriver(<SignUpPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.typeVerification(mockPassword);
    await driver.perform.tapSubmitButton();

    expect(mockedSignup).not.toHaveBeenCalled();
  });
});