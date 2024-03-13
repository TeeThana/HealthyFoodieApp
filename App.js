import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./src/screens/Account/MapScreen";
import AuthSwitch from "./src/navigations/AuthSwitch";
import SignInScreen from "./src/screens/SignInScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import tw from "twrnc"

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "inter": require("./assets/fonts/Inter-Regular.ttf"),
    "inter-medium": require("./assets/fonts/Inter-Medium.ttf"),
    "inter-bold": require("./assets/fonts/Inter-Bold.ttf"),
    "inter-black": require("./assets/fonts/Inter-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={tw`flex-1`}>
      <AuthSwitch />
    </View>

  );
}
