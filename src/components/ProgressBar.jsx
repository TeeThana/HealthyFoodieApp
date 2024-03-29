import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";

const ProgressBar = ({ progress, goal }) => {
  console.log(goal);
  console.log("Progress Bar", progress);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  console.log("Percent", percent);

  useEffect(() => {
    if (progress !== undefined || goal !== undefined) {
      setLoading(true);
      const countProgress = (progress / goal) * 100;
      setPercent(countProgress);
      setLoading(false);
    }
  }, [progress]);

  return (
    <View style={tw`absolute z-10 bg-white w-5/6 h-30 rounded-lg shadow-md`}>
      {!loading ? (
        <>
          <View style={tw`flex flex-row mt-5 justify-between px-5`}>
            <Text style={{ fontFamily: "inter-bold", ...tw`text-black` }}>
              Start
            </Text>
            <Text style={{ fontFamily: "inter-bold", ...tw`text-black` }}>
              Day {goal}
            </Text>
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
            {/* <TextInput
          style={tw`mt-5 `}
          placeholder="Enter your percent"
          keyboardType="numeric"
          value={percent}
          onChangeText={handleWeightChange}
        /> */}
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default ProgressBar;
