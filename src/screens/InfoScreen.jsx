import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  ScrollView,
  Pressable,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";

//api
import {
  GoogleAuth,
  UserAuth,
  signedOut,
  checkState,
} from "../api/Authentication";

//icons
import { FontAwesome } from '@expo/vector-icons';

const InfoScreen = ({ navigation }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDay: new Date(),
    height: "",
    weight: "",
    allergy: [],
  })

  const handleChange = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: key === "birthDay" ? new Date(value) : value,
    }));
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onDatePickerChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || userData.birthDay;
      setUserData((prevData) => ({
        ...prevData,
        birthDay: currentDate,
      }));
    } else {
      toggleDatePicker();
    }
  };

  const confirmDateofBirth = () => {
    setUserData((prevData) => ({
      ...prevData,
      birthDay: userData.birthDay,
    }));
    toggleDatePicker();
  }

  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  const handleInputChange = (inputName, text) => {
    setUserData((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: text,
    }));
  };

  const backHandler = () => {
    signedOut();
  };

  const [allergyInput, setAllergyInput] = useState("");

  const handleAddAllergy = () => {
    if (allergyInput !== "") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        allergy: [...prevUserData.allergy, allergyInput],
      }));
      setAllergyInput("");
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
      <View>
        <TouchableOpacity onPress={() => backHandler()}>
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
        <ScrollView
          contentContainerStyle={{
            marginTop: "35%",
            backgroundColor: "#F3EDF5",
            height: "90%",
          }}
        >
          {/* <View style={styles.profileContainer}>
            <View style={styles.profile}></View>
          </View> */}
          <View style={tw`bg-white rounded-xl mt-30 mx-5 h-3/5`}>
            <View style={tw`mx-5 mt-5`}>
              <Text style={tw`uppercase font-bold`}>firstname</Text>
              <TextInput style={tw`bg-transparent text-base mb-5 h-10`} onChangeText={(text) => handleInputChange('firstName', text)}></TextInput>
              <Text style={tw`uppercase font-bold`}>lastname</Text>
              <TextInput style={tw`bg-transparent text-base mb-5 h-10`} onChangeText={(text) => handleInputChange('lastName', text)}></TextInput>
              <View style={tw`flex-row`}>
                <View style={tw`pr-10`}>
                  <Text style={tw`uppercase font-bold `} >height</Text>
                  <TextInput style={tw`bg-transparent text-base mb-5 h-10`} onChangeText={(text) => handleInputChange('height', text)}></TextInput>
                </View>
                <View>
                  <Text style={tw`uppercase font-bold`}>weight</Text>
                  <TextInput style={tw`bg-transparent text-base mb-5 h-10`} onChangeText={(text) => handleInputChange('weight', text)}></TextInput>
                </View>
              </View>
              <View>
                <Text style={tw`uppercase font-bold`}>allergy</Text>
                <View style={tw`flex-row`}>
                  <TextInput style={tw`bg-transparent text-base mb-5 h-10 w-5/6`} onChangeText={(text) => setAllergyInput(text)} value={allergyInput}></TextInput>
                  <FontAwesome style={tw`pl-5 `} name="plus-square" size={24} color="#00D49D" onPress={handleAddAllergy}/>
                </View>
              </View>
              <View>
                {userData.allergy.map((allergy, index) => (
                  <Text key={index}>{allergy}</Text>
                ))}
              </View>
            </View>

          </View>

        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 25,
  },
  name: {
    paddingHorizontal: "10%",
    paddingTop: "10%",
  },
  input: {
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    height: 40,
    width: "100%",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 3,
    // marginHorizontal: "12%",
    // marginTop: "5%",
    backgroundColor: "#fff",
  },
  date: {
    paddingHorizontal: "10%",
    left: 0,
  },
  cancelButton: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  confirmButton: {
    color: "blue",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  heightWeight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "15%",
  },
});


export default InfoScreen;


// <View style={styles.date}>
// <Text
//   style={{
//     fontSize: 15,
//     fontStyle: "normal",
//     fontWeight: "700",
//     color: "rgba(49, 48, 71, 0.70)",
//     marginTop: "5%",
//   }}
// >
//   DATE OF BIRTH
// </Text>
// {showPicker ? (
//   <View>
//     <DateTimePicker
//       style={{ height: "55%" }}
//       mode="date"
//       display="spinner"
//       onChange={onDatePickerChange}
//       value={userData.birthDay}
//     />
//     {Platform.OS === "ios" && (
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingHorizontal: "15%",
//         }}
//       >
//         <TouchableOpacity
//           style={{ marginTop: 10, alignItems: "center" }}
//           onPress={toggleDatePicker}
//         >
//           <Text style={styles.cancelButton}>Cancel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{ marginTop: 10, alignItems: "center" }}
//           onPress={confirmDateofBirth}
//         >
//           <Text style={styles.confirmButton}>Confirm</Text>
//         </TouchableOpacity>
//       </View>
//     )}
//   </View>
// ) : (
//   <Pressable onPress={toggleDatePicker}>
//     <TextInput
//       style={styles.input}
//       underlineColor="transparent"
//       defaultValue={userData.birthDay.toLocaleDateString()}
//       placeholder="DD/MM/YY"
//       placeholderTextColor={"#313047"}
//       onChangeText={(date) => handleChange("birthDay", date)}
//       editable={false}
//       onPressIn={toggleDatePicker}
//     />
//   </Pressable>
// )}
// </View>