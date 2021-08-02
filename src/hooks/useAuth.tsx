import React from 'react';
import { Maybe } from '@unpacked/tool-belt';
import { api, User } from '../common/api';
import { saveJWT } from '../common/storage';
import { useContext } from 'react';

export type ProviderProps = {
  maybeUser: Maybe<Omit<User, 'password'>>;
  setMaybeUser: React.Dispatch<React.SetStateAction<Maybe<Omit<User, "password">>>>;
}

export type UserContext = {
  maybeUser: Maybe<Omit<User, 'password'>>;
  logIn(user: Omit<User, 'id'>): Promise<void>;
  signUp(user: Omit<User, 'id'>): Promise<void>;
  setMaybeUser: React.Dispatch<React.SetStateAction<Maybe<Omit<User, "password">>>>;
};

export const AuthContext = React.createContext<UserContext>({
  maybeUser: Maybe.fromValue(),
  logIn: Promise.resolve,
  signUp: Promise.resolve,
  setMaybeUser: (prevState) => prevState
});


export const AuthProvider: React.FC<ProviderProps> = (props) => {
  const auth = useProvideAuth(props.maybeUser, props.setMaybeUser);

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  );
};

function useProvideAuth(maybeUser: Maybe<Omit<User, 'password'>>, setMaybeUser: React.Dispatch<React.SetStateAction<Maybe<Omit<User, "password">>>>) {
  async function logIn(user: Omit<User, 'id'>) {
    const maybeUserResponse = await api.logIn(user);
    setMaybeUser(maybeUserResponse);
    maybeUserResponse.inCaseOf({
      Nothing: () => Promise.resolve(),
      Just: (user) => saveJWT(user.jwt)
    });
  }

  async function signUp(user: Omit<User, 'id'>) {
    const maybeUserResponse = await api.signUp(user);
    setMaybeUser(maybeUserResponse);
    maybeUserResponse.inCaseOf({
      Nothing: () => Promise.resolve(),
      Just: (user) => saveJWT(user.jwt)
    });
  }

  return {
    maybeUser,
    signUp,
    logIn,
    setMaybeUser
  };
}


export function useAuth() {
  return useContext(AuthContext);
}