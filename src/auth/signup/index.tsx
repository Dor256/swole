import React, { useState } from 'react';
import { Keyboard, SafeAreaView } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { Input } from '../../common/components/Input';
import { useAuth } from '../../hooks/useAuth';

export const SignUpPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  async function onSignUp() {
    if (password !== passwordVerification) {
      console.error('PASSWORDS DONT MATCHCHCHC');
    } else {
      setLoading(true);
      await signUp({ email, password });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header>Create Your Account</Header>
        <Input
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
          value={password}
          style={styles.input}
          onChangeText={setPassword}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          clearButtonMode="while-editing"
          returnKeyType="go"
        />
        <Input
          value={passwordVerification}
          onChangeText={setPasswordVerification}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Verify Password"
          clearButtonMode="while-editing"
          returnKeyType="go"
          onSubmitEditing={onSignUp}
        />
        <Button
          style={styles.button}
          onPress={onSignUp}
          showLoader={loading}
        >
          Submit
        </Button>
      </SafeAreaView>
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
