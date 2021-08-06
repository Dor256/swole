import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { ThemeProps, useThemeColor } from './Themed';

export type FABProps = {
  onPress(): void;
} & ThemeProps;

export const FloatingActionButton: FunctionComponent<FABProps> = ({ lightColor, darkColor, ...props }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: withTiming(scale.value, {
          duration: 110,
          easing: Easing.elastic(0)
        })
      }]
    };
  }, []);

  function onPressEngaged() {
    scale.value = 0.8;
  }

  function onPressReleased() {
    scale.value = 1;
    props.onPress();
  }

  return (
    <Pressable
      onPressOut={onPressReleased}
      onPressIn={onPressEngaged}
    >
      <Animated.View style={[{ backgroundColor }, styles.fab, animatedStyle]}>
        <Ionicons name="add" style={styles.fabText} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
    bottom: '30%',
    left: '83%',
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
