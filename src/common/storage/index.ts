import { Maybe } from '@xpacked/tool-belt';
import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';

export async function saveJWT(token: string) {
  await setItemAsync('jwt', token);
}

export async function maybeGetJWT(): Promise<Maybe<string>> {
  try {
    return Maybe.fromValue(await getItemAsync('jwt'));
  } catch {
    return Maybe.fromValue();
  }
}

export async function removeJWT(): Promise<void> {
  await deleteItemAsync('jwt');
}
