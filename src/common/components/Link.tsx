import React, { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TextProps, useThemeColor, Text } from './Themed';

type LinkProps = TextProps & {
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export const Link: React.FC<LinkProps> = ({ style, lightColor, darkColor, icon, color, ...props }) => {
  const linkColor = useThemeColor({ light: lightColor, dark: darkColor }, 'link');
  
  return (
    <Pressable style={[styles.container, style]} {...props}>
      {icon}
      <Text style={[{ color: color ?? linkColor }, styles.link]}>{props.children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  link: {
   fontSize: 15,
   fontWeight: '700'
  }
});
