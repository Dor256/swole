import React from 'react';
import { LoginPage } from '.';
import { renderComponentAndCreateDriver } from './index.driver';

const mockedLogin = jest.fn();

jest.mock('../../hooks/useAuth', () => {
  return {
    useAuth: () => {
      return {
        logIn: mockedLogin
      };
    }
  };
});

describe('Log in screen', () => {
  it('Renders correctly', async () => {
    const driver = renderComponentAndCreateDriver(<LoginPage />);

    const email = await driver.get.emailInput();
    const password = await driver.get.passwordInput();
    const submitButton = await driver.get.submitButton();

    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('Logs the user in', async () => {
    const mockEmail = 'email@test.com';
    const mockPassword = '111111';
    const driver = renderComponentAndCreateDriver(<LoginPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.typePassword(mockPassword);
    await driver.perform.tapSubmitButton();

    expect(mockedLogin).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
  });

  it('Does not log the user in if email is invalid', async () => {
    const mockEmail = 'invalidEmail';
    const driver = renderComponentAndCreateDriver(<LoginPage />);

    await driver.perform.typeEmail(mockEmail);
    await driver.perform.tapSubmitButton();
  
    expect(mockedLogin).not.toHaveBeenCalled();
  });
});
