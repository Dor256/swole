import { Maybe } from '@unpacked/tool-belt';
import React from 'react';
import { User } from '../common/api';

export type UserContext = {
  maybeUser: Maybe<Omit<User, 'password'>>;
  setMaybeUser: React.Dispatch<React.SetStateAction<Maybe<Omit<User, 'password'>>>>;
};

export const AuthContext = React.createContext<UserContext>({
  maybeUser: Maybe.fromValue(),
  setMaybeUser: () => Maybe.fromValue()
});
export const { Provider: AuthProvider } = AuthContext;
