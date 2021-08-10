import React from 'react';
import { Image, StyleSheet } from 'react-native';
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
      <Image style={styles.image} source={require('../../../assets/images/icon.png')} />
      <Header style={styles.header}>Welcome to Swole</Header>
      <Button
        testID={testIDs.LOGIN_BUTTON}
        style={styles.login}
        onPress={onLoginPress}
      >
        LOG IN
      </Button>
      <Button
        testID={testIDs.SIGNUP_BUTTON}
        style={styles.signup}
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
  image: {
    marginTop: '15%',
    height: 200,
    width: 200,
    borderRadius: 100
  },
  header: {
    marginBottom: '50%'
  },
  signup: {
    width: '65%'
  },
  login: {
    width: '65%',
    marginBottom: '5%'
  }
});
