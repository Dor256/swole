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

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();

  async function onLogIn() {
    setLoading(true);
    if (!validateEmail(email)) {
      setLoading(false);
    } else {
      await logIn({ email, password });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header>Login to Your Account</Header>
        <Input
          testID={testIDs.LOGIN_EMAIL}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
          onChangeText={setPassword}
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
    alignItems: 'center'
  },
  input: {
    marginBottom: '10%'
  },
  button: {
    marginTop: '15%'
  }
});
