import { NavigationProp, ParamListBase, useNavigation as _useNavigation } from '@react-navigation/core';

export function useNavigation<T extends ParamListBase>() {
  return _useNavigation<NavigationProp<T>>();
}
