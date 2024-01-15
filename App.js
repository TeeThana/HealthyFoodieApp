import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SplashScreen from "./src/screens/SplashScreen";

// const Stack = createStackNavigator();

export default function App() {
  return (
    //<SplashScreen /> 
    <SignInScreen />
    // <SignUpScreen />
  );
}
