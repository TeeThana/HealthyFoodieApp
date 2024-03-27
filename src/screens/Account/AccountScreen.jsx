import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

//Auth
import { signedOut } from "../../api/Authentication";

const AccountScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInformation = () => {
    navigation.navigate("Information");
  };

  const handleRewards = () => {
    navigation.navigate("Rewards");
  };

  const handleMyRewards = () => {
    navigation.navigate("MyRewards");
  };

  // const handleMaps = () => {
  //   navigation.navigate("Maps");
  // };

  const Logout = () => {
    signedOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <LinearGradient
      colors={["#00D49D", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 1]}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1`}>
        <View style={tw`bg-white h-4/6 mt-auto`}>
          <View style={tw`mt-4 justify-center items-center `}>
            <TouchableOpacity
              style={tw`p-5 w-full flex flex-row items-center justify-between`}
              onPress={handleInformation}
            >
              <Text style={{ fontFamily: "inter-medium", fontSize: 18 }}>
                Information
              </Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-5 w-full flex flex-row items-center justify-between`}
              onPress={handleRewards}
            >
              <Text style={{ fontFamily: "inter-medium", fontSize: 18 }}>
                Rewards
              </Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-5 w-full flex flex-row items-center justify-between`}
              onPress={handleMyRewards}
            >
              <Text style={{ fontFamily: "inter-medium", fontSize: 18 }}>
                My Rewards
              </Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={tw`p-5 w-full flex flex-row items-center justify-between`}
              onPress={handleMaps}
            >
              <Text style={{ fontFamily: "inter-medium", fontSize: 18 }}>
                Map
              </Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={tw`p-5 w-full flex flex-row items-center justify-between`}
              onPress={() => {
                setIsModalVisible(true);
              }}
            >
              <Text
                style={
                  // (tw`text-lg text-red-500 font-bold`,
                  { fontFamily: "inter-medium", fontSize: 18, color: "red" }
                  // )
                }
              >
                Logout
              </Text>
            </TouchableOpacity>
            <Modal
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(false);
              }}
              animationType="slide"
              transparent={true}
            >
              <View
                style={tw`flex-1 flex-row justify-center items-end bg-black bg-opacity-50`}
              >
                <View style={tw`h-1/4 w-full bg-white`}>
                  <View style={tw`items-center`}>
                    <Text style={{fontFamily: "inter-bold", ...tw`mt-10 mb-5 font-bold text-base`}}>
                      Log out of your account?
                    </Text>
                  </View>
                  <View style={tw`mx-15 `}>
                    <TouchableOpacity onPress={Logout} style={tw`items-center bg-red-500 rounded-md py-3 my-3`}>
                      <Text style={tw`uppercase text-white font-bold`}>
                        logout
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIsModalVisible(false);
                      }} style={tw`items-center bg-blue-500 rounded-md py-3`}>
                      <Text style={tw`uppercase text-white font-bold`}>
                        cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    marginTop: "10%",
    marginBottom: "5%",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalStyle: {
    height: "25%",
    width: "100%",
    backgroundColor: "white",
    // borderRadius: '25%',
  },
  background: {
    flex: 1,
  },
});
export default AccountScreen;
