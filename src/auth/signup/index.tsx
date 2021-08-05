import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Text } from '../../common/components/Themed';
import { useAuth } from '../../hooks/useAuth';

export const SignUpPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const { signUp } = useAuth();

  async function onSignUp() {
    if (password !== passwordVerification) {
      console.error('PASSWORDS DONT MATCHCHCHC');
    } else {
      await signUp({ email, password });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Create Your Account</Text>
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
