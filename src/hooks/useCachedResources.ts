import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { maybeGetJWT } from '../common/storage';
import { Maybe } from '@unpacked/tool-belt';
import { api, User } from '../common/api';
import * as SplashScreen from 'expo-splash-screen';
import { useMaybeState } from './useMaybeState';

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [ maybeUser, setMaybeUser ] = useMaybeState<Omit<User, "password">>();

  useEffect(() => {
    async function loadResources() {
      SplashScreen.preventAutoHideAsync();
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
        });
  
        const maybeJWT = await maybeGetJWT();
        maybeJWT.inCaseOf({
          Nothing: () => setMaybeUser(Maybe.fromValue()),
          Just: async (jwt) => {
            try {
              const maybeUser = await api.authorizeToken(jwt);
              setMaybeUser(maybeUser);
            } catch {
              console.log('Failed to fetch user');
            } finally {
              SplashScreen.hideAsync();
              setLoadingComplete(true);
            }
          }
        });
      } catch (err) {
        console.warn(err);
      }
    }
    loadResources();
  }, []);

  return { isLoadingComplete, maybeUser, setMaybeUser };
}
