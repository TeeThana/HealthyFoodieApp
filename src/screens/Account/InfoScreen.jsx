import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

//Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

//icons
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const InfoScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    height: "",
    weight: "",
    allergy: [],
    dateOfBirth: "",
    fullDate: "",
  });
  console.log(userData);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = await AsyncStorage.getItem("username");
      setUserName(username);
      try {
        const documentRef = doc(db, "UserInfo", username);
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          // console.log(documentSnapshot.data());
          const data = documentSnapshot.data();
          setUserData((prevData) => ({
            ...prevData,
            ...data,
          }));
          setSelectedGender(data.gender)
          setDate(new Date(data.fullDate));
          setDateText(data.dateOfBirth);
        } else {
          console.log("Document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {}, [userData]);

  const handleInputChange = (inputName, text) => {
    if (text !== userData.inputName) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
    setUserData((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: text,
    }));
  };

  const [allergyInput, setAllergyInput] = useState("");

  const handleAddAllergy = () => {
    if (allergyInput !== "") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        allergy: [...prevUserData.allergy, allergyInput],
      }));
      setAllergyInput("");
      setHasChanges(true);
    }
  };

  const handleDeleteAllergy = (index) => {
    const updatedUserData = { ...userData };
    updatedUserData.allergy.splice(index, 1);
    setUserData(updatedUserData);
  };

  const handleGenerate = async (userData) => {
    // console.log("Username:", userName);
    // console.log("Generate:", userData);
    setLoading(true);
    try {
      await setDoc(doc(db, "UserInfo", userName), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth,
        fullDate: userData.fullDate,
        gender: userData.gender,
        height: userData.height,
        weight: userData.weight,
        allergy: userData.allergy,
      });
      navigation.goBack();
      console.log("Added Info Successfully");
    } catch (err) {
      console.error("Generate Error!", err.message);
    } finally {
      setLoading(false);
      setHasChanges(false);
    }
  };

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    if (gender !== userData.gender) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
    setSelectedGender(gender);
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: gender,
    }));
  };

  const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState();
  const [showDate, setShowDate] = useState(false);
  const [dateText, setDateText] = useState("DD/MM/YYYY");

  const ChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    // console.log("Current", currentDate);
    let tempDate = new Date(currentDate);
    let fDate = moment(tempDate).format("DD/MM/YYYY");
    // console.log("fDate", fDate);
    setUserData((prevUserData) => ({
      ...prevUserData,
      fullDate: tempDate.toString(),
      dateOfBirth: fDate,
    }));
    setDateText(fDate);
    if (fDate !== userData.dateOfBirth) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
    // console.log("Selected", selectedDate);
    
    // console.log(fDate);
    // console.log(userData);
  };

  const showMode = () => {
    setShowDate(true);
  };

  // console.log("Log", userData);

  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 1]}
      style={tw`flex-1`}
    >
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="#313047"
            solid
            style={{ marginTop: "12%", marginLeft: "5%" }}
          />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            marginTop: "10%",
            backgroundColor: "#F3EDF5",
            height: "100%",
            marginBottom: "15%",
          }}
        >
          <View style={tw`bg-white rounded-xl mt-5 mx-5 py-5`}>
            <View style={tw`mx-5 mt-5`}>
              <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                firstname
              </Text>
              <TextInput
                style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                onChangeText={(text) => handleInputChange("firstName", text)}
                value={userData.firstName}
              ></TextInput>
              <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                lastname
              </Text>
              <TextInput
                style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                onChangeText={(text) => handleInputChange("lastName", text)}
                value={userData.lastName}
              ></TextInput>
              <View style={tw`mt-2 mb-5`}>
                <Text
                  style={{ fontFamily: "inter-bold", ...tw`uppercase mb-3` }}
                >
                  gender
                </Text>
                <View
                  style={{
                    backgroundColor: "#F3EDF5",
                    ...tw` rounded-lg h-10 justify-center w-1/2`,
                  }}
                >
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
                </View>
              </View>
              <View style={tw`mt-2 mb-5`}>
                <Text
                  style={{ fontFamily: "inter-bold", ...tw`uppercase mb-3` }}
                >
                  date of birth
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F3EDF5",
                    ...tw` rounded-lg h-10 w-1/2 items-center justify-center`,
                  }}
                  onPress={showMode}
                >
                  <Text style={tw`text-black text-base`}>{dateText}</Text>
                </TouchableOpacity>
                {showDate && (
                  <DatePicker
                    value={date}
                    mode="date"
                    format="DD/MM/YYYY"
                    onChange={ChangeDate}
                  />
                )}
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`pr-10`}>
                  <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                    height
                  </Text>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange("height", text)}
                    value={userData.height}
                  />
                </View>
                <Text style={tw`text-4xl mr-9`}>/</Text>
                <View>
                  <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                    weight
                  </Text>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange("weight", text)}
                    value={userData.weight}
                  />
                </View>
              </View>
              <View>
                <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                  allergy
                </Text>
                <View style={tw`flex-row`}>
                  <TextInput
                    style={tw`bg-transparent text-base h-10 w-5/6 border-b-2 border-gray-200`}
                    onChangeText={(text) => setAllergyInput(text)}
                    value={allergyInput || userData.allergy}
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
              <View style={tw`m-5`}>
                {userData.allergy && userData.allergy.length > 0 ? (
                  userData.allergy.map((allergy, index) => (
                    <View
                      key={index}
                      style={tw`flex-row items-center mb-2 w-15 justify-between`}
                    >
                      <Text style={{ fontFamily: "inter-bold" }} key={index}>
                        - {allergy}
                      </Text>
                      <View style={tw``}>
                        <TouchableOpacity
                          style={tw`flex-col`}
                          onPress={() => handleDeleteAllergy(index)}
                        >
                          <Text
                            style={{
                              fontFamily: "inter-bold",
                              ...tw`text-white bg-red-500 px-2 rounded-md`,
                            }}
                          >
                            -
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={{ fontFamily: "inter-bold" }}>No allergy</Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: hasChanges ? "#00D49D" : "#E3E3E3",
                    ...tw` justify-center items-center rounded-lg mx-5 h-10`,
                  }}
                  onPress={() => handleGenerate(userData)}
                  disabled={loading || !hasChanges}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: "inter-bold",
                        ...tw`uppercase text-white text-base font-bold`,
                      }}
                    >
                      submit
                    </Text>
                  )}
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
