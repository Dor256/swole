import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCachedResources } from './hooks/useCachedResources';
import { useColorScheme } from './hooks/useColorScheme';
import { BottomTabNavigator } from './bottom-tabs';
import LinkingConfiguration from './LinkingConfiguration';
import { NotFound } from './not-found';
import { api, User } from './common/api';
import { LoginPage } from './login';
import { useMaybeState } from './hooks/useMaybeState';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { saveJWT } from './common/storage';
import { Maybe } from '@unpacked/tool-belt';
import { useAuth } from './hooks/useAuth';

export type RootStackParamList = {
  Login: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type NavigationProps = {
  colorScheme: ColorSchemeName;
};

const Navigation: React.FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const RootScreen: React.FC = () => {
  // const [,setUser] = useMaybeState<Omit<User, 'password'>>();
  const { maybeUser, setMaybeUser } = useContext(AuthContext);

  async function onLogin(user: Omit<User, 'id'>) {
    const maybeUserResponse = await api.logIn(user);
    setMaybeUser(maybeUserResponse);
    maybeUserResponse.inCaseOf({
      Nothing: () => Promise.resolve(),
      Just: (user) => saveJWT(user.jwt)
    });
  }

  return maybeUser.inCaseOf({
    Nothing: () => <LoginPage onLogin={onLogin} />,
    Just: () => <BottomTabNavigator api={api} />
  });

  // return maybeUser.inCaseOf({
  //   Just: () => <BottomTabNavigator api={api} />,
  //   Nothing: () => <LoginPage onLogin={onLogin} />
  // });
};

const RootNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Root"
        component={RootScreen}
      />
      <Screen
        name="NotFound"
        component={NotFound}
        options={{ title: 'Oops!' }}
      />
    </Navigator>
  );
};

export const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [ maybeUser, setMaybeUser ] = useAuth();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider value={{ maybeUser, setMaybeUser }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
};
