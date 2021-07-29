import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../common/components/Themed';

export const Profile: React.FC = () =>  {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This will be the profile tab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
