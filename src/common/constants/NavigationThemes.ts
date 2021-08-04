import { DarkTheme as NDarkTheme, DefaultTheme } from '@react-navigation/native';

export const LightTheme = DefaultTheme;

export const DarkTheme = {
  ...NDarkTheme,
  colors: {
    ...NDarkTheme.colors,
    card: '#242424',
    background: '#1c1c1c'
  }
};
