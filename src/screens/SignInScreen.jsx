import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Button,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
// import * as WebBrowser from "expo-web-browser";

//Auth
import { UserAuth } from "../api/Authentication";
// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

const windowWidth = Dimensions.get("window").width;
const fontSize = windowWidth * 0.2;

// WebBrowser.maybeCompleteAuthSession();

const SignInScreen = ({ navigation }) => {
  // useWarmUpBrowser();

  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

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

  // const onGoogleSignIn = async () => {
  //   try {
  //    const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow();
  //     if (createdSessionId) {
  //       console.log(signIn)
  //       console.log(signUp)
  //       setActive({ session: createdSessionId });
  //     } else {
  //       // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
  //       console.log(signIn);
  //       console.log(signUp);

  //       throw new Error(
  //         "There are unmet requirements, modifiy this else to handle them",
  //       );
  //     }
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //   }
  // };

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
            <Text style={{ color: "#fff", fontFamily: "inter-bold", fontSize: 15 }}>
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
            placeholder="Username"
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
          onPress={() => console.log("forgot password")}
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
        {/* <View style={styles.horizontalLineZone}>
          <View style={styles.horizontalLine1} />
          <Text
            style={{
              color: "#313047",
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: "700",
              marginTop: 45,
              marginHorizontal: "2%",
            }}
          >
            OR
          </Text>
          <View style={styles.horizontalLine2} />
        </View>
        <TouchableOpacity
          style={[
            styles.googleButton,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
            },
          ]}
          onPress={() => onGoogleSignIn()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/google.png")}
              style={{ width: 35, height: 35, marginRight: 18 }}
            />
            <Text style={{ color: "#767676", fontWeight: "700", fontSize: 20 }}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity> */}
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
