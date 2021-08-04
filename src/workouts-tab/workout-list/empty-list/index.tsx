import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabParamList } from '../../../bottom-tabs';
import { Link } from '../../../common/components/Link';
import { Text, View } from '../../../common/components/Themed';
import { useNavigation } from '../../../hooks/useNavigation';

export const EmptyList: React.FC = () => {
  const navigation = useNavigation<BottomTabParamList>();

  function onAddWorkout() {
    navigation.navigate('AddWorkout');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Workouts</Text>
      <Text style={styles.subtitle}>Looks like you do not have any workouts yet.</Text>
      <Link onPress={onAddWorkout}>
        Add Workout
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: '5%'
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: '5%'
  }
});
