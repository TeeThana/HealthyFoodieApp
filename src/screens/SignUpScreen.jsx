import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  TextInput,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

//Icon
import { FontAwesome5 } from "@expo/vector-icons";

//api
import { CreateUser } from "../api/Authentication";

const windowWidth = Dimensions.get("window").width;
const fontSize = windowWidth * 0.2;

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleSignUp = async (user, pass) => {
    try {
      if (pass === password && pass === confirmPass) {
        const check = await CreateUser(user, pass);
        console.log(check);
        if (check.status === false) {
          if (check.message) {
            setError(check.message);
          }
        } else {
          console.log("User sign in successful");
          setError(null);
          setTimeout(() => {
            navigation.navigate("SignIn");
          }, 3000);
        }
      } else if (pass != confirmPass) {
        alert("Passwords do not match");
      }
    } catch (e) {
      console.error("SignUp failed: ", e.message);
    }
  };

  return (
    <LinearGradient
      colors={["#FEDF03", "#FFEC66", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={styles.container}
    >
      <Text style={styles.healthText}>HEALTHY HEALTHY HEALTHY</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5
          name="arrow-left"
          size={25}
          color="#777"
          solid
          style={{ marginTop: "17%", marginLeft: "7%" }}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.signInText}>Sign Up</Text>
      </View>
      <View style={styles.form}>
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
            marginTop: "4%",
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "12%",
            marginRight: "20%",
            borderWidth: 0,
            marginTop: "4%",
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
            placeholder="Confirm Password"
            placeholderTextColor="rgba(49, 48, 71, 0.70)"
            underlineColor="transparent"
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)}
            secureTextEntry
          />
        </View>
        {error && (
          <View style={tw`flex items-end w-full`}>
            <Text
              style={{
                fontFamily: "inter-medium",
                marginRight: "15%",
                ...tw`text-red-500 text-sm mt-5 `,
              }}
            >
              {error}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => handleSignUp(username, password)}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "inter-bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
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
    color: "#F0CA5E",
    opacity: 0.6,
    fontSize: fontSize,
    fontFamily: "inter-bold",
    textAlign: "center",
  },
  header: {
    marginTop: "7.5%",
    marginBottom: "18.5%",
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
  signUpButton: {
    justifyContent: "center",
    backgroundColor: "#313047",
    borderRadius: 20,
    color: "#ffff",
    marginHorizontal: "12%",
    marginTop: "11%",
    // paddingVertical: "5%",
    height: 52,
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

export default SignUpScreen;
