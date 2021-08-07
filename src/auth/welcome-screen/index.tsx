import React from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../..';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { View } from '../../common/components/Themed';
import { testIDs } from '../../common/constants/TestIDs';
import { useNavigation } from '../../hooks/useNavigation';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackParamList>();

  function onLoginPress() {
    navigation.navigate('Login');
  }

  function onSignupPress() {
    navigation.navigate('Signup');
  }

  return (
    <View style={styles.container}>
      <Header>Welcome to Swole</Header>
      <Button
        testID={testIDs.LoginButton}
        style={styles.login}
        onPress={onLoginPress}
      >
        LOG IN
      </Button>
      <Button
        testID={testIDs.SignupButton}
        onPress={onSignupPress}
      >
        SIGN UP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  login: {
    marginBottom: '5%'
  }
});
