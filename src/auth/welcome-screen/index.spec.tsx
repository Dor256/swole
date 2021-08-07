import React from 'react';
import { WelcomeScreen } from '.';
import { renderComponentAndCreateDriver } from './index.driver';

const mockedNavigate = jest.fn();

jest.mock('../../hooks/useNavigation', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate
    })
  };
});

describe('Welcome Screen', () => {
  it('Renders correctly', async () => {
    const driver = renderComponentAndCreateDriver(<WelcomeScreen />);

    const loginButton = await driver.get.loginButton();
    const signupButton = await driver.get.signUpButton();

    expect(loginButton).toBeDefined();
    expect(signupButton).toBeDefined();
  });

  it('Navigates to Login screen', async () => {
    const driver = renderComponentAndCreateDriver(<WelcomeScreen />);

    await driver.perform.loginButtonPress();

    expect(mockedNavigate).toHaveBeenCalledWith('Login');
  });

  it('Navigates to Signup screen', async () => {
    const driver = renderComponentAndCreateDriver(<WelcomeScreen />);

    await driver.perform.signupButtonPress();

    expect(mockedNavigate).toBeCalledWith('Signup');
  });
});
