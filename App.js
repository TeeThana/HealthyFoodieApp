import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import InfoScreen from "./src/screens/InfoScreen";
import { signedOut, UserAuth } from "./src/api/Authentication";
import { AuthProvider } from "./src/api/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IncreaseWeight from "./src/screens/IncreaseWeight";
import DecreaseWeight from "./src/screens/DecreaseWeight";
import Onboarding from "./src/components/Onboarding";
import TestBoarding from "./src/components/TestBoarding";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import FriendScreen from "./src/screens/FriendsScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle:{
    height: 100
  }
  }

const Welcome = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Homes" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <FontAwesome5 name="home" size={24} color={focused ? "#313047": "#111"} />
            <Text style={{fontSize: 12, color: "#313047", marginTop: 5}}>Home</Text>
          </View>
          )
        }
      }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <FontAwesome5 name="calendar-week" size={24} color={focused ? "#313047": "#111"} />
            <Text style={{fontSize: 12, color: "#313047", marginTop: 5}}>Calendar</Text>
          </View>
          )
        }
      }} />
      <Tab.Screen name="Friend" component={FriendScreen} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <FontAwesome5 name="user-friends" size={24} color={focused ? "#313047": "#111"} />
            <Text style={{fontSize: 12, color: "#313047", marginTop: 5}}>Friends</Text>
          </View>
          )
        }
      }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,         
            justifyContent: 'center',
            alignItems: 'center',}}>
            <MaterialIcons name="account-circle" size={24} color={focused ? "#313047": "#111"} />
            <Text style={{fontSize: 12, color: "#313047", marginTop:5}}>Account</Text>
          </View>
          )
        }
      }} />
    </Tab.Navigator>
  )
}

const App = () => {
  const [token, setToken] = useState(null);


  useEffect(() => {
    getToken();
  }, [token]);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setToken(userToken);
      console.log(userToken);
    } catch (e) {
      console.log("Error getting token:", e);
    }
  };

  const handleSignIn = async () => {
    try {
      const signedInSuccess = await UserAuth();
      if (signedInSuccess) {
        await getToken();
      }
    } catch (error) {
      console.error("Error handling sign out:", error);
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
        initialParams={{ handleSignOut, handleSignIn }}
      >
        {token ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen
              name="Info"
              component={InfoScreen}
              initialParams={{ handleSignOut }}
            />
            <Stack.Screen
              name="Increase"
              component={IncreaseWeight}
              initialParams={{ handleSignOut }}
            />
            <Stack.Screen name="Decrease" component={DecreaseWeight} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              initialParams={{ handleSignIn }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName={token ? "Home" : "SignIn"}
    //     screenOptions={{ headerShown: false }}
    //     initialParams={{ handleSignOut }}
    //   >
    //     {token ? (
    //       <Stack.Screen name="Test" component={TestBoarding} />
    //       <Stack.Screen name="Onboarding" component={Onboarding} />
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //       <Stack.Screen name="Increase" component={IncreaseWeight} />
    //       <Stack.Screen name="Decrease" component={DecreaseWeight} />
    //      ) : (
    //       <>
    //         <Stack.Screen name="SignIn" component={SignInScreen} />
    //         <Stack.Screen name="SignUp" component={SignUpScreen} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
