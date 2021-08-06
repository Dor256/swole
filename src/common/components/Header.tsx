import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from './Themed';

export const Header: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.header, style]} {...props}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  header: {
    marginVertical: '10%',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
