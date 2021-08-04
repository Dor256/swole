import React from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';

export type InputProps = ThemeProps & TextInputProps;

export const Input: React.FC<InputProps> = ({ style, lightColor, darkColor, ...props }) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'input');
  
  return <TextInput style={[{ backgroundColor, color }, styles.input, style]} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    minWidth: '60%',
    padding: '2.5%'
  }
});
