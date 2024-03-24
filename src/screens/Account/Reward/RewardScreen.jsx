import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";

//icons
import { AntDesign } from "@expo/vector-icons";

const RewardScreen = ({ navigation }) => {
  const [isClaim, setIsClaim] = useState({});
  const [canClaim, setCanClaim] = useState({});
  const [points, setPoints] = useState(0);

  useEffect(() => {}, [points]);

  const handleClaim = (index, value) => {
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
            {points} Points
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
          data={[
            { key: "15% Food Discount", value: 99 },
            { key: "20% Food Discount", value: 159 },
            { key: "100 THB Gift Voucher", value: 89 },
            { key: "300 THB Gift Voucher", value: 199 },
            { key: "1,000 THB Gift Voucher", value: 799 },
          ]}
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
                    canClaim[index] ? tw`bg-gray-400` : tw`bg-[#05D6A0]`,
                  ]}
                  onPress={() => handleClaim(index, item.value)}
                  disabled={canClaim[index]}
                >
                  <Text
                    style={{
                      fontFamily: "inter-bold",
                      ...tw`text-base text-white`,
                    }}
                  >
                    {isClaim[index] ? "Claimed!" : "Claim"}
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
