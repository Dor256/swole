import { Maybe } from '@xpacked/tool-belt';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { Input } from '../../common/components/Input';
import { View } from '../../common/components/Themed';
import { testIDs } from '../../common/constants/TestIDs';
import { validateEmail } from '../../common/utils';
import { useAuth } from '../../hooks/useAuth';
import { useMaybeState } from '../../hooks/useMaybeState';

export type InputError = 'email' | 'passwordLength' | 'confirmation';

const MIN_PASSWORD_LENGTH = 6;

export const SignUpPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [maybeEmailError, setMaybeEmailError] = useMaybeState<string>();
  const [maybePasswordError, setMaybePasswordError] = useMaybeState<string>();
  const [maybeConfirmationError, setMaybeConfirmationError] = useMaybeState<string>();
  const { signUp } = useAuth();

  async function onSignUp() {
    switch (true) {
      case !validateEmail(email):
        setMaybeEmailError(Maybe.fromValue('Invalid email'));
        break;
      case password.length < MIN_PASSWORD_LENGTH:
        setMaybeEmailError(Maybe.Nothing());
        setMaybePasswordError(Maybe.fromValue('Password must have at least 6 characters'));
        break;
      case password !== passwordConfirmation:
        setMaybeEmailError(Maybe.Nothing());
        setMaybePasswordError(Maybe.Nothing());
        setMaybeConfirmationError(Maybe.fromValue('Password and confirmation do not match'));
        break;
      default:
        setLoading(true);
        await signUp({ email, password });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header>Create Your Account</Header>
        <Input
          testID={testIDs.SIGNUP_EMAIL}
          containerStyle={styles.input}
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
          autoCapitalize="none"
          maybeError={maybeEmailError}
          autoCorrect={false}
          placeholder="Email"
          clearButtonMode="while-editing"
          keyboardType="email-address"
        />
        <Input
          testID={testIDs.SIGNUP_PASSWORD}
          value={password}
          containerStyle={styles.input}
          passwordRules="minlength: 6"
          onChangeText={setPassword}
          textContentType="password"
          secureTextEntry
          maybeError={maybePasswordError}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          clearButtonMode="while-editing"
          returnKeyType="go"
          inlineImageLeft={'../../../../assets/icon.png'}
        />
        <Input
          testID={testIDs.SIGNUP_CONFIRMATION}
          containerStyle={styles.input}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          passwordRules="minlength: 6"
          maybeError={maybeConfirmationError}
          autoCorrect={false}
          placeholder="Confirm Password"
          clearButtonMode="while-editing"
          returnKeyType="go"
          onSubmitEditing={onSignUp}
        />
        <Button
          testID={testIDs.SIGNUP_SUBMIT}
          style={styles.button}
          onPress={onSignUp}
          showLoader={loading}
        >
          Submit
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%'
  },
  input: {
    marginBottom: '6%'
  },
  button: {
    marginTop: '10%',
    width: '45%'
  }
});
