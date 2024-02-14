import React, { useState, useEffect } from "react"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignUpScreen from "../SignUpScreen";
import SignInScreen from "../SignInScreen";
import HomeScreen from "../HomeScreen";
import IncreaseWeight from "../IncreaseWeight";
import DecreaseWeight from "../DecreaseWeight";
import InfoScreen from "../InfoScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const AppTap = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Increase" component={IncreaseWeight} />
      <Tab.Screen name="Decrease" component={DecreaseWeight} />
    </Tab.Navigator>
  );
};

function AuthSwitchNavigator () {
  const [user, setUser] = useState(User || null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user:", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <AppTap />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AuthSwitchNavigator;
