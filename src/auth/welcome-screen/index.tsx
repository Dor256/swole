import React from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../..';
import { Button } from '../../common/components/Button';
import { Text, View } from '../../common/components/Themed';
import { useNavigation } from '../../hooks/useNavigation';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Swole</Text>
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
  header: {
    marginVertical: '10%',
    fontSize: 20,
    fontWeight: 'bold'
  },
  login: {
    marginBottom: '5%'
  }
});
