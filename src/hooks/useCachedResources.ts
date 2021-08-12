import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { loadAsync } from 'expo-font';
import { api, User } from '../common/api';
import * as SplashScreen from 'expo-splash-screen';
import { useMaybeState } from './useMaybeState';
import { logger } from '../common/logger';

SplashScreen.preventAutoHideAsync().catch(logger.warn);

export function useCachedResources() {
  const [maybeUser, setMaybeUser] = useMaybeState<Omit<User, "password">>();
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        const [maybeUser] = await Promise.all([
          api.authorizeToken(),
          loadAsync({
            ...Ionicons.font,
            'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
          })
        ]);
        setMaybeUser(maybeUser);
      } catch {
        logger.info('Failed to fetch user');
      }
    }
    loadResources().then(() => {
      SplashScreen.hideAsync();
      setLoadingComplete(true);
    });
  }, []);

  return { isLoadingComplete, maybeUser, setMaybeUser };
}
