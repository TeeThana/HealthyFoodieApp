import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IncreaseWeight from "./src/screens/IncreaseWeight";
import DecreaseWeight from "./src/screens/DecreaseWeight";
import Onboarding from "./src/components/Onboarding";
import TestBoarding from "./src/components/TestBoarding";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Test" component={TestBoarding} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Increase" component={IncreaseWeight} />
        <Stack.Screen name="Decrease" component={DecreaseWeight} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
