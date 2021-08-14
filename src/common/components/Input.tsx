import { Maybe } from '@xpacked/tool-belt';
import React, { useState } from 'react';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Text, ThemeProps, useThemeColor, View } from './Themed';

type FloatingPlaceholderProps = {
  maybeError: Maybe<string>;
  float: boolean;
  placeholderContent?: string;
};

export type InputProps = ThemeProps & TextInputProps & Partial<FloatingPlaceholderProps> & {
  containerStyle?: StyleProp<ViewStyle>;
};

const FLOATING_PLACEHOLDER_VISIBLE_POS = 0;
const FLOATING_PLACEHOLDER_HIDDEN_POS = 30;

const FloatingPlaceholder: React.FC<FloatingPlaceholderProps> = ({ maybeError, float, placeholderContent }) => {
  const color = useThemeColor({}, 'danger');

  return maybeError.inCaseOf({
    Just: (error) => {
      return (
        <Text style={[{ color }, styles.placeholder]}>
          {error}
        </Text>
      );
    },
    Nothing: () => {
      if (float) {
        return (
          <Text style={styles.placeholder}>
            {placeholderContent}
          </Text>
        );
      }
      return null;
    }
  });
};

export const Input: React.FC<InputProps> = ({
  style,
  lightColor,
  darkColor,
  placeholder,
  maybeError = Maybe.Nothing(), ...props
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'input');
  const borderColor = useThemeColor({}, 'danger');
  const [focused, setFocused] = useState(!!props.autoFocus);
  const theme = useColorScheme();

  const placeholderY = useSharedValue(FLOATING_PLACEHOLDER_HIDDEN_POS);
  const placeholderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: placeholderY.value }]
    };
  });

  const boxShadow = theme === 'light' ? {
    shadowColor: maybeError.inCaseOf({ 
      Just: () => borderColor,
      Nothing: () => 'black'
    }),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  }: {};

  const border = maybeError.inCaseOf({
    Nothing: () => ({
      paddingLeft: '2.5%'
    }),
    Just: () => ({
      borderColor: borderColor,
      paddingLeft: '2%',
      borderWidth: 2
    })
  });

  function onFocus() {
    maybeError.inCaseOf({
      Just: () => {},
      Nothing: () => {
        placeholderY.value = withTiming(FLOATING_PLACEHOLDER_VISIBLE_POS, {
          duration: 200,
          easing: Easing.inOut(Easing.linear)
        });
        setFocused(true);
      }
    });
  }

  function onBlur() {
    maybeError.inCaseOf({
      Just: () => {
        setFocused(false);
      },
      Nothing: () => {
        placeholderY.value = withTiming(FLOATING_PLACEHOLDER_HIDDEN_POS, {
          duration: 200,
          easing: Easing.inOut(Easing.linear)
        }, () => runOnJS(removeFloatingPlaceholder)());
      }
    });
  }

  function removeFloatingPlaceholder() {
   setFocused(false);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Animated.View style={[styles.placeholderContainer, placeholderStyle]}>
        <FloatingPlaceholder
          float={focused}
          maybeError={maybeError}
          placeholderContent={placeholder}
        />
      </Animated.View>
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={focused ? '' : placeholder}
        style={[
          { backgroundColor, color, ...boxShadow, ...border },
          styles.input,
          style
        ]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    width: '100%'
  },
  input: {
    borderRadius: 10,
    width: '100%',
    height: 43,
    paddingLeft: '4%'
  },
  placeholderContainer: {
    height: 20,
    width: '100%'
  },
  placeholder: {
    fontWeight: '500',
    marginLeft: '2%',
    marginBottom: '1%'
  }
});
