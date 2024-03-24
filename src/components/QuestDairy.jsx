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
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

//Icons
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



const QuestDairy = ({navigation,  weight }) => {
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

  const handleMaps = (menu) => {
    navigation.navigate("Maps", { menu: menu });
  };

   const handleChecked = async (key, index) => {
    const username = await AsyncStorage.getItem("username");
     console.log(key, index);
    const currentDate = new Date()
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-");
    try {
      const userPlanDocRef = doc(db, "UserPlan", username, "plan", currentDate);
      const userPlanDocSnap = await getDoc(userPlanDocRef);
        if (userPlanDocSnap.exists()) {
            // อ่านข้อมูล userPlan จาก Firestore
            const userPlanData = userPlanDocSnap.data();

            // ตรวจสอบว่า key เป็น "exercisePlan" หรือไม่
            if (key === "exercisePlan") {
                // คำนวณอินเด็กซ์ใหม่โดยลบ 3 ออกจากอินเด็กซ์ที่ได้รับ
                const newIndex = index - 3;

                // อัปเดตเอกสารในอาร์เรย์โดยใช้ตำแหน่งใหม่
                userPlanData.exercisePlan[newIndex] = {checked: true}; // แทนที่ updatedData ด้วยข้อมูลที่ต้องการอัปเดต
            }else if( key === "mealPlan") {
                userPlanData.mealPlan[index] = {checked: true};
            }

            // อัปเดตเอกสารใน Firestore
            await updateDoc(userPlanDocRef, userPlanData);
            console.log("Document successfully updated!");
        } else {
            console.log("No such document!");
        }
      console.log(data)
    }catch (err) {
      console.error("quest res err: ", err);
    }

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
        console.log("MealPlan", data.data.mealPlan);
        const [mealPlanData, exercisePlanData] = await Promise.all([
          data?.data?.mealPlan,
          data?.data?.exercisePlan,
        ]);
        console.log(mealPlanData.length + exercisePlanData.length)
        const countIndex = mealPlanData.length + exercisePlanData.length;
        console.log("Index", countIndex)
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
                  // if (key === "exercisePlan" && value.length !== 0) {
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
                        { item.มื้อ &&
                        <Text style={tw`text-black font-bold `}>
                          {item.มื้อ}
                        </Text>
                         }
                        <TouchableOpacity 
                          style={tw`flex-row`}
                          onPress={item.เมนู ? () => handleMaps(item.เมนู) : null}
                          disabled={!item.เมนู}
                        >
                          <Text style={tw`text-black font-bold mr-3`}>
                            {item.เมนู ? item.เมนู : item.ประเภท}
                          </Text>
                          {item.เมนู && <FontAwesome name="location-arrow" size={18} color="#4285F4" />}
                        </TouchableOpacity>
                        <Text style={tw`text-black font-bold `}>
                          {item.แคลอรี่ ? `${item.แคลอรี่} cals` : `${item.ระยะเวลา} นาที`}
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
                          handleChecked(key, index);
                        }}
                        disabled={checked[index]}
                      >
                        <Text style={tw`text-white font-bold `}>
                          {checked[index] ? "Checked" : "Check"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
              // }
              });
              }
            })}
        </>
      )}
    </>
  );
};

export default QuestDairy;
