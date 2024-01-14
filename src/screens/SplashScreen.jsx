import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

const SplashScreen = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust the starting and ending positions
  });

    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Text style={styles.font}>HealthyGen</Text>
        </Animated.View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    color: "#00D49D",
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default SplashScreen;