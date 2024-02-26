import React, { useState, useEffect } from "react"; 
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from 'react-native';
//Screens
import CalendarScreen from "../CalendarScreen";
import FriendsScreen from "../FriendsScreen";
import InfoScreen from "../InfoScreen";
import { AuthStack, HomeStack, AccountStack} from "../../routes/Stack";

//Icons
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle:{
    height: 100
  }
  }

// const AuthStack = () => {
//   return (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//       </Stack.Navigator>
//   );
// };

const AppTap = () => {
  return ( 
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <FontAwesome5 name="home" size={24} color={focused ? "#313047": "#E3E3E3"} />
            <Text style={{fontSize: 12, color: focused ? "#313047" : "#E3E3E3", marginTop: 5}}>Home</Text>
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
            <FontAwesome5 name="calendar-week" size={24} color={focused ? "#313047": "#E3E3E3"} />
            <Text style={{fontSize: 12, color: focused ? "#313047" : "#E3E3E3", marginTop: 5}}>Calendar</Text>
          </View>
          )
        }
      }} />
      <Tab.Screen name="Friends" component={InfoScreen} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <FontAwesome5 name="user-friends" size={24} color={focused ? "#313047": "#E3E3E3"} />
            <Text style={{fontSize: 12, color: focused ? "#313047" : "#E3E3E3", marginTop: 5}}>Friends</Text>
          </View>
          )
        }
      }} />
      <Tab.Screen name="Account" component={AccountStack} options={{
        tabBarIcon: ({ focused }) => {
          return(
          <View style={{flex: 1,         
            justifyContent: 'center',
            alignItems: 'center',}}>
            <MaterialIcons name="account-circle" size={24} color={focused ? "#313047": "#E3E3E3"} />
            <Text style={{fontSize: 12, color: focused ? "#313047" : "#E3E3E3", marginTop:5}}>Account</Text>
          </View>
          )
        }
      }} />
    </Tab.Navigator>
  );
};

function AuthSwitchNavigator () {
  const [user, setUser] = useState(User || null);

  useEffect(() => {
    unsubscribeAuth();
  }, []);

  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(JSON.stringify("user:", user, null, 2));
      setUser(user);
    } else {
      console.log("no user");
      setUser(null);
    }
  });

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
