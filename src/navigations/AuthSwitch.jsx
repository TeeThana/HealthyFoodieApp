import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

//navigation
import { AuthStack } from "./Stack";
import { AppTab } from "./AppTab";

//Screen
import FirstInfoScreen from "../screens/FirstInfoScreen";

//Firebase
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

//Location
import * as Location from "expo-location";
import { UserLocationContext } from "../contexts/UserLocationContext";

const AuthSwitch = () => {
  const [user, setUser] = useState(null);
  const [isInfo, setIsinfo] = useState(false);
  const [isPlan, setIsplan] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getLocationAndPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("location: ", location);
    };

    getLocationAndPermissions();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("auth state: ", user.email);
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

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const fetchUserInfo = async (username) => {
    try {
      const docRef = doc(db, "UserInfo", username);
      const res = await getDoc(docRef);

      if (!res.exists()) {
        console.log("No user information available");
        setIsinfo(false);
      } else {
        const data = res.data();
        console.log("user data", data);
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));

        setIsinfo(true);

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

  const handleGenerate = () => {
    setSuccess(true);
  };

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <NavigationContainer>
        {user && (isInfo || success) ? (
          <AppTab isPlan={isPlan} />
        ) : user && !isInfo ? (
          <FirstInfoScreen onSuccess={handleGenerate} />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </UserLocationContext.Provider>
  );
};

export default AuthSwitch;
