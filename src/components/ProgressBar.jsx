import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
// import { RecommendDays } from "../api/Gemini";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProgressBar = ({ weight, goal }) => {
  const [percent, setPercent] = useState(weight);
  const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     const input = async () => {
//       const userData = await AsyncStorage.getItem("userInfo");
//       const parsedUserData = JSON.parse(userData);
//       setUserInfo(parsedUserData);
//       await recommendDays(parsedUserData);
//       console.log("input from async storage: ", parsedUserData);
//     };
//     input();

//   }, []);

//   const recommendDays = async (parsedUserData) => {
//     const res = await RecommendDays(parsedUserData, weight);
//     console.log("goal: ", res );
//   };

  const handleWeightChange = (percent) => {
    setPercent(percent);
  };

  return (
    <View style={tw`absolute bg-white w-5/6 h-30 rounded-lg shadow-md`}>
      <View style={tw`flex flex-row mt-5 justify-between px-5`}>
        <Text style={tw`text-black font-bold`}>Day 1</Text>
        <Text style={tw`text-black font-bold`}>Day {goal}</Text>
      </View>
      <View style={tw`mt-5 items-center`}>
        <Progress.Bar
          progress={percent / 100}
          width={280}
          color={"#00D49D"}
          unfilledColor={"#D9D9D9"}
          borderWidth={0}
          height={8}
        />
        <TextInput
          style={tw`mt-5 `}
          placeholder="Enter your percent"
          keyboardType="numeric"
          value={percent}
          onChangeText={handleWeightChange}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
