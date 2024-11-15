import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Button } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import ApiScreen from './screens/ApiScreen';
import LogScreen from './screens/LogScreen';
import ErrorHandlingScreen from './screens/ErrorHandlingScreen';
import LoginScreen from './screens/LoginScreen';
import zipy, { ScreenNavigation } from 'zipy-react-native';
import { NativeModules } from "react-native";
import CrashANR from './screens/CrashAnr';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: { name: string };
  Settings: undefined;
  About: undefined;
  Api: undefined;
  Logs: undefined;
  Errors: undefined;
  CrashANR: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkTheme: false,
});

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // simulate fetching session URL
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogin = async (email: string, password: string, lastname: string, username: string, customerName: string ) => {
    if (true) {
      setIsLoggedIn(true);
      setTimeout(() => {
        zipy.identify(username, {
          email: email,
          firstName: password,
          lastName: lastname,
          customerName: customerName
        });
      }, 5000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    zipy.anonymize();
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <View style={{ flex: 1 }}>

        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme} onStateChange={ScreenNavigation}>
          <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: isDarkTheme ? '#1a1a2e' : '#f8f9fa' }, headerTintColor: isDarkTheme ? '#fff' : '#000' }}>
            {isLoggedIn ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Settings">
                  {(props) => <SettingsScreen {...props} handleLogout={handleLogout} />}
                </Stack.Screen>
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Api" component={ApiScreen} />
                <Stack.Screen name="Logs" component={LogScreen} />
                <Stack.Screen name="Errors" component={ErrorHandlingScreen} />
                <Stack.Screen name="CrashANR" component={CrashANR} />

              </>
            ) : (
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} handleLogin={handleLogin} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ThemeContext.Provider>
  );
};

export default App;
