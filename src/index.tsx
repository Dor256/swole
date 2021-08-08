import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import { DarkTheme, LightTheme } from './common/constants/NavigationThemes';
import { SplashScreen } from './splash';

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
    Just: (user) => {
      return (
        <Home api={api} user={user} />
      );
    }
  });
};

const Navigation: React.FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : LightTheme}
    >
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
    </NavigationContainer>
  );
};

export const App: React.FC = () => {
  const { isLoadingComplete, maybeUser, setMaybeUser } = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider
        maybeUser={maybeUser}
        setMaybeUser={setMaybeUser}
      >
        <SplashScreen isLoadingComplete={isLoadingComplete}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SplashScreen>
      </AuthProvider>
    </SafeAreaProvider>
  );
};
