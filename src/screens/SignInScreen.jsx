import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
  Modal,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import LottieView from "lottie-react-native";

//Auth
import { ForgetPass, UserAuth } from "../api/Authentication";

const windowWidth = Dimensions.get("window").width;
const fontSize = windowWidth * 0.2;

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleSignIn = async (user, pass) => {
    setPasswordError(false);
    try {
      const check = await UserAuth(user, pass);
      console.log(check.message);
      if (check.status === false) {
        if (check.message === "auth/invalid-email") {
          setPasswordError(true);
        } else if (check.message === "auth/missing-password") {
          setPasswordError(true);
        } else if (check.message === "auth/invalid-credential") {
          setPasswordError(true);
        }
      } else {
        console.log("User sign in successful");
        setPasswordError(false);
      }
    } catch (err) {
      console.error("SignIn failed", err.message);
    }
  };

  const forgetPass = async (user) => {
    setSubmit(true);
    try {
      const res = await ForgetPass(user);
      if (res.status === false) {
        console.log("reset mail fail msg: ", res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDonePress = () => {
    setIsModalVisible(false);
    setSubmit(false);
  };

  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={tw`flex-1`}
    >
      <Text
        style={{
          fontFamily: "inter-bold",
          fontSize: fontSize,
          color: "rgba(31, 154, 122, 0.35)",
          marginTop: 55,
          ...tw`absolute opacity-60 text-center`,
        }}
      >
        HEALTHY HEALTHY HEALTHY
      </Text>
      <View
        style={{
          marginTop: "30%",
          marginBottom: "1%",
          marginLeft: "9%",
          marginRight: "9%",
        }}
      >
        <Text
          style={{ color: "#313047", fontSize: 64, fontFamily: "inter-black" }}
        >
          Sign In
        </Text>
        <View
          style={{
            marginTop: 35,
            ...tw`flex-row justify-end items-center mb-2`,
          }}
        >
          <Text
            style={{
              color: "rgba(49, 48, 71, 0.70)",
              fontSize: 15,
              fontFamily: "inter-bold",
              marginRight: 10,
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#313047",
              borderRadius: 20,
              color: "#ffff",
              paddingHorizontal: 15,
              paddingVertical: 8,
              ...tw`bg-[#313047] text-white `,
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={{ color: "#fff", fontFamily: "inter-bold", fontSize: 15 }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowRadius: 14.9,
          shadowColor: "rgba(0, 0, 0, 0.10)",
          shadowOpacity: 1,
          ...tw`h-full flex-shrink-0 rounded-12 bg-white`,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "15%",
            marginLeft: "12%",
            marginRight: "20%",
            borderWidth: 0,
          }}
        >
          <FontAwesome5
            name="user"
            size={20}
            color="#777"
            solid
            style={{ flex: 0, marginRight: 5 }}
          />
          <TextInput
            style={styles.userInput}
            placeholder="Email"
            placeholderTextColor="rgba(49, 48, 71, 0.70)"
            underlineColor="transparent"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "12%",
            marginRight: "20%",
            borderWidth: 0,
            marginTop: 33,
          }}
        >
          <FontAwesome5
            name="lock"
            size={20}
            color="#777"
            solid
            style={{ flex: 0, marginRight: 5 }}
          />
          <TextInput
            style={styles.passInput}
            placeholder="Password"
            placeholderTextColor="rgba(49, 48, 71, 0.70)"
            underlineColor="transparent"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => setIsModalVisible(true)}
        >
          <Text
            style={{
              color: "#313047",
              fontSize: 13,
              fontFamily: "inter-bold",
            }}
          >
            FORGOT PASSWORD?
          </Text>
        </TouchableOpacity>
        <View>
          {passwordError && (
            <Text style={tw`text-red-500 font-bold ml-15 mt-5`}>
              {" "}
              Invalid Username or Password{" "}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleSignIn(username, password)}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "inter-bold",
              fontSize: 20,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <GestureRecognizer
          style={tw`flex-1`}
          onSwipeDown={() => handleDonePress()}
        >
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
          >
            <View
              style={tw`flex-1 flex-row justify-center items-end bg-black bg-opacity-50`}
            >
              <View style={tw`h-3/5 w-full bg-[#f5f5f4] rounded-3xl`}>
                {submit ? (
                  <View style={tw`flex items-center justify-center`}>
                    <View style={tw`w-full items-center mt-8`}>
                      <View
                        style={tw`border-2 rounded-lg w-1/6 border-[#d1d5db]`}
                      ></View>
                    </View>
                    <LottieView
                      source={require("../utils/success_animation.json")} // Import your animation JSON file
                      autoPlay
                      style={tw`w-1/2 h-1/2`}
                    />
                    <Text
                      style={{
                        fontFamily: "inter-bold",
                        ...tw`text-lg`,
                      }}
                    >
                      Password reset email sent successfully!
                    </Text>
                    <Text
                      style={{
                        fontFamily: "inter-medium",
                        ...tw`mt-2 text-base`,
                      }}
                    >
                      Please check your email.{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDonePress()}
                      style={tw`flex-row mt-10 bg-[#34d399] p-2 rounded-lg w-22 justify-center`}
                    >
                      <Text
                        style={{
                          color: "#ffff",
                          fontSize: 16,
                          fontFamily: "inter-bold",
                        }}
                      >
                        Done!
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={tw`w-full items-center mt-8`}>
                      <View
                        style={tw`border-2 rounded-lg w-1/6 border-[#d1d5db]`}
                      ></View>
                    </View>
                    <Text
                      style={{
                        fontFamily: "inter-bold",
                        ...tw`text-3xl mt-7 ml-8`,
                      }}
                    >
                      Forgot Password
                    </Text>
                    <Text
                      style={{
                        fontFamily: "inter-medium",
                        ...tw` mt-5 ml-9 mb-12`,
                      }}
                    >
                      Please enter your email to send a reset password
                      {"\n"}email.
                    </Text>
                    <View style={tw` items-center justify-center`}>
                      <View style={tw`flex w-3/4`}>
                        <Text
                          style={{
                            fontFamily: "inter-medium",
                            ...tw`mb-2 `,
                          }}
                        >
                          Email
                        </Text>
                        <TextInput
                          placeholderTextColor="rgba(49, 48, 71, 0.70)"
                          style={tw`bg-white rounded-lg h-10 w-full p-2`}
                          value={username}
                          onChangeText={(text) => setUsername(text)}
                        />
                      </View>
                    </View>
                    <View style={tw`flex-row items-center justify-center`}>
                      <TouchableOpacity
                        onPress={() => setIsModalVisible(false)}
                        style={tw`flex-row mt-10 mr-28 bg-[#f87171] p-2 rounded-lg w-22 justify-center`}
                      >
                        <Text
                          style={{
                            color: "#ffff",
                            fontSize: 16,
                            fontFamily: "inter-bold",
                          }}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => forgetPass(username)}
                        style={tw`flex-row mt-10 bg-[#3b82f6] p-2 rounded-lg w-22 justify-center`}
                      >
                        <Text
                          style={{
                            color: "#ffff",
                            fontSize: 16,
                            fontFamily: "inter-bold",
                          }}
                        >
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  healthText: {
    marginTop: 55,
    position: "absolute",
    color: "rgba(31, 154, 122, 0.35)",
    opacity: 0.6,
    fontSize: fontSize,
    textAlign: "center",
    fontFamily: "inter-bold",
  },
  header: {
    marginTop: "30%",
    marginBottom: "1%",
    marginLeft: "9%",
    marginRight: "9%",
  },
  signInText: {
    color: "#313047",
    fontSize: 64,
    fontFamily: "inter-black",
  },
  subHeader: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  haveAccText: {
    color: "rgba(49, 48, 71, 0.70)",
    fontSize: 15,
    fontFamily: "inter-bold",
    marginRight: 10,
  },
  signUpButton: {
    backgroundColor: "#313047",
    borderRadius: 20,
    color: "#ffff",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  form: {
    // marginTop: 144,
    height: 900,
    flexShrink: 0,
    borderRadius: 50,
    backgroundColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 14.9,
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowOpacity: 1,
  },
  userInput: {
    fontSize: 15,
    fontFamily: "inter-bold",
    height: 40,
    width: "100%",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 3,
    // marginHorizontal: "12%",
    // marginTop: "15%",
    backgroundColor: "#fff",
  },
  passInput: {
    fontSize: 15,
    fontFamily: "inter-bold",
    height: 40,
    width: "100%",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 3,
    // marginHorizontal: "12%",
    // marginTop: 33,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    marginRight: "12%",
  },
  signInButton: {
    justifyContent: "center",
    backgroundColor: "#313047",
    borderRadius: 20,
    color: "#ffff",
    marginHorizontal: "12%",
    marginTop: "10%",
    // paddingVertical: "5%",
    height: 52,
    alignItems: "center",
  },
  horizontalLineZone: {
    flexDirection: "row",
    alignContent: "center",
    // justifyContent: "between",
    alignItems: "center",
  },
  horizontalLine1: {
    height: 3,
    width: 132,
    backgroundColor: "#F0F0F0",
    marginTop: 45,
    marginLeft: "12%",
    marginRight: "2%",
  },
  horizontalLine2: {
    height: 3,
    width: 132,
    backgroundColor: "#F0F0F0",
    marginTop: 45,
    marginRight: "12%",
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 14.9,
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowOpacity: 1,
    marginHorizontal: "12%",
    marginTop: "15%",
    height: 52,
  },
});

export default SignInScreen;
