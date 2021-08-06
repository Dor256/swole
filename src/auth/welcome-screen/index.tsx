import React from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../..';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { View } from '../../common/components/Themed';
import { useNavigation } from '../../hooks/useNavigation';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <View style={styles.container}>
      <Header>Welcome to Swole</Header>
      <Button
        style={styles.login}
        onPress={() => navigation.navigate('Login')}
      >
        LOG IN
      </Button>
      <Button onPress={() => navigation.navigate('Signup')}>SIGN UP</Button>
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
