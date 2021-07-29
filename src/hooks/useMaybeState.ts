import { useState } from 'react';
import { Maybe } from '@unpacked/tool-belt';

export function useMaybeState<T>(initialValue?: T | null): [Maybe<T>, React.Dispatch<React.SetStateAction<Maybe<T>>>] {
  const [value, setValue] = useState(Maybe.fromValue(initialValue));

  return [value, setValue];
}
