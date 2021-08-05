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
  logOut(): Promise<void>;
};

export const AuthContext = React.createContext<UserContext>({
  maybeUser: Maybe.fromValue(),
  logIn: Promise.resolve,
  signUp: Promise.resolve,
  setMaybeUser: (prevState) => prevState,
  logOut: Promise.resolve
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

  async function logOut() {
    setMaybeUser(Maybe.fromValue());
  }

  return {
    maybeUser,
    signUp,
    logIn,
    setMaybeUser,
    logOut
  };
}


export function useAuth() {
  const { logIn, signUp, maybeUser, logOut } = useContext(AuthContext);
  return { logIn, signUp, maybeUser, logOut };
}