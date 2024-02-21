import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import RenderAnswerWithAI from "../components/AI/RenderAnswerWithAI";
import axios from "axios";

const Gemini = () => {
  const API_KEY = "AIzaSyC70laM8ltR-_XkLOnd4oMdxuUoIJ5Q7BQ";
  const [answer, setAnswer] = useState([]);
  const [input, setInput] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [error, setError] = useState(null);
  const [validateAnswer, setValidateAnswer] = useState({
    date: "",
    food: { meal: "", menu: "", calorie: "" },
    exercise: { type: "", time: "" },
  });

  const handleInput = async () => {
    let updateAnswer = [
      ...answer,
      {
        role: "user",
        parts: [{ text: input }],
      },
    ];

    setLoadings(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updateAnswer,
        }
      );

      console.log(
        "Gemini API response: ",
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
      );

      let data =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (data && data.includes("```") && input.includes("เคสที่ให้ช่วย")) {
        let startIndex;

        if (data.includes("```json")) {
          startIndex = data.indexOf("```json") + 7;
        } else {
          startIndex = data.indexOf("```") + 3;
        }

        const endIndex = data.lastIndexOf("```");

        const jsonString = data.substring(startIndex, endIndex); // Extract JSON string
        try {
          const jsonData = JSON.parse(jsonString);
          console.log("json: ", jsonData);

          const transformedResults = {};
          const currentDate = new Date().toISOString().slice(0, 10);

          jsonData["ตารางการรับประทานอาหาร"].forEach((entry) => {
            const date = entry["วันที่"];

            // Initialize the transformedResult object for this date if not already present
            if (!transformedResults[date]) {
              transformedResults[date] = {
                date: currentDate,
                food: [],
                exercise: {},
              };
            }

            // Add food details for this entry
            transformedResults[date].food.push({
              meal: entry["มื้อ"],
              menu: entry["เมนู"],
              calorie: entry["แคลอรี่"],
            });
          });

          // Loop through each entry in "ตารางการออกกำลังกาย" array
          jsonData["ตารางการออกกำลังกาย"].forEach((entry) => {
            const date = entry["วันที่"];

            // Add exercise details for this date
            transformedResults[date].exercise = {
              type: entry["ประเภท"],
              time: entry["ระยะเวลา"],
            };
          });

          setValidateAnswer(JSON.stringify(transformedResults, null, 2));
          console.log(
            "validateAnswer: ",
            JSON.stringify(transformedResults, null, 2)
          );
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        const answerWithModel =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const updateAnswerWithModel = [
          ...updateAnswer,
          {
            role: "model",
            parts: [{ text: answerWithModel }],
          },
        ];
        setAnswer(updateAnswerWithModel);
        setInput("");
      }
    } catch (err) {
      console.error("Error calling Gemini API: ", err);
      console.error("Error response: ", err.response);
      setError("An error occurred. Please try agian.");
    } finally {
      setLoadings(false);
    }
  };

  const renderAnswerItem = ({ item }) => {
    return <RenderAnswerWithAI role={item.role} text={item.parts[0].text} />;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Test Gemini AI</Text>
      <FlatList
        data={answer}
        renderItem={renderAnswerItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.answerContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleInput}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {loadings && <ActivityIndicator style={styles.loadings} color="#333" />}
      {error && <Text style={styles.error}>{error}</Text>}
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

export default Gemini;
