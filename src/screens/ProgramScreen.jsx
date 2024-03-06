import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import ProgressBar from "../components/ProgressBar";
import ProgressDairy from "../components/ProgressDairy";
import QuestDairy from "../components/QuestDairy";

//api
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ProgramScreen = ({ navigation, route }) => {
  const [weight, setWeight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const username = await AsyncStorage.getItem("username");
        const docRef = doc(db, "UserPlan", username);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const goal = data.goal;
        if (!route.params) {
          setWeight(goal);
        } else {
          setWeight(route.params);
        }
      } catch (err) {
        console.error("getDoc error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

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
          { !loading ? (
            <>
              <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
                {weight && (
                  <View
                    style={tw`bg-white w-5/6 h-4/6 mt-20 shadow-md items-center`}
                  >
                    <ProgressDairy weight={weight} />
                    <QuestDairy weight={weight} />
                  </View>
                )}
              </View>
              {weight && <ProgressBar weight={weight} />}
            </>
          ) : (
            <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default ProgramScreen;
