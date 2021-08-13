import React from 'react';
import { Pressable } from 'react-native';
import type { PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Text, ThemeProps, useThemeColor } from './Themed';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from './ActivityIndicator';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export type ButtonProps = ThemeProps & PressableProps & {
  showLoader?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: string;
};

export const Button: React.FC<ButtonProps> = ({ style, lightColor, darkColor, showLoader = false, ...props }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');
  const backgroundColorPress = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonPressed');
  const colorScheme = useColorScheme();

  const boxShadow = colorScheme === 'light' && {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4
  };

  function onPressableStateChange(state: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      { 
        backgroundColor: state.pressed ? backgroundColorPress : backgroundColor,
        ...boxShadow
      },
      styles.button,
      style
    ];
  }

  function ChildrenOrLoader() {
    if (showLoader) {
      return <ActivityIndicator lightColor={Colors.dark.text} />;
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
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '5%'
  },
  text: {
    fontWeight: '500'
  }
});
