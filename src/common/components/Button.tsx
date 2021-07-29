import React from 'react';
import { Pressable } from 'react-native';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';
import { StyleSheet } from 'react-native';

export type ButtonProps = ThemeProps & PressableProps & {
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<ButtonProps> = ({ style, lightColor, darkColor, ...props }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');
  const backgroundColorPress = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonPressed');

  function onPressableStateChange(state: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      { backgroundColor: state.pressed ? backgroundColorPress : backgroundColor },
      styles.button,
      style
    ];
  }

  return (
    <Pressable
      style={onPressableStateChange}
      {...props}
    >
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: '2%',
    minWidth: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '5%'
  }
});
