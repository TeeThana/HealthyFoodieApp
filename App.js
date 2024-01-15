import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import { FontProvider } from "./src/contexts/FontContext";

export default function App() {
  return (
    //<SplashScreen />
    <SignInScreen />
  );
}
