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

export type InputError = 'email' | 'passwordLength' | 'verification';

const MIN_PASSWORD_LENGTH = 6;

export const SignUpPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [loading, setLoading] = useState(false);
  const [maybeEmailError, setMaybeEmailError] = useMaybeState<string>();
  const [maybePasswordError, setMaybePasswordError] = useMaybeState<string>();
  const [maybeVerificationError, setMaybeVerificationError] = useMaybeState<string>();
  const { signUp } = useAuth();

  async function onSignUp() {
    switch (true) {
      case !validateEmail(email):
        setMaybeEmailError(Maybe.fromValue('Invalid email'));
        break;
      case password.length < MIN_PASSWORD_LENGTH:
        setMaybeEmailError(Maybe.Nothing());
        setMaybePasswordError(Maybe.fromValue('Password must be longer than 6 characters'));
        break;
      case password !== passwordVerification:
        setMaybeEmailError(Maybe.Nothing());
        setMaybePasswordError(Maybe.Nothing());
        setMaybeVerificationError(Maybe.fromValue('Password and verification do not match'));
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
          style={styles.input}
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
          style={styles.input}
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
        />
        <Input
          testID={testIDs.SIGNUP_VERIFY}
          value={passwordVerification}
          onChangeText={setPasswordVerification}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          passwordRules="minlength: 6"
          maybeError={maybeVerificationError}
          autoCorrect={false}
          placeholder="Verify Password"
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
    alignItems: 'center'
  },
  input: {
    marginBottom: '10%'
  },
  button: {
    marginTop: '15%'
  }
});
