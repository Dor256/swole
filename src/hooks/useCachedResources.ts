import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { loadAsync } from 'expo-font';
import { maybeGetJWT } from '../common/storage';
import { Maybe } from '@unpacked/tool-belt';
import { api, User } from '../common/api';
import * as SplashScreen from 'expo-splash-screen';
import { useMaybeState } from './useMaybeState';

SplashScreen.preventAutoHideAsync().catch(console.warn);

export function useCachedResources() {
  const [maybeUser, setMaybeUser] = useMaybeState<Omit<User, "password">>();
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResources() {
      const [maybeJWT] = await Promise.all([
        maybeGetJWT(),
        loadAsync({
          ...Ionicons.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
        })
      ]);
      return maybeJWT.inCaseOf({
        Nothing: async () => {
          setMaybeUser(Maybe.fromValue());
        },
        Just: async (jwt) => {
          try {
            const maybeUser = await api.authorizeToken(jwt);
            setMaybeUser(maybeUser);
          } catch {
            console.log('Failed to fetch user');
          }
        }
      });
    }
    loadResources().then(() => {
      SplashScreen.hideAsync();
      setLoadingComplete(true);
    });
  }, []);

  return { isLoadingComplete, maybeUser, setMaybeUser };
}
