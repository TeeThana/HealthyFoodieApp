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
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DatePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

//api
import {
  GoogleAuth,
  UserAuth,
  signedOut,
  checkState,
} from "../api/Authentication";

//Firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

//icons
import { FontAwesome } from "@expo/vector-icons";

const InfoScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    allergy: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const username = await AsyncStorage.getItem("username");
      setUserData((prevUserData) => ({
        ...prevUserData,
        username: username,
      }));
      console.log("User Data:", username, userData);
    };

    fetchUserData();
  }, []);

  useEffect(() => {}, [userData]);

  const handleInputChange = (inputName, text) => {
    setUserData((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: text,
    }));
  };

  const backHandler = () => {
    // signedOut();
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

  const handleGenerate = async (userData) => {
    console.log("Generate:", userData);
    try {
      await addDoc(collection(db, "UserInfo"), {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        gender: userData.gender,
        height: userData.height,
        weight: userData.weight,
        allergy: userData.allergy,
      });
      console.log("Added Info Successfully");
    } catch (err) {
      console.error("Generate Error!", err.message);
    }
  };

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: gender,
    }));
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(new Date(date));
    const currentYear = currentDate.getFullYear();
    const birthYear = selectedDate.getFullYear();
    const age = currentYear - birthYear;

    console.log("date:", selectedDate, "age: ", age);
    setUserData((prevUserData) => ({
      ...prevUserData,
      age: age.toString(),
    }));
  };

  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={styles.container}
    >
      <ScrollView>
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
          <View style={tw`bg-white rounded-xl mt-30 mx-5`}>
            <View style={tw`mx-5 mt-5`}>
              <Text style={tw`uppercase font-bold`}>firstname</Text>
              <TextInput
                style={tw`bg-transparent text-base mb-5 h-10`}
                onChangeText={(text) => handleInputChange("firstName", text)}
              ></TextInput>
              <Text style={tw`uppercase font-bold`}>lastname</Text>
              <TextInput
                style={tw`bg-transparent text-base mb-5 h-10`}
                onChangeText={(text) => handleInputChange("lastName", text)}
              ></TextInput>
              <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                  handleGenderSelect(itemValue)
                }
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
              <View style={tw`mt-2 mb-5`}>
                <Text>Select Date:</Text>
                <DatePicker
                  style={{ width: "full" }}
                  value={selectedDate}
                  mode="date"
                  placeholder={selectedDate}
                  format="YYYY-MM-DD"
                  minDate="2022-01-01"
                  maxDate="2025-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={handleDateChange}
                />
              </View>
              <View style={tw`flex-row`}>
                <View style={tw`pr-10`}>
                  <Text style={tw`uppercase font-bold `}>height</Text>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10`}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange("height", text)}
                  ></TextInput>
                </View>
                <View>
                  <Text style={tw`uppercase font-bold`}>weight</Text>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10`}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange("weight", text)}
                  ></TextInput>
                </View>
              </View>
              <View>
                <Text style={tw`uppercase font-bold`}>allergy</Text>
                <View style={tw`flex-row`}>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10 w-5/6`}
                    onChangeText={(text) => setAllergyInput(text)}
                    value={allergyInput}
                  ></TextInput>
                  <FontAwesome
                    style={tw`pl-5 `}
                    name="plus-square"
                    size={24}
                    color="#00D49D"
                    onPress={handleAddAllergy}
                  />
                </View>
              </View>
              <View>
                {userData.allergy.map((allergy, index) => (
                  <Text key={index}>{allergy}</Text>
                ))}
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#00D49D",
                    ...tw` justify-center items-center rounded-lg mx-5 h-10`,
                  }}
                  onPress={() => handleGenerate(userData)}
                >
                  <Text style={tw`uppercase text-white text-base font-bold`}>
                    generate
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
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
