import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Animated, Easing, ViewStyle } from 'react-native';
import { testIDs } from '../constants/TestIDs';
import { ThemeProps, useThemeColor, View } from './Themed';

export type LoaderProps = {
  style?: ViewStyle;
  testID?: string;
} & ThemeProps;

const OUTER_PULSE_DURATION = 700;
const INNER_PULSE_DURATION = 1500;

export const Loader: React.FC<LoaderProps> = ({ style, lightColor, darkColor }) => {
  const outerRadius = useRef(new Animated.Value(1));
  const innerRadius = useRef(new Animated.Value(0.9));
  const innerOpacity = useRef(new Animated.Value(1));
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'loader');

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(outerRadius.current, {
            toValue: 0.5,
            duration: OUTER_PULSE_DURATION,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad)
          }),
          Animated.timing(outerRadius.current, {
            toValue: 1,
            duration: OUTER_PULSE_DURATION,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad)
          })
        ]),
        Animated.parallel([
          Animated.sequence([
            Animated.timing(innerRadius.current, {
              toValue: 1.7,
              duration: INNER_PULSE_DURATION,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(innerRadius.current, {
              toValue: 0.9,
              duration: 0,
              useNativeDriver: true
            })
          ]),
          Animated.sequence([
            Animated.timing(innerOpacity.current, {
              toValue: 0,
              duration: INNER_PULSE_DURATION,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(innerOpacity.current, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true
            })
          ])
        ])
      ])
    ).start();
  }, []);

  return (
    <View testID={testIDs.LOADER} style={styles.container}>
      <Animated.View
        style={[
          { backgroundColor },
          styles.innerPulse,
          { transform: [{ scale: innerRadius.current }],opacity: innerOpacity.current },
          style
        ]}
      />
      <Animated.View
        style={[
          { backgroundColor },
          styles.outerPulse,
          { transform: [{ scale: outerRadius.current }] }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerPulse: {
    width: 50,
    height: 50,
    borderRadius: 100,
    bottom: 50,
    alignSelf: 'center'
  },
  innerPulse: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
