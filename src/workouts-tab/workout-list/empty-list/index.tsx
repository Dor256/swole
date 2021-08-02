import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from '../../../common/components/Link';
import { View } from '../../../common/components/Themed';

export const EmptyList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Link onPress={() => console.log('LINK')}>Add Workout</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
