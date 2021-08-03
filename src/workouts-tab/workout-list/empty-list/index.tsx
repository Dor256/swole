import React from 'react';
import { StyleSheet } from 'react-native';
import { WorkoutsTabParams } from '../..';
import { Link } from '../../../common/components/Link';
import { View } from '../../../common/components/Themed';
import { useNavigation } from '../../../hooks/useNavigation';

export const EmptyList: React.FC = () => {
  const navigation = useNavigation<WorkoutsTabParams>();

  return (
    <View style={styles.container}>
      <Link onPress={() => navigation.navigate('AddWorkout')}>Add Workout</Link>
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
