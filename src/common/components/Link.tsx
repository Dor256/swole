import React from 'react';
import { StyleSheet } from 'react-native';
import { TextProps, useThemeColor, Text } from './Themed';

export const Link: React.FC<TextProps> = ({ style, lightColor, darkColor, ...props }) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'link');
  
  return <Text style={[{ color }, styles.link, style]} {...props} />;
};

const styles = StyleSheet.create({
  link: {
   fontSize: 15,
   fontWeight: '700'
  }
});
