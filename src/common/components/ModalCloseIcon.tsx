import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColor } from './Themed';

export type ModalCloseIconProps = {
  tintColor: string;
}

export const ModalCloseIcon: React.FC<ModalCloseIconProps> = () => {
  const color = useThemeColor({}, 'text');
  return (
    <Ionicons
      name="close"
      size={25}
      style={[{ color }, styles.icon]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10
  }
});
