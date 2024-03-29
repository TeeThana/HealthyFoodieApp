import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

//icons
import { AntDesign } from "@expo/vector-icons";

//db
import { db } from "../../../../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyRewardSreen = ({ navigation }) => {
  const [points, setPoints] = useState(0);
  const [isUsed, setIsUsed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState([]);

  const handleUse = async (index) => {
    setIsUsed((prevStatus) => ({
      ...prevStatus,
      [index]: true,
    }));

    try {
      const username = await AsyncStorage.getItem("username");
      const docRef = doc(db, "UserRewards", username);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const rewardData = docSnapshot.data().reward;
        rewardData[index].isUsed = true;

        await updateDoc(docRef, {
          reward: rewardData,
        });
      } else {
        console.error("Document does not exist.");
      }
    } catch (error) {
      console.error("Error updating isUsed status:", error);
    }
  };

  useEffect(() => {
    getUserPoint();
    getMyReward();
    const fetchIsUsedStatus = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const docRef = doc(db, "UserRewards", username);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const rewardData = docSnapshot.data().reward;
          const newIsUsed = rewardData.map((reward) => reward.isUsed);
          setIsUsed(newIsUsed);
        } else {
          console.error("Document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching isUsed status:", error);
      }
    };
    fetchIsUsedStatus();
  }, [points]);

  const getUserPoint = async () => {
    setLoading(true);
    try {
      const username = await AsyncStorage.getItem("username");
      const docRef = doc(db, "UserRewards", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().point;
        console.log(data);
        setPoints(data);
      } else {
        console.log("no doc");
        setPoints(0);
      }
    } catch (err) {
      console.error("get points error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getMyReward = async () => {
    setLoading(true);
    try {
      const username = await AsyncStorage.getItem("username");
      const docRef = doc(db, "UserRewards", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().reward;
        setReward(data);
        console.log("reward: ", data);
      }
    } catch (err) {
      console.error("Get my reward error: ", err);
    }
  };

  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={tw`flex-1`}
    >
      <View style={{ ...tw`h-1/4` }}>
        <View
          style={{ marginTop: "15%", ...tw`flex justify-center items-center` }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`absolute left-5`}
          >
            <AntDesign name="arrowleft" size={25} color="#313047" solid />
          </TouchableOpacity>
          <Text style={{ fontFamily: "inter-bold", ...tw`font-bold text-2xl` }}>
            My Rewards
          </Text>
        </View>

        <View
          style={{
            ...tw`flex-row justify-end items-center mt-auto mb-3 px-5`,
          }}
        >
          <Text
            style={{
              fontFamily: "inter-bold",
              ...tw`font-bold text-base text-center`,
            }}
          >
            {loading ? 0 : points} Points
          </Text>
        </View>
      </View>
      <View style={{ ...tw`flex-1 h-full bg-[#F3EDF5]` }}>
        <FlatList
          data={reward}
          renderItem={({ item, index }) => (
            <View style={tw`bg-white rounded-xl m-2 py-3`}>
              <Text style={{ fontFamily: "inter-bold", ...tw`px-5 text-lg` }}>
                {item.key}
              </Text>
              <Text style={{ fontFamily: "inter-medium", ...tw`px-5 text-sm` }}>
                This promotion {item.key}will expiers in ... days.
              </Text>
              <View style={tw`flex-row mt-1 items-center justify-end`}>
                <TouchableOpacity
                  style={[
                    tw`p-2 rounded-xl mr-5`,
                    isUsed[index] ? tw`bg-gray-400` : tw`bg-[#05D6A0]`,
                  ]}
                  onPress={() => handleUse(index)}
                  disabled={isUsed[index]}
                >
                  <Text
                    style={{
                      fontFamily: "inter-bold",
                      ...tw`text-base text-white`,
                    }}
                  >
                    {isUsed[index] ? "Used!" : "Use"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default MyRewardSreen;
