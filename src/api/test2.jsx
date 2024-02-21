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

const Test2 = () => {
  const [answer, setAnswer] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const input = {
    เพศ: "ชาย",
    อายุ: "22",
    ส่วนสูง: "173",
    น้ำหนัก: "85",
    แพ้อาหาร: ["กุ้ง", "ไข่แดง"],
    เป้าหมาย: "ลดน้ำหนักเหลือ 65",
  };
  
  const inputString = JSON.stringify(input);

  const parts = [
    {
      text: `${all_prompt} เคสที่ให้ช่วย ${inputString}`,
    },
  ];

  const handleRequest = async () => {
    setLoadings(true);
    try {
        // console.log(parts)
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
      let response = result.response.text();
      response = response.replace(/นาที/g, "");
      
      console.log("model res: ", response);

      if (isValidJSON(response)) {
        const jsonResponse = JSON.parse(response);
        const formattedJSON = JSON.stringify(jsonResponse, null, 2);
        setAnswer(formattedJSON);
        console.log(formattedJSON);
      } else {
        setAnswer(response);
        console.error("Invalid JSON format:", response);
      }
    } catch (err) {
        console.error("model res err: ", err);
    } finally {
      setLoadings(false);
    }
  };

  const isValidJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
        <Text style={styles.title}>Test Gemini AI</Text>
        <Text style={styles.answerContainer}>{answer}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            // value={input}
            // onChangeText={setInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleRequest}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {loadings && <ActivityIndicator style={styles.loadings} color="#333" />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    flex: 0.7,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 24,
  },
  answerContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    padding: 8,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loadings: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Test2;
