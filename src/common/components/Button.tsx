import React from 'react';
import { Pressable } from 'react-native';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Text, ThemeProps, useThemeColor } from './Themed';
import { StyleSheet, ActivityIndicator } from 'react-native';

export type ButtonProps = ThemeProps & PressableProps & {
  showLoader?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: string;
};

export const Button: React.FC<ButtonProps> = ({ style, lightColor, darkColor, showLoader = false, ...props }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');
  const backgroundColorPress = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonPressed');
  const loaderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  function onPressableStateChange(state: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      { backgroundColor: state.pressed ? backgroundColorPress : backgroundColor },
      styles.button,
      style
    ];
  }

  function ChildrenOrLoader() {
    if (showLoader) {
      return <ActivityIndicator color={loaderColor} />;
    }
    return (
      <Text
        lightColor="#fff"
        style={styles.text}
      >
        {props.children}
      </Text>
    );
  }

  return (
    <Pressable
      style={onPressableStateChange}
      disabled={showLoader}
      {...props}
    >
      <ChildrenOrLoader />
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
