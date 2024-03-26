import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

//Icons
import { FontAwesome } from "@expo/vector-icons";

//db
import { db } from "../../../firebaseConfig";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  listCollections,
  query,
} from "firebase/firestore";

const FriendsScreen = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleChangeText = (inputText) => {
    setText(inputText);
    searchUser(inputText);
  };

  const getUser = async () => {
    const username = await AsyncStorage.getItem("username");
    const docRef = collection(db, "UserInfo");
    const querySnapshot = await getDocs(docRef);
    const userData = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        userData.push(doc.id);
      }
    });
    setUser(userData);
  };

  const searchUser = (searchText) => {
    const filteredUsers = user.filter((userName) => {
      return userName.includes(searchText);
    });
    setSearchResult(filteredUsers);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={tw`flex-1 bg-[#00D49D]`}>
      <View style={tw`h-1/4`}>
        <View
          style={{ marginTop: "15%", ...tw`flex justify-center items-center` }}
        >
          <Text
            style={{
              fontFamily: "inter-bold",
              ...tw`text-[#313047] text-2xl`,
            }}
          >
            Friends
          </Text>
          <View
            style={tw`mt-10 flex-row items-center bg-[#313047] rounded-xl px-5 w-4/5`}
          >
            <FontAwesome
              name="search"
              size={20}
              color="white"
              style={tw`mr-5`}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChangeText}
              value={text}
              placeholderTextColor="white"
              backgroundColor="#313047"
              placeholder="Search your friend or #"
            />
          </View>
        </View>
      </View>
      <View style={{ ...tw`flex-1 h-full bg-[#F3EDF5]` }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 3,
    backgroundColor: "white",
    width: "100%",
  },
  greenContainer: {
    height: 200,
    backgroundColor: "#00D49D",
    alignItems: "center",
    width: "100%",
  },
  textHeader: {
    paddingTop: 30,
    color: "#313047",
    fontSize: 25,
    fontWeight: "bold",
  },
  textTitle: {
    color: "#313047",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSubTitle: {
    textAlign: "center",
    color: "#8F8F8F",
    fontSize: 16,
    fontWeight: "regular",
  },
  height: {
    height: 10,
  },
  height20: {
    height: 20,
  },
  circle: {
    width: 90,
    height: 90,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "#313047",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#313047",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
});

export default FriendsScreen;
