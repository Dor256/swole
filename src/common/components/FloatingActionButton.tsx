import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { PressableStateCallbackType, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';

export type FABProps = {
  onPress(): void;
} & ThemeProps;

export const FloatingActionButton: FunctionComponent<FABProps> = ({ onPress, lightColor, darkColor }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');
  const backgroundColorPress = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonPressed');

  function onPressableStateChange(state: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      { backgroundColor: state.pressed ? backgroundColorPress : backgroundColor },
      styles.fab
    ];
  }

  return (
    <Pressable onPress={onPress} style={onPressableStateChange}>
      <Ionicons name="add" style={styles.fabText} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: '87%',
    left: '82%',
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0.1, height: 0 },
    shadowOpacity: 0.5
  },
  fabText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 23
  }
});
