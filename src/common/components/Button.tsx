import React from 'react';
import { Pressable } from 'react-native';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Text, ThemeProps, useThemeColor } from './Themed';
import { StyleSheet } from 'react-native';

export type ButtonProps = ThemeProps & PressableProps & {
  style?: StyleProp<ViewStyle>;
  children?: string;
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
      <Text
        lightColor="#fff"
        style={styles.text}
      >
        {props.children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: '2%',
    minWidth: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '5%'
  },
  text: {
    fontWeight: '500'
  }
});
