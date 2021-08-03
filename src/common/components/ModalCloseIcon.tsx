import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

export type ModalCloseIconProps = {
  tintColor: string;
}

export const ModalCloseIcon: React.FC<ModalCloseIconProps> = () => {
  return (
    <Ionicons
      name="close"
      size={25}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10
  }
});
