import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCachedResources } from './hooks/useCachedResources';
import { useColorScheme } from './hooks/useColorScheme';
import { BottomTabNavigator } from './bottom-tabs';
import LinkingConfiguration from './LinkingConfiguration';
import { NotFound } from './not-found';
import { api } from './api';
import { LoginPage } from './login';

export type RootStackParamList = {
  Login: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type NavigationProps = {
  colorScheme: ColorSchemeName;
}

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

const RootNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login">
        {(props) => <LoginPage logIn={api.logIn} {...props} />}
      </Screen>
      <Screen name="Root">
        {(props) => <BottomTabNavigator api={api} {...props} />}
      </Screen>
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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};
