import React, { useEffect } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

export function useNavigationOptions(options: StackNavigationOptions, deps: React.DependencyList) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(options);
  }, deps);
}
