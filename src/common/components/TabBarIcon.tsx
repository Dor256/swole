import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export type TabBarIconProps = {
  name: string;
  color: string;
}

export const TabBarIcon: React.FC<TabBarIconProps> = (props) => {
  return (
    <FontAwesome5
      size={20}
      style={styles.icon}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
});
