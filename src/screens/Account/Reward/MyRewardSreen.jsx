import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

//icons
import { AntDesign } from "@expo/vector-icons";

const MyRewardSreen = ({ navigation }) => {
  const [points, setPoints] = useState(100);
  const [isUsed, setIsUsed] = useState({});

  useEffect(() => {}, [points]);

  const handleUse = (index) => {
    setIsUsed((prevStatus) => ({
      ...prevStatus,
      [index]: true,
    }));
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
            {points} Points
          </Text>
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
