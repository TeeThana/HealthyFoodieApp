import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const SignInScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleSignIn = () => {
    // Handle sign in logic here
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
          <Button style={styles.signUpButton}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Sign Up</Text>
          </Button>
        </View>
      </View>
      <View style={styles.form}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#ffff",
  },
  container: {
    flex: 1,
  },
  healthText: {
    marginTop: 55,
    position: "absolute",
    color: "rgba(31, 154, 122, 0.35)",
    opacity: 0.6,
    fontFamily: "Inter-Black",
    fontSize: 90,
    fontStyle: "normal",
    fontWeight: "700",
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
    fontFamily: "Inter-Black",
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
    fontFamily: "Inter-Black",
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
});

export default SignInScreen;
