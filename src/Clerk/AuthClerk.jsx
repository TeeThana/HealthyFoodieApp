import React from "react";
import { SafeAreaView, Text, StyleSheet, View,Button } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import SignInWithOAuth from "./SignInwithOAuth";

export default function AuthClerk() {
    const SignOut = () => {
      const { isLoaded, signOut } = useAuth();
      if (!isLoaded) {
        return null;
      }
      return (
        <View>
          <Button
            title="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </View>
      );
    };
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_Z29yZ2VvdXMtY3JhbmUtMC5jbGVyay5hY2NvdW50cy5kZXYk"
      }
    >
      <SignedIn>
        <Text>You are Signed in</Text>
        <SignOut />
      </SignedIn>
      <SignedOut>
        {/* <SignUpScreen /> */}
        {/* <SignInScreen /> */}
        <SignInWithOAuth/>
      </SignedOut>
    </ClerkProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
