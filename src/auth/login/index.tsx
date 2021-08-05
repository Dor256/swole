import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native';
import type { User } from '../../common/api';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Text } from '../../common/components/Themed';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export type LoginProps = {
  onLogin(user: Omit<User, 'id'>): Promise<void>;
}

export const LoginPage: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  async function onLogIn() {
    await logIn({ email, password });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Login to Your Account</Text>
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
          style={styles.button}
          onPress={onLogIn}
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
  header: {
    marginVertical: '10%',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: '10%'
  },
  button: {
    marginTop: '15%'
  }
});
