import React, { useState, useEffect } from "react";
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

//api
import {
  GoogleAuth,
  UserAuth,
  signedOut,
  checkState,
  createTokenWithCode,
} from "../api/Authentication";
import { auth } from "../../firebaseConfig";

//auth
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

const windowWidth = Dimensions.get("window").width;
const fontSize = windowWidth * 0.2;

const SignInScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "267329452619-7jmva6ulo836cfer9433ft61pn12k5b3.apps.googleusercontent.com",
    androidClientId:
      "267329452619-htevif1rujracgha7jr7qn3iip50bnn7.apps.googleusercontent.com",
    webClientId:
      "267329452619-r9mhl9gntj5kll9sjoea2djks161rojo.apps.googleusercontent.com",
  });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credentials = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credentials);
  //   }
  // }, [response]);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log(JSON.stringify(user, null, 2));
  //       setUserInfo(user);
  //     } else {
  //       console.log("else")
  //     }
  //   })

  //   return () => unsub();
  // }, []);

  useEffect(() => {
    handleGoogleSignIn();
    console.log("user: ", userInfo);
  }, [response]);

  const handleGoogleSignIn = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (err) {
      console.error("Google auth error: ", err);
    }
  };

  const handleGitHubResponse = async () => {
    if (response?.type == "success") {
      const { code } = response.params;
      const { token_type, scope, access_token } = await createTokenWithCode(
        code
      );
      console.log("GitHub response: ", { token_type, scope, access_token });

      if (!access_token) return;

      const credential = GithubAuthProvider.credential(access_token);
      const data = await signInWithCredential(auth, credential);
      console.log("data: ", data);
    }
  };

  const handleSignIn = async (user, pass) => {
    try {
      const check = await UserAuth(user, pass);
      console.log(check.message);
      if (check.status === false) {
        if (check.message === "auth/invalid-email") {
        } else if (check.message === "auth/missing-password") {
        } else if (check.message === "auth/invalid-credential") {
        }
      } else {
        console.log("User sign in successful");
      }
    } catch (err) {
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
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "700",
            }}
          >
            FORGOT PASSWORD?
          </Text>
        </TouchableOpacity>
        <Button
          style={styles.signInButton}
          onPress={() => handleSignIn(username, password)}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 20,
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
          onPress={() => promptAsync()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/images/google.png")}
              style={{ width: 35, height: 35, marginRight: 18 }}
            />
            <Text style={{ color: "#767676", fontWeight: "700", fontSize: 20 }}>
              Continue with Google
            </Text>
          </View>
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
    color: "rgba(31, 154, 122, 0.35)",
    opacity: 0.6,
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
    backgroundColor: "#F8F8F8",
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
