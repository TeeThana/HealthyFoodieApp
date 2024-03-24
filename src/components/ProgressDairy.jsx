import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";

const ProgressDairy = ({ progress, countDiary }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (progress !== undefined && countDiary !== undefined) {
      const multipliedProgress = (progress / countDiary) * 100;
      setPercent(multipliedProgress);
    }
  }, [progress]);

  return (
    <View style={tw`bg-white w-5/6 h-20 mt-5 rounded-lg shadow-md`}>
      <View style={tw`items-center`}>
        <Text style={{ fontFamily: "inter-bold", ...tw`uppercase text-black mt-5`}}>dairy</Text>
      </View>
      <View style={tw`mt-5 items-center`}>
        <Progress.Bar
          progress={percent / 100}
          width={250}
          color={"#00D49D"}
          unfilledColor={"#D9D9D9"}
          borderWidth={0}
          height={8}
        />
      </View>
    </View>
  );
};

export default ProgressDairy;
