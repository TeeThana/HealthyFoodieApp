import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//db
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";



const windowWidth = Dimensions.get("window").width;
const fontSize = windowWidth * 0.2;

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = async (user, pass) => {
    try {
      console.log(user,pass)
      const res = await getDocs(
        query(collection(db, "testUser"), where("username", "==", user), where("password", "==", pass))
      );
      res.forEach(doc => {
        const data = doc.data();
        console.log("Username:", data.username, "Password:", data.password);
      });

      if (res.empty) {
        alert("No user found with the provided username and password");
      } else {
        console.log("User sign in successful");
        navigation.replace("Home");
      }

    } catch(err) {
      console.error("SignIn failed", err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={styles.container}
    >
      <Text style={styles.healthText}>HEALTHY HEALTHY HEALTHY</Text>
      <View style={styles.header}>
        <Text style={styles.signInText}>Sign In</Text>
        <View style={styles.subHeader}>
          <Text style={styles.haveAccText}>Don't have an account?</Text>
          <Button
            style={styles.signUpButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Sign Up</Text>
          </Button>
        </View>
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
              fontFamily: "inter-black",
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "700",
            }}
          >
            FORGOT PASSWORD?
          </Text>
        </TouchableOpacity>
        <Button style={styles.signInButton} onPress={() => handleSignIn(username, password)}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 20,
              fontFamily: "inter-black",
            }}
          >
            Sign In
          </Text>
        </Button>
        <View style={styles.horizontalLineZone}>
          <View style={styles.horizontalLine1} />
          <Text
            style={{
              color: "#313047",
              fontFamily: "inter-black",
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
        <Button
          style={styles.googleButton}
          onPress={() => console.log("google")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
            }}
          >
            <Image
              source={require("../assets/images/google.png")}
              style={{ width: 35, height: 35, marginRight: 18 }}
            />
            <Text
              style={{
                color: "#767676",
                fontWeight: "700",
                fontSize: 20,
                fontFamily: "inter-black",
              }}
            >
              Continue with Google
            </Text>
          </View>
        </Button>
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
    fontFamily: "inter-black",
    fontSize: fontSize,
    fontStyle: "normal",
    fontWeight: "800",
    textAlign: "center",
  },
  header: {
    marginTop: "30%",
    marginBottom: "1%",
    marginLeft: "9%",
    marginRight: "9%",
  },
  signInText: {
    color: "#313047",
    fontFamily: "inter-black",
    fontSize: 64,
    fontStyle: "normal",
    fontWeight: "800",
  },
  subHeader: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  haveAccText: {
    color: "rgba(49, 48, 71, 0.70)",
    fontFamily: "inter-black",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
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
    fontFamily: "inter-black",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    height: 40,
    width: "100%",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 3,
    // marginHorizontal: "12%",
    // marginTop: "15%",
    backgroundColor: "#fff",
  },
  passInput: {
    fontFamily: "inter-black",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
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
    marginTop: "15%",
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

export default SignInScreen;
