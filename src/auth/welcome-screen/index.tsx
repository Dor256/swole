import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { RootStackParamList } from '../..';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { Text, View } from '../../common/components/Themed';
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
      <Header style={styles.header}>Swole</Header>
      <Text style={styles.body}>Start managing and tracking your workouts</Text>
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
    marginTop: '20%',
    height: 170,
    width: 170,
    borderRadius: 100
  },
  header: {
    marginTop: '5%',
    marginBottom: '5%'
  },
  body: {
    marginBottom: '30%',
    fontSize: 15,
    fontWeight: '500',
    width: '60%',
    textAlign: 'center',
    lineHeight: 25
  },
  signup: {
    width: '65%'
  },
  login: {
    width: '65%',
    marginBottom: '7%'
  }
});
