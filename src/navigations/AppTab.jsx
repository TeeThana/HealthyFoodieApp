import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screen
import { HomeStack, AccountStack } from "./Stack";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
//Component
import Loading from "../components/Loading";

//Icon
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 80,
  },
};

export const AppTab = ({ isPlan }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Tab.Screen
            name="Home"
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
          >
            {() => <HomeStack isPlan={isPlan} />}
          </Tab.Screen>
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
          {/* <Tab.Screen
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
          /> */}
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
      )}
    </>
  );
};
