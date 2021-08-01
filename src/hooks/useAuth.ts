import { Maybe } from '@unpacked/tool-belt';
import { useEffect } from 'react';
import { api, User } from '../common/api';
import { maybeGetJWT } from '../common/storage';
import { useMaybeState } from './useMaybeState';

export function useAuth(): [Maybe<Omit<User, 'password'>>, React.Dispatch<React.SetStateAction<Maybe<Omit<User, 'password'>>>>] {
  const [maybeUser, setMaybeUser] = useMaybeState<Omit<User, 'password'>>();

  useEffect(() => {
    maybeGetJWT().then((maybeJWT) => {
      maybeJWT.inCaseOf({
        Nothing: () => setMaybeUser(Maybe.fromValue()),
        Just: async (jwt) => {
          const maybeUser = await api.authorizeToken(jwt);
          setMaybeUser(maybeUser);
        }
      });
    });
  }, []);

  return [ maybeUser, setMaybeUser ];
}