import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import Toast from 'react-native-toast-message';

//Components
import ProgressBar from "../../components/ProgressBar";
import QuestDairy from "../../components/QuestDairy";

//api
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { RefreshContext } from "../../contexts/RefreshContext";

const ProgramScreen = ({ navigation, route }) => {


  const [weight, setWeight] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [goalDay, setGoalDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchPlan();
      setLoading(false);
    };
  
    fetchData();
  }, [refresh]);

    const fetchPlan = async () => {
      
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
          // console.log(data.timeRange);
          const modifiedTimeRange =
            data && data.timeRange
              ? data.timeRange.replace(/สัปดาห์/g, "").trim()
              : "";
          const countDay = modifiedTimeRange
            ? parseInt(modifiedTimeRange, 10) * 7
            : 0;
          // console.log(modifiedTimeRange);
          // console.log(goal);
          setGoalDay(countDay);
          setWeight(goal);
          await fetchProgress()
        } 
        else {
          console.log("no doc:", route.params.weightGoal.toString());
          setWeight(route.params.weightGoal.toString());
          console.log("fetchPlan", weight)
        }
      } catch (err) {
        console.error("getDoc error: ", err);
      } 
    };

    const fetchProgress = async() => {
      const username = await AsyncStorage.getItem("username");
      try {
        const userPlanDocRef = collection(db, "UserPlan", username, "plan");
        const q = query(userPlanDocRef, where("checkedAll", "==", true))
        const data = await getDocs(q)
        // data.forEach((doc) => {
        //   console.log(doc.id)
        // })
        const count = data.size;
        console.log("C",count)
        if ( refresh === true) {
          setProgress(count+1)
          
        }else {
          setProgress(count)
        }
        // console.log("Data", data)
      }catch (err) {
        console.error("quest res err: ", err);
      }
      // finally {
      //   setLoading(false);
      // }
    }

  return (
    <RefreshContext.Provider value={{refresh, setRefresh}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.6, 1, 1]}
        style={tw`flex-1`}
      >
        <View style={tw`items-center mt-15 mb-5`}>
          <TouchableOpacity >
          <Text style={{ fontFamily: "inter-bold", ...tw`text-2xl ` }}>
            Program
          </Text>
          </TouchableOpacity>
          {/* <Toast /> */}
        </View>
        <View style={tw`items-center `}>
          {!loading ? (
            <>
              {weight && <ProgressBar progress={progress} goal={goalDay} />}
              <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
                <View
                  style={tw`bg-green-100 w-5/6 h-4/7 mt-20 shadow-md items-center`}
                >
                  {weight && <QuestDairy navigation={navigation} weight={weight}/>}
                </View>
              </View>
              
            </>
          ) : (
            <View style={tw`bg-gray-100 w-full h-full mt-20 items-center`}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
    </RefreshContext.Provider>
  );
};

export default ProgramScreen;
