import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

//Components
import ProgressBar from "../../components/ProgressBar";
import ProgressDairy from "../../components/ProgressDairy";
import QuestDairy from "../../components/QuestDairy";

//api
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const ProgramScreen = ({ navigation, route }) => {
  const [weight, setWeight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const username = await AsyncStorage.getItem("username");
        const docRef = doc(db, "UserPlan", username);
        // console.log("route: ", weightGoal);
        // await setDoc(docRef, {
        //   goal: weightGoal,
        // });
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const goal = data && data.goal;
          console.log(data.timeRange);
          const modifiedTimeRange =
            data && data.timeRange
              ? data.timeRange.replace(/สัปดาห์/g, "").trim()
              : "";
          const countDay = modifiedTimeRange
            ? parseInt(modifiedTimeRange, 10) * 7
            : 0;
          console.log(modifiedTimeRange);
          console.log(goal);
          setGoalDay(countDay);
          setWeight("50");
        } else {
          console.log("no doc:", route.params.weightGoal.toString());
          setWeight(route.params.weightGoal.toString());
        }
      } catch (err) {
        console.error("getDoc error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const [goalDay, setGoalDay] = useState();

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
          <Text style={{fontFamily: "inter-bold", ...tw`text-2xl `}}>Program</Text>
        </View>
        <View style={tw`items-center `}>
          {!loading ? (
            <>
              <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
                <View
                  style={tw`bg-white w-5/6 h-4/6 mt-20 shadow-md items-center`}
                >
                  <QuestDairy />
                </View>
              </View>
              {weight && <ProgressBar weight={weight} goal={goalDay} />}
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
