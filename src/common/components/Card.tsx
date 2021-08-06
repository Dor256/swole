import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';

export type CardProps = ThemeProps & PressableProps & {
  style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<CardProps> = ({ style, lightColor, darkColor, ...props }) => {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'card');

  return (
    <Pressable
      style={[{ borderColor, backgroundColor }, styles.card, style]}
      {...props}
    >
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: '4%',
    minWidth: '70%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2
  }
});
