import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../common/components/Header';
import { testIDs } from '../../common/constants/TestIDs';
import { validateEmail } from '../../common/utils';
import { View } from '../../common/components/Themed';
import { useMaybeState } from '../../hooks/useMaybeState';
import { Maybe } from '@xpacked/tool-belt';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [maybeEmailError, setMaybeEmailError] = useMaybeState<string>();
  const [maybePasswordError, setMaybePasswordError] = useMaybeState<string>();
  const { logIn } = useAuth();

  async function onLogIn() {
    setLoading(true);
    if (!validateEmail(email)) {
      setMaybeEmailError(Maybe.fromValue('Invalid email'));
      setLoading(false);
    } else {
      setMaybeEmailError(Maybe.Nothing());
      try {
        await logIn({ email, password });
      } catch {
        setLoading(false);
        setMaybePasswordError(Maybe.fromValue('Email and Password do not match'));
      }
    }
  }

  function onPasswordChange(text: string) {
    setMaybePasswordError(Maybe.Nothing());
    setPassword(text);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header>Login to Your Account</Header>
        <Input
          testID={testIDs.LOGIN_EMAIL}
          autoFocus
          containerStyle={styles.input}
          value={email}
          onChangeText={setEmail}
          maybeError={maybeEmailError}
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          clearButtonMode="while-editing"
          keyboardType="email-address"
        />
        <Input
          testID={testIDs.LOGIN_PASSWORD}
          value={password}
          containerStyle={styles.input}
          onChangeText={onPasswordChange}
          maybeError={maybePasswordError}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          clearButtonMode="while-editing"
          returnKeyType="go"
          onSubmitEditing={onLogIn}
        />
        <Button
          testID={testIDs.LOGIN_SUBMIT}
          style={styles.button}
          onPress={onLogIn}
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
    marginBottom: '5%'
  },
  button: {
    marginTop: '10%',
    width: '45%'
  }
});
