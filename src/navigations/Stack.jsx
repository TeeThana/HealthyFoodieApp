import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InfoScreen from "../screens/Account/InfoScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import MapScreen from "../screens/Account/MapScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import IncreaseWeight from "../screens/Home/IncreaseWeight";
import DecreaseWeight from "../screens/Home/DecreaseWeight";
import ProgramScreen from "../screens/Home/ProgramScreen";
import RewardScreen from "../screens/Account/Reward/RewardScreen";
import MyRewardSreen from "../screens/Account/Reward/MyRewardSreen";


//Components
import Loading from "../components/Loading";

const Auth = createStackNavigator();
const Account = createStackNavigator();
const Home = createStackNavigator();

export const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="SignIn" component={SignInScreen} />
      <Auth.Screen name="SignUp" component={SignUpScreen} />
    </Auth.Navigator>
  );
};

export const HomeStack = ({ isPlan }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Home.Navigator
      initialRouteName={isPlan ? "Program" : "HomeMain"}
      screenOptions={{ headerShown: false }}
    >
      <>
        <Home.Screen name="HomeMain" component={HomeScreen} />
        <Home.Screen name="Increase" component={IncreaseWeight} />
        <Home.Screen name="Decrease" component={DecreaseWeight} />
        <Home.Screen name="Program" component={ProgramScreen} />
        <Account.Screen name="Maps" component={MapScreen} />
      </>
    </Home.Navigator>
  );
};

export const AccountStack = () => {
  return (
    <Account.Navigator
      initialRouteName="AccountMain"
      screenOptions={{ headerShown: false }}
    >
      <Account.Screen name="AccountMain" component={AccountScreen} />
      {/* <Account.Screen name="Profile" component={ProfileScreen} /> */}
      <Account.Screen name="Information" component={InfoScreen} />
      <Account.Screen name="Rewards" component={RewardScreen} />
      <Account.Screen name="MyRewards" component={MyRewardSreen} />
      {/* <Account.Screen name="Maps" component={MapScreen} /> */}
    </Account.Navigator>
  );
};
