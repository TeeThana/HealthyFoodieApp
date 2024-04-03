import React, { useState, useEffect,useContext } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert,StyleSheet } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import Toast from "react-native-toast-message";

//Api
import AsyncStorage from "@react-native-async-storage/async-storage";
import {doc,deleteDoc, collection, getDocs}  from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { RefreshContext } from "../contexts/RefreshContext";


const ProgressBar = ({ navigation, progress, goal }) => {
  console.log(goal);
  console.log("Progress Bar", progress);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const { refresh, setRefresh } = useContext(RefreshContext);
  console.log("Percent", percent);

  useEffect(() => {
    if (progress !== undefined || goal !== undefined) {
      setLoading(true);
      const countProgress = (progress / goal) * 100;
      setPercent(countProgress);
      setLoading(false);
    }
  }, [progress]);

  const handleCancel = () => {
    Alert.alert(
      "Cancal Program",
      "If you confirm all procress about the program will deleted",
      [{ text: "Confirm", onPress: deleteProgram },
      { text: "Cancel", onPress: () => console.log("Cancel") }],
      {style: styles.title }
    );
  }

  const deleteProgram = async () => {
    console.log("Confirm")
    try {
      const username = await AsyncStorage.getItem("username");
      console.log(username)

      const subCollectionSnapshot = await getDocs(collection(db, "UserPlan", username, "plan"));
        subCollectionSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
      await deleteDoc(doc(db, "UserPlan", username));
      console.log("Delete Program Successful")
      navigation.navigate("HomeMain")
      Toast.show({
        type: "success",
        text1: "Delete Program Successful",
        text2: "We wish you will return to choose us to help you again :)",
        visibilityTime: 5000,
      });
    }catch (err) {
      console.error("DeleteDoc error: ", err);
    }
  }

  return (
    <View style={tw`absolute z-10 bg-white w-5/6 h-30 rounded-lg shadow-md`}>
      {!loading ? (
        <>
          <View style={tw`flex flex-row mt-5 justify-between px-5`}>
            <View style={tw`flex flex-row`}>
              <Text style={{ fontFamily: "inter-bold", ...tw`text-black mr-1` }}>
                Start
              </Text>
              <Text style={{ fontFamily: "inter-bold", ...tw`text-green-500` }}>
                ({Math.ceil(percent)}%)
              </Text>
            </View>
            <Text style={{ fontFamily: "inter-bold", ...tw`text-black` }}>
              Day {goal}
            </Text>
          </View>
          <View style={tw`mt-5 items-center`}>
            <Progress.Bar
              progress={percent / 100}
              width={280}
              color={"#00D49D"}
              unfilledColor={"#D9D9D9"}
              borderWidth={0}
              height={8}
            />
            {/* <TextInput
          style={tw`mt-5 `}
          placeholder="Enter your percent"
          keyboardType="numeric"
          value={percent}
          onChangeText={handleWeightChange}
        /> */}
          {/* <TouchableOpacity style={tw` my-3`} onPress={handleCancel}>
            <Text style={tw`text-red-500 font-bold underline`}>
                Cancel Program?
            </Text>
          </TouchableOpacity> */}
          </View>
          <View style={tw`mt-5 items-end px-5`}>
          <TouchableOpacity style={tw` `} onPress={handleCancel}>
            <Text style={tw`text-red-500 font-bold underline`}>
                Cancel Program?
            </Text>
          </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'red'
  }
});

export default ProgressBar;
