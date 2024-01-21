import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const InfoScreen = ({ navigation }) => {
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
  
  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={styles.container}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={25}
            color="#313047"
            solid
            style={{ marginTop: "12%", marginLeft: "5%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIconContainer}>
          <FontAwesome5 name="pen" size={22} color="#313047" />
        </TouchableOpacity>
        <View style={styles.frame}>
          <View style={styles.profileContainer}>
            <View style={styles.profile}></View>
          </View>
          <View style={styles.box}></View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    marginTop: "35%",
    backgroundColor: "#F3EDF5",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    height: 132,
    width: "100%",
    position: "absolute",
    top: -66,
    alignItems: "center",
  },
  profile: {
    flex: 0,
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    borderWidth: 3,
    borderColor: "#313047",
    backgroundColor: "#fff",
  },
  editIconContainer: {
    position: "absolute",
    marginTop: "12%",
    marginRight: "2.5%",
    right: 0,
  },
  box: {
    marginTop: 15,
    backgroundColor: "#fff",
    height: "75%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});


export default InfoScreen;
