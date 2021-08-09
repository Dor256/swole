import React from 'react';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';

export type ActivityIndicatorProps = ThemeProps & RNActivityIndicator['props'];

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ lightColor, darkColor, ...props }) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <RNActivityIndicator color={color} {...props} />;
};
