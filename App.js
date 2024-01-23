import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import InfoScreen from "./src/screens/InfoScreen";
import { checkState } from "./src/api/Authentication";
import { AuthProvider } from "./src/api/Authentication";

const Stack = createNativeStackNavigator();

const App = () => {
  const [authState, setAuthState] = useState(false);
  
  useEffect(() => {
    checkAuthentication();
    console.log(authState);
  }, [authState]);

const checkAuthentication = async () => {
  try {
    const result = await checkState();
    if (result) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
    return result;
  } catch (e) {
    console.log("Authentication check failed:", e);
    setAuthState(false);
  }
};

  const handleSignOut = () => {
    setAuthState(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authState ? "Info" : "SignIn"}
        screenOptions={{ headerShown: false }}
      >
        {authState ? (
          <Stack.Screen
            name="Info"
            component={InfoScreen}
            initialParams={{ handleSignOut }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ animationTypeForReplace: authState ? "pop" : "push" }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            {/* <Stack.Screen
              name="Info"
              component={InfoScreen}
              initialParams={{ handleSignOut }}
            /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
