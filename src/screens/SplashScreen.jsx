import React from "react";
import { StyleSheet, View, Text } from "react-native";

const SplashScreen = () => {
    return (
      <View>
        <Text style={styles.font}>HealthyGen</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  font: {
    color: "#00D49D",
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default SplashScreen;