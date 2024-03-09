import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Screens
import CalendarScreen from "../CalendarScreen";
import FriendsScreen from "../FriendsScreen";
import { AuthStack, HomeStack, AccountStack } from "../../routes/Stack";

//Icons
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Firebase
import {
  doc, getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 100,
  },
};

const AppTap = ({ isPlan }) => {
  console.log("plan1: " + isPlan);
  
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={() => <HomeStack isPlan={isPlan}/>}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="home"
                  size={24}
                  color={focused ? "#313047" : "#E3E3E3"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#313047" : "#E3E3E3",
                    marginTop: 5,
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="calendar-week"
                  size={24}
                  color={focused ? "#313047" : "#E3E3E3"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#313047" : "#E3E3E3",
                    marginTop: 5,
                  }}
                >
                  Calendar
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="user-friends"
                  size={24}
                  color={focused ? "#313047" : "#E3E3E3"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#313047" : "#E3E3E3",
                    marginTop: 5,
                  }}
                >
                  Friends
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="account-circle"
                  size={24}
                  color={focused ? "#313047" : "#E3E3E3"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#313047" : "#E3E3E3",
                    marginTop: 5,
                  }}
                >
                  Account
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

function AuthSwitchNavigator() {
  const [user, setUser] = useState(User || null);
  const [isInfo, setIsinfo] = useState(false);
  const [isPlan, setIsplan] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.email);
        setUser(user.email.split("@")[0]);
        await AsyncStorage.setItem("username", user.email.split("@")[0]);
        await fetchUserInfo(user.email.split("@")[0]);
        await fetchPlan(user.email.split("@")[0]);
      } else {
        console.log("no user");
        setUser(null);
      }
    });
  }, []);

  const fetchUserInfo = async (username) => {
  
    try {
      const res = await getDocs(
        query(collection(db, "UserInfo"), where("username", "==", username))
      );

      if (res.empty) {
        console.log("No user information available");
        setIsinfo(false);
      } else {
        const userInfoPromises = res.docs.map(async (doc) => {
          const data = doc.data();
          console.log("data:", data);
          await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        });

        setIsinfo(true);

        await Promise.all(userInfoPromises);
        console.log("Retrieved user information successfully!");
      }
    } catch (err) {
      console.error("fetch data error: ", err.message);
    } 
  };

  const fetchPlan = async (username) => {
    try {
      const docRef = doc(db, "UserPlan", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("plan found");
        setIsplan(true);
      } else {
        console.log("No user plan found");
        setIsplan(false);
      }
    } catch (err) {
      console.error("getDoc error: ", err);
    }
  };

  return (
    <NavigationContainer>
      {/* {user && isInfo ? <AppTap /> : user && !isInfo? <InfoScreen/> : <AuthStack />} */}
      
      {user ? <AppTap isPlan={isPlan}/> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AuthSwitchNavigator;
