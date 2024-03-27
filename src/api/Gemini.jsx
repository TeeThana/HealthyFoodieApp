import React, { useState, useEffect, } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import moment from "moment";

//AI
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

//Prompts
import {
  all_prompt,
  clear,
  refresh_menu,
  refresh_exercise,
  refresh_all,
  continue_prompt,
  whoareyou,
} from "./AIPrompt";
import AsyncStorage from "@react-native-async-storage/async-storage";

//db
import { db } from "../../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyC70laM8ltR-_XkLOnd4oMdxuUoIJ5Q7BQ";

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export const Gemini = async (userInfo, weight, username) => {
  const parts = [
    {
      text: `${all_prompt} เคสที่ให้ช่วย ${userInfo} น้ำหนักเป้าหมาย ${weight} เช็ค allergy ให้ดีๆ เพราะผู้ใช้อาจเป็นอันตรายได้`,
    },
  ];

  const retryCount = 5;

  try {
    const currentDate = new Date()
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-");

    const docRef = doc(db, "UserPlan", username, "plan", currentDate);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
      let response = result.response.text();
      response = response.replace(/นาที/g, "");

      // console.log("model res: ", response);

      // หลังจากที่ได้รับข้อมูลมาจากโมเดลแล้ว
      if (isValidJSON(response)) {
        const jsonResponse = JSON.parse(response, null, 2);

        // เพิ่ม key checked ใน excercisePlan และ mealPlan
        jsonResponse.ตารางการออกกำลังกาย.forEach((item) => {
          item.checked = false;
        });

        jsonResponse.ตารางการรับประทานอาหาร.forEach((item) => {
          item.checked = false;
        });

        // เพิ่ม key checkedAll ใน jsonResponse และกำหนดค่าเป็น false
        jsonResponse.checkedAll = false;
        jsonResponse.checkedCount = 0;

        console.log("json: ", jsonResponse);

        // ตรวจสอบข้อมูล JSON ที่ได้รับกลับมา
        if (isEmptyJSON(jsonResponse)) {
          console.log("refresh...");
          if (retryCount > 0) {
            return await Gemini(userInfo, weight, username, retryCount - 1);
          } else {
            console.error("Retry limit exceeded");
            return { status: "fail" };
          }
        } else {
          if (
            JSON.stringify(jsonResponse) !==
            JSON.stringify({
              excercisePlan: [],
              mealPlan: [],
              ระยะเวลาที่แนะนำ: "",
            })
          ) {
            await storeToDB(username, jsonResponse, weight, currentDate);
            return { status: "success" };
          } else {
            if (retryCount > 0) {
              console.log("refresh...");
              return await Gemini(userInfo, weight, username, retryCount - 1);
            } else {
              console.error("Retry limit exceeded");
              return { status: "fail" };
            }
          }
        }
      } else {
        if (retryCount > 0) {
          return await Gemini(userInfo, weight, username, retryCount - 1);
        } else {
          console.error("Retry limit exceeded");
          return { status: "fail" };
        }
      }
    } else {
      return await getData(username, currentDate);
    }
  } catch (err) {
    console.error("model error: ", err);
    if (retryCount > 0) {
      console.log("refresh...");
      return await Gemini(userInfo, weight, username, retryCount - 1);
    } else {
      console.error("Retry limit exceeded");
      return { status: "fail" };
    }
  }
};

function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

function isEmptyJSON(jsonObject) {
  return (
    jsonObject &&
    jsonObject.hasOwnProperty("ตารางการรับประทานอาหาร") &&
    jsonObject["ตารางการรับประทานอาหาร"].length === 0 &&
    jsonObject.hasOwnProperty("ตารางการออกกำลังกาย") &&
    jsonObject["ตารางการออกกำลังกาย"].length === 0 &&
    jsonObject.hasOwnProperty("ระยะเวลาที่แนะนำ") &&
    (jsonObject["ระยะเวลาที่แนะนำ"] === null ||
      jsonObject["ระยะเวลาที่แนะนำ"] === "")
  );
}

const storeToDB = async (username, jsonResponse, weight, currentDate) => {
  // console.log("storeToDB", weight)
  try {
    const colRef = collection(db, "UserPlan");
    const docRef = doc(colRef, username);
    const subColRef = collection(docRef, "plan");
    const subDocRef = doc(subColRef, currentDate);

    let timeRange = jsonResponse["ระยะเวลาที่แนะนำ"];
    if (
      timeRange == "" ||
      timeRange == "สัปดาห์" ||
      timeRange == "ไม่ระบุ" ||
      timeRange == "1 สัปดาห์"
    ) {
      timeRange = "3 สัปดาห์";
    }

    const snapshot = await getDoc(subDocRef);
    if (snapshot.exists()) {
      await setDoc(subDocRef, {
        mealPlan: jsonResponse["ตารางการรับประทานอาหาร"],
        exercisePlan: jsonResponse["ตารางการออกกำลังกาย"],
        checkedAll: false,
        checkedCount: 0
      });
    } else {
      const check = await getDoc(docRef);

      if (!check.exists()) {
        await setDoc(docRef, {
          timeRange: timeRange,
          goal: weight,
          start: currentDate,
        });
      }

      await setDoc(subDocRef, {
        mealPlan: jsonResponse["ตารางการรับประทานอาหาร"],
        exercisePlan: jsonResponse["ตารางการออกกำลังกาย"],
        checkedAll: false,
        checkedCount: 0
      });
    }

    console.log("Plan document added successfully");
  } catch (err) {
    console.error("add firestore error: ", err);
  }
};

export const getData = async (username, currentDate) => {
  try {
    const docRef = doc(db, "UserPlan", username, "plan", currentDate);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // console.log("Document data:", data);
      return { status: "success", data: data };
    } else {
      console.log("No such document!");
      return { status: "fail", data: null };
    }
  } catch (err) {
    console.error("get firestore error: ", err);
    return { status: "err", data: null };
  }
};