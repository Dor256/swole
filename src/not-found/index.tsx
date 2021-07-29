import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { RootStackParamList } from '..';

export type NotFoundProps = StackScreenProps<RootStackParamList, 'NotFound'>;

export const NotFound: React.FC<NotFoundProps> = ({ navigation }) => {
  function onGoBackPress() {
    navigation.replace('Root');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesnt exist.</Text>
      <Pressable onPress={onGoBackPress} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
