import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";

//icons
import { AntDesign } from "@expo/vector-icons";

//db
import { db } from "../../../../firebaseConfig";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mockRewardData = [
  { key: "15% Food Discount", value: 99 },
  { key: "20% Food Discount", value: 159 },
  { key: "100 THB Gift Voucher", value: 89 },
  { key: "300 THB Gift Voucher", value: 199 },
  { key: "1,000 THB Gift Voucher", value: 799 },
];

const RewardScreen = ({ navigation }) => {
  const [isClaim, setIsClaim] = useState({});
  const [canClaim, setCanClaim] = useState({});
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserPoint();
    checkIsClaimedReward();
  }, [points]);

  const handleRefresh = () => {
    setRefreshing(true);
    getUserPoint(); 
    checkIsClaimedReward();
    setRefreshing(false);
  };

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

  const claimReward = async (key, value) => {
    try {
      console.log(key, value);
      const username = await AsyncStorage.getItem("username");
      const docRef = doc(db, "UserRewards", username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingData = docSnap.data();
        const updatePoint = existingData.point - value;
        const updatedRewards = [
          ...existingData.reward,
          { key, value, isUsed: false },
        ];
        if (existingData.reward) {
          await updateDoc(docRef, {
            point: updatePoint,
            reward: updatedRewards,
          });
        } else {
          await setDoc(docRef, {
            point: updatePoint,
            reward: [
              {
                key: key,
                value: value,
                isUsed: false,
              },
            ],
          });
        }

        console.log(`claim ${key} success`);
      } else {
        await setDoc(docRef, {
          point: updatePoint,
          reward: [
            {
              key: key,
              value: value,
            },
          ],
        });
        console.log(`claim ${key} success`);
      }
    } catch (err) {
      console.error("Claim reward error: ", err);
    }
  };

  const checkIsClaimedReward = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const docRef = doc(db, "UserRewards", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().reward;
        setReward(data);
      }
    } catch (err) {
      console.error("Check is claimed reward error: ", err);
    }
  };

  const handleClaim = async (index, value, key) => {
    if (points < value) {
      setCanClaim((prevStatus) => ({
        ...prevStatus,
        [index]: false,
      }));
      setIsClaim((prevStatus) => ({
        ...prevStatus,
        [index]: false,
      }));
      Alert.alert(
        "Not enough points",
        "You don't have enough points to claim this reward."
      );
    } else {
      setCanClaim((prevStatus) => ({
        ...prevStatus,
        [index]: true,
      }));
      setIsClaim((prevStatus) => ({
        ...prevStatus,
        [index]: true,
      }));
      setPoints(points - value);
      await claimReward(key, value);
      checkIsClaimedReward();
    }
  };

  const isRewardClaimed = (key) => {
    return (
      reward && reward.length > 0 && reward.some((item) => item.key === key)
    );
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
            Rewards
          </Text>
        </View>

        <View
          style={{
            ...tw`flex-row justify-between items-center mt-auto mb-3 px-5`,
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
          <TouchableOpacity
            onPress={() => navigation.navigate("MyRewards")}
            style={tw` rounded-2xl bg-white p-2`}
          >
            <Text
              style={{
                fontFamily: "inter-bold",
                ...tw`font-bold text-base text-center`,
              }}
            >
              My Rewards
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...tw`flex-1 h-full bg-[#F3EDF5]` }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          data={mockRewardData}
          renderItem={({ item, index }) => (
            <View style={tw`bg-white rounded-xl m-2 py-3`}>
              <Text style={{ fontFamily: "inter-bold", ...tw`px-5 text-lg` }}>
                {item.key}
              </Text>
              <Text style={{ fontFamily: "inter-medium", ...tw`px-5 text-sm` }}>
                Promotion {item.key}. Only participating stores.
              </Text>
              <View style={tw`flex-row mt-1 items-center justify-between`}>
                <View style={tw`pl-5 flex-row items-center`}>
                  <Text
                    style={{
                      fontFamily: "inter-bold",
                      ...tw`text-base text-[#05D6A0]`,
                    }}
                  >
                    {item.value}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "inter-bold",
                      ...tw`text-base`,
                    }}
                  >
                    {" "}
                    Points
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    tw`p-2 rounded-xl mr-5`,
                    isRewardClaimed(item.key)
                      ? tw`bg-gray-400`
                      : tw`bg-[#05D6A0]`,
                  ]}
                  onPress={() => handleClaim(index, item.value, item.key)}
                  disabled={isRewardClaimed(item.key)}
                >
                  <Text
                    style={{
                      fontFamily: "inter-bold",
                      ...tw`text-base text-white`,
                    }}
                  >
                    {isRewardClaimed(item.key) ? "Claimed!" : "Claim"}
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

export default RewardScreen;
