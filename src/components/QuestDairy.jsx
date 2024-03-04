import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import ProgressDairy from "../components/ProgressDairy";
import { Gemini, getData, getFirstDocName } from "../api/Gemini";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestDairy = ({ weight }) => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const input = async () => {
      const username = await AsyncStorage.getItem("username");
      const userData = await AsyncStorage.getItem("userInfo");
      const parsedUserData = JSON.parse(userData);
      setUserInfo(parsedUserData);
      requestPlan(parsedUserData, username);
      console.log(
        "input from async storage: ",
        parsedUserData,
        "user:",
        username
      );
    };
    input();
  }, []);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const requestPlan = async (userInfo, username) => {
    setLoading(true);
    try {
      let data = await getData(username);

      if (data && data.status === "success" ) {
        console.log("pull data success");
        setData(data.data);
      } else {
        const res = await Gemini(userInfo, weight, username);
        console.log("quest: ", res && res.status);

        if (res && res.status === "success") {
          data = await getData(username);
          if (data && data.status === "success") {
            console.log("pull data success");
            setData(data.data);
          }
        }
      }
    } catch (err) {
      console.error("quest res err: ", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("data: ", data);

  return (
    <>
      {loading ? (
        <View style={tw`flex flex-row justify-center mx-3 mt-5 items-center`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {data &&
            Object.entries(data).map(
              ([key, value]) =>
                key === "mealPlan" &&
                value.map((item, index) => (
                  <View
                    key={index}
                    style={tw`items-baseline bg-white w-5/6 h-20 mt-5 rounded-lg shadow-md flex flex-row justify-between`}
                  >
                    <ScrollView contentContainerStyle={tw`w-full p-5`}>
                      <Text style={tw`text-black font-bold `}>{item.มื้อ}</Text>
                      <Text style={tw`text-black font-bold `}>{item.เมนู}</Text>
                      <Text style={tw`text-black font-bold `}>
                        {item.แคลอรี่}
                      </Text>
                    </ScrollView>
                    <TouchableOpacity
                      style={[
                        tw`p-3 rounded-md`,
                        { backgroundColor: checked ? "#D9D9D9" : "#00D49D" },
                      ]}
                      onPress={() => {
                        handleChecked();
                      }}
                    >
                      <Text style={tw`text-white font-bold `}>
                        {checked ? "Checked" : "Check"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
            )}
          {!data && (
            <View
              style={tw`flex flex-row justify-center mx-3 mt-5 items-center`}
            >
              <ActivityIndicator />
              <Text>err</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default QuestDairy;
