import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  ScrollView,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Firestore
import {
  doc,
  setDoc,
  addDoc,
  collection,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

//icons
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

//Component
import Loading from "../components/Loading";

const FirstInfoScreen = ({ onSuccess }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    height: "",
    weight: "",
    allergy: [],
    dateOfBirth: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  });


  const [userName, setUserName] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = await AsyncStorage.getItem("username");
      setUserName(username);
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

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

  const handleDeleteAllergy = (index) => {
    const updatedUserData = { ...userData };
    updatedUserData.allergy.splice(index, 1);
    setUserData(updatedUserData);
  };

  const handleGenerate = async (userData) => {
    console.log("Username:", userName);
    console.log("Generate:", userData);
    try {
      await setDoc(doc(db, "UserInfo", userName), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        height: userData.height,
        weight: userData.weight,
        allergy: userData.allergy,
      });
      console.log("Added Info Successfully");
      onSuccess(true);
    } catch (err) {
      console.error("Generate Error!", err.message);
    }
  };

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: gender,
    }));
  };

  const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState();
  const [showDate, setShowDate] = useState(false);
  const [dateText, setDateText] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );

  const ChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setUserData((prevUserData) => ({
      ...prevUserData,
      dateOfBirth: fDate,
    }));
    setDateText(fDate);
    console.log(fDate);
    console.log(userData);
  };

  const showMode = () => {
    setShowDate(true);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LinearGradient
          colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.3, 1]}
          style={tw`flex-1`}
        >
          <View style={tw`h-full`}>
            <ScrollView
              contentContainerStyle={{
                marginTop: "22%",
                backgroundColor: "#F3EDF5",
                height: "100%",
                marginBottom: "15%",
              }}
            >
              {/* <View style={styles.profileContainer}>
            <View style={styles.profile}></View>
          </View> */}
              <View style={tw`bg-white rounded-xl mt-5 mx-5 py-5`}>
                <View style={tw`mx-5 mt-5`}>
                  <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                    firstname
                  </Text>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                    onChangeText={(text) =>
                      handleInputChange("firstName", text)
                    }
                  ></TextInput>
                  <Text style={{ fontFamily: "inter-bold", ...tw`uppercase` }}>
                    lastname
                  </Text>
                  <TextInput
                    style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                    onChangeText={(text) => handleInputChange("lastName", text)}
                  ></TextInput>
                  <View style={tw`mt-2 mb-5`}>
                    <Text
                      style={{
                        fontFamily: "inter-bold",
                        ...tw`uppercase mb-3`,
                      }}
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
                      style={{
                        fontFamily: "inter-bold",
                        ...tw`uppercase mb-3`,
                      }}
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
                        format="YYYY-MM-DD"
                        onChange={ChangeDate}
                      />
                    )}
                  </View>
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`pr-10`}>
                      <Text
                        style={{ fontFamily: "inter-bold", ...tw`uppercase` }}
                      >
                        height
                      </Text>
                      <TextInput
                        style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleInputChange("height", text)
                        }
                      />
                    </View>
                    <Text style={tw`text-4xl mr-9`}>/</Text>
                    <View>
                      <Text
                        style={{ fontFamily: "inter-bold", ...tw`uppercase` }}
                      >
                        weight
                      </Text>
                      <TextInput
                        style={tw`bg-transparent text-base mb-5 h-10 border-b-2 border-gray-200`}
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleInputChange("weight", text)
                        }
                      />
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{ fontFamily: "inter-bold", ...tw`uppercase` }}
                    >
                      allergy
                    </Text>
                    <View style={tw`flex-row`}>
                      <TextInput
                        style={tw`bg-transparent text-base h-10 w-5/6 border-b-2 border-gray-200`}
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
                  <View style={tw`m-5`}>
                    {userData.allergy && userData.allergy.length > 0 ? (
                      userData.allergy.map((allergy, index) => (
                        <View
                          key={index}
                          style={tw`flex-row items-center mb-2 w-15 justify-between`}
                        >
                          <Text
                            style={{ fontFamily: "inter-bold" }}
                            key={index}
                          >
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
                      <Text style={{ fontFamily: "inter-bold" }}>
                        No allergy
                      </Text>
                    )}
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#00D49D",
                        ...tw` justify-center items-center rounded-lg mx-5 h-10`,
                      }}
                      onPress={() => handleGenerate(userData)}
                    >
                      <Text
                        style={{
                          fontFamily: "inter-bold",
                          ...tw`uppercase text-white text-base font-bold`,
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      )}
    </>
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

export default FirstInfoScreen;
