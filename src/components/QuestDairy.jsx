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
import { Gemini } from "../api/Gemini";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestDairy = ({ weight }) => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const input = async () => {
      const userData = await AsyncStorage.getItem("userInfo");
      const parsedUserData = JSON.parse(userData);
      setUserInfo(parsedUserData);
      console.log("input from async storage: ", parsedUserData);
    };
    input();
  }, []);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const requestPlan = async () => {
    setLoading(true);
    try {
      const res = await Gemini(userInfo, weight);
      console.log("quest: ", res.message);
      setData(res.data);
    } catch (err) {
      console.error("quest res err: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestPlan();
  }, []);

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
                key === "ตารางการรับประทานอาหาร" &&
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
