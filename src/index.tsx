import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCachedResources } from './hooks/useCachedResources';
import { useColorScheme } from './hooks/useColorScheme';
import { LinkingConfiguration } from './LinkingConfiguration';
import { NotFound } from './not-found';
import { api } from './common/api';
import { LoginPage } from './auth/login';
import { WelcomeScreen } from './auth/welcome-screen';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { SignUpPage } from './auth/signup';
import { Home } from './home';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
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
  const { maybeUser } = useAuth();

  return maybeUser.inCaseOf({
    Nothing: () => {
      return (
        <Navigator screenOptions={{ headerBackTitle: 'Back' }}>
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen name="Login" component={LoginPage} />
          <Screen name="Signup" component={SignUpPage} />
        </Navigator>
      );
    },
    Just: () => {
      return (
        <Home api={api} />
      );
    }
  });
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
  const { isLoadingComplete, maybeUser, setMaybeUser } = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider
          maybeUser={maybeUser}
          setMaybeUser={setMaybeUser}
        >
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
};
