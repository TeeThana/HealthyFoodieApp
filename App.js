import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AuthSwitchNavigator from "./src/screens/Auth/AuthSwitchNavigator";
import Gemini from "./src/api/Gemini";
import Test2 from "./src/api/test2";

const App = () => {
  return (
    <View style={styles.container}>
      <Test2 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
