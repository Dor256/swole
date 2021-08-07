import React, { useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { Animated, StyleSheet, Easing } from 'react-native';
import { useState } from 'react';

export type SplashScreenProps = {
  isLoadingComplete: boolean;
};

export const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const opacity = useRef(new Animated.Value(1));
  const [splashAnimated, setSplashAnimated] = useState(false);

  useEffect(() => {
    if (props.isLoadingComplete) {
      Animated.timing(opacity.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => setSplashAnimated(true));
    }
  }, [props.isLoadingComplete]);


  return (
    <>
      {props.children}
      {!splashAnimated &&
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: opacity.current }, styles.container]}
        >
          <Animated.Image
            style={styles.image}
            source={{ uri: Constants.manifest?.splash?.image }}
          />
        </Animated.View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.manifest?.splash?.backgroundColor
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: Constants.manifest?.splash?.resizeMode ?? 'contain'
  }
});
