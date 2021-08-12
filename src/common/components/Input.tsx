import { Maybe } from '@xpacked/tool-belt';
import React from 'react';
import type { TextInputProps } from 'react-native';
import { useColorScheme } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { Text, ThemeProps, useThemeColor, View } from './Themed';

type ErrorProps = {
  maybeError: Maybe<string>;
};

export type InputProps = ThemeProps & TextInputProps & Partial<ErrorProps>;

const ErrorText: React.FC<ErrorProps> = ({ maybeError }) => {
  const color = useThemeColor({}, 'danger');

  return maybeError.inCaseOf({
    Just: (error) => {
      return (
        <Text style={[{ color }, styles.error]}>
          {error}
        </Text>
      );
    },
    Nothing: () => null
  });
};

export const Input: React.FC<InputProps> = ({ style, lightColor, darkColor, maybeError = Maybe.Nothing(), ...props }) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'input');
  const borderColor = useThemeColor({}, 'danger');
  const theme = useColorScheme();

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
  
  return (
    <>
      <View style={styles.errorContainer}>
        <ErrorText maybeError={maybeError} />
      </View>
      <TextInput
        style={[
          { backgroundColor, color, ...boxShadow, ...border },
          styles.input,
          style
        ]}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    minWidth: '60%',
    height: 43
  },
  errorContainer: {
    height: 20,
    minWidth: '60%',
    marginLeft: 10
  },
  error: {
    fontWeight: '500'
  }
});
