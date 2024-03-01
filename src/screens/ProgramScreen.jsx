import React, { useState } from "react";
import {View, Text, TouchableWithoutFeedback, Keyboard } from "react-native"; 
import { LinearGradient } from "expo-linear-gradient";
import tw from 'twrnc';
import ProgressBar from "../components/ProgressBar";
import ProgressDairy from "../components/ProgressDairy";
import QuestDairy from "../components/QuestDairy";

//api

const ProgramScreen = ({ navigation, route }) => {
  
  const { weight } = route.params;

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.6, 1, 1]}
        style={tw`flex-1`}
      > 
        <View style={tw`items-center mt-15 mb-5`}>
          <Text style={tw`font-bold text-2xl `}>Program</Text>
        </View>
        <View style={tw`items-center `}>
          
          <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
            <View style={tw`bg-white w-5/6 h-4/6 mt-20 shadow-md items-center`}>
              <ProgressDairy weight={weight}/>
              <QuestDairy weight={weight}/>
            </View>
          </View>
          <ProgressBar weight={weight}/>
        </View>
      </LinearGradient>
      </TouchableWithoutFeedback>
  );
};

export default ProgramScreen;
