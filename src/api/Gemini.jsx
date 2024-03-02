import React, { useState, useEffect } from "react";
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

const isValidJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

export const Gemini = async (userInfo, weight) => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  
  const input = {
    เพศ: "ชาย",
    อายุ: "22",
    ส่วนสูง: "173",
    น้ำหนัก: "85",
    แพ้อาหาร: ["กุ้ง", "ไข่แดง"],
    เป้าหมาย: `ลดน้ำหนักเหลือ ${weight}`,
  };
  const inputString = JSON.stringify(input);

  const parts = [
    {
      text: `${all_prompt} เคสที่ให้ช่วย ${inputString}`,
    },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    let response = result.response.text();
    response = response.replace(/นาที/g, "");

    

    console.log("model res: ", response);

    if (isValidJSON(response)) {
      const jsonResponse = JSON.parse(response, null, 2);

      console.log("json: ", typeof jsonResponse, ": ", jsonResponse);
      return { data: jsonResponse, message: "JSON format" };
    } else {
      console.error("Invalid JSON format:", response);
      return await Gemini();
    }
  } catch (err) {
    console.error("model res err: ", err);
    return await Gemini();
  }
};
