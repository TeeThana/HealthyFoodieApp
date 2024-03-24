import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Icon
import { FontAwesome5 } from "@expo/vector-icons";


const DecreaseWeight = ({ navigation }) => {
  const [weightGoal, setWeightGoal] = useState("");

  const handleWeightChange = (text) => {
    setWeightGoal(text);
  };

  const handleSaveWeight = () => {
    console.log("Weight:", weightGoal);
    navigation.navigate("Program", { weightGoal: weightGoal });
  };

  const backHandler = () => {
    // signedOut();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#FFFFFF", "#6AFFD8", "#00D49D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.6, 1, 1]}
        style={styles.background}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5
              name="arrow-left"
              size={25}
              color="#777"
              solid
              style={{ marginTop: "17%", marginLeft: "7%" }}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.text}>decrease goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight"
              keyboardType="numeric"
              value={weightGoal}
              onChangeText={handleWeightChange}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveWeight}
            >
              <Text style={styles.saveButtonText}>Let's Start!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    marginTop: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#00D49D",
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: "50%",
    backgroundColor: "#DAFAF2",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    shadowColor: "black", // สีของเงา
    shadowOffset: { width: 0, height: 3 }, // ตำแหน่งเงา (ในแนวนอนและแนวตั้ง)
    shadowOpacity: 0.2, // ความโปร่งใสของเงา
    shadowRadius: 1, // รัศมีของเงา
  },
  saveButton: {
    top: 100,
    backgroundColor: "#FFE10E",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    borderRadius: 15,
    shadowColor: "black", // สีของเงา
    shadowOffset: { width: 0, height: 3 }, // ตำแหน่งเงา (ในแนวนอนและแนวตั้ง)
    shadowOpacity: 0.2, // ความโปร่งใสของเงา
    shadowRadius: 1, // รัศมีของเงา
  },
  saveButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DecreaseWeight;
