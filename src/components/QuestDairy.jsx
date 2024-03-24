import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Components
import ProgressDairy from "../components/ProgressDairy";

//Api
import { Gemini, getData, getFirstDocName } from "../api/Gemini";

const QuestDairy = ({ weight }) => {
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [countData, setCountData] = useState(1);

  useEffect(() => {
    const input = async () => {
      const username = await AsyncStorage.getItem("username");
      const userData = await AsyncStorage.getItem("userInfo");
      const parsedUserData = JSON.parse(userData);
      setUserInfo(parsedUserData);
      await requestPlan(parsedUserData, username);
      // console.log(
      //   "input from async storage: ",
      //   parsedUserData,
      //   "user:",
      //   username
      // );
    };
    input();
  }, []);

  const handleChecked = (index) => {
    //  console.log(index);
    setChecked((prevChecked) => {
      const updatedChecked = [...prevChecked];
      updatedChecked[index] = !updatedChecked[index];
      return updatedChecked;
    });
    setProgress((prevProgress) => prevProgress + 1);
  };

  const requestPlan = async (userInfo, username) => {
    setLoading(true);
    try {
      const currentDate = new Date()
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-");
      let data = await getData(username, currentDate);

      if (data && data.status === "success") {
        // console.log("pull data success");
        setData(data.data);

        const [mealPlanData, exercisePlanData] = await Promise.all([
          data.data.mealPlan,
          data.data.exercisePlan,
        ]);

        const countIndex = mealPlanData.length + exercisePlanData.length;
        setCountData(countIndex);
      } else {
        const res = await Gemini(userInfo, weight, username);
        // console.log("quest: ", res && res.status);

        if (res && res.status === "success") {
          data = await getData(username, currentDate);
          if (data && data.status === "success") {
            // console.log("pull data success");
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

  return (
    <>
      {loading ? (
        <View style={tw`flex flex-row justify-center mx-3 mt-5 items-center`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <ProgressDairy progress={progress} countDiary={countData} />
          {data &&
            Object.entries(data).map(([key, value]) => {
              if (key === "exercisePlan" || key === "mealPlan") {
                return value.map((item, index) => {
                  // สร้าง key ที่ไม่ซ้ำกันโดยใช้ key และ index
                  const uniqueKey = `${key}-${index}`;
                  if (key === "exercisePlan") {
                    index += 3;
                  }
                  return (
                    <View
                      key={uniqueKey}
                      style={tw`items-baseline bg-white w-5/6 h-20 mt-5 rounded-lg shadow-md flex flex-row justify-between items-center px-4`}
                    >
                      <View style={tw`w-3/5`}>
                        <Text style={tw`text-black font-bold `}>
                          {item.มื้อ || item.ประเภท}
                        </Text>
                        <Text style={tw`text-black font-bold `}>
                          {item.เมนู || item.ระยะเวลา}
                        </Text>
                        <Text style={tw`text-black font-bold `}>
                          {item.แคลอรี่ || item.วัน}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          tw`p-3 rounded-md`,
                          {
                            backgroundColor: checked[index]
                              ? "#D9D9D9"
                              : "#00D49D",
                          },
                        ]}
                        onPress={() => {
                          handleChecked(index);
                        }}
                        disabled={checked[index]}
                      >
                        <Text style={tw`text-white font-bold `}>
                          {checked[index] ? "Checked" : "Check"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                });
              }
            })}
        </>
      )}
    </>
  );
};

export default QuestDairy;
