import React, { useCallback } from "react";
import { Text, View } from "react-native";
import AuthSwitch from "./src/navigations/AuthSwitch";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import tw from "twrnc"
import AuthClerk from "./src/Clerk/AuthClerk";

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
      {/* <AuthClerk /> */}
    </View>
  );
}


