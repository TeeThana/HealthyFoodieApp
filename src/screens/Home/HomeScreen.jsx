import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";

const HomeScreen = ({ navigation }) => {

  const handleIncrease = () => {
    navigation.navigate("Increase");
  };

  const handleDecrease = () => {
    navigation.navigate("Increase");
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <TouchableOpacity
        style={tw`flex-1 bg-white justify-center items-center w-full`}
        onPress={handleIncrease}
      >
        <Text
          style={{
            fontFamily: "inter-bold",
            ...tw`uppercase text-[#00D49D] text-2xl`,
          }}
        >
          {" "}
          increase your weight
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-1 bg-[#00D49D] justify-center items-center w-full`}
        onPress={handleDecrease}
      >
        <Text
          style={{
            fontFamily: "inter-bold",
            ...tw`uppercase text-white text-2xl`,
          }}
        >
          {" "}
          decrease your weight
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white", // สีส่วนบน
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  greenContainer: {
    flex: 1,
    backgroundColor: "#00D49D",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  increseText: {
    textTransform: "uppercase",
    color: "#00D49D",
    fontSize: 25,
    fontWeight: "bold",
  },
  decreseText: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default HomeScreen;
