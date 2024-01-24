import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import InfoScreen from "./src/screens/InfoScreen";
import { signedOut, UserAuth } from "./src/api/Authentication";
import { AuthProvider } from "./src/api/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState(null);


  useEffect(() => {
    getToken();
  }, [token]);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken);
      setToken(userToken);
    } catch (e) {
      console.log("Error getting token:", e);
    }
  };

  const handleSignOut = async () => {
    try {
      const signedOutSuccess = await signedOut();
      if (signedOutSuccess) {
        setToken(null);
      }
    } catch (error) {
      console.error("Error handling sign out:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={token ? "Info" : "SignIn"}
        screenOptions={{ headerShown: false }}
        initialParams={{ handleSignOut }}
      >
        {token ? (
          <Stack.Screen name="Info" component={InfoScreen} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
