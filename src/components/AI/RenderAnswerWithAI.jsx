import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RenderAnswerWithAI = ({ role, text }) => {
  return (
    <View
      style={[
        styles.answerItem,
        role === "user" ? styles.userItem : styles.modelItem,
      ]}
    >
      <Text style={styles.answerText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  answerItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  userItem: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  modelItem: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
  },
  answerText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default RenderAnswerWithAI;
