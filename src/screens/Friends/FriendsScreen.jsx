import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  FlatList 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

  const renderItem = ({ item }) => (
    <Text style={tw`text-white`}>{item}</Text>
  );

  return (
    <LinearGradient
      colors={["#00D49D", "#6AFFD8", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.6, 1, 1]}
      style={tw`flex-1`}
    >
      <View style={tw`items-center mt-15 mb-5`}>
        <Text style={{ fontFamily: "inter-bold", ...tw`text-2xl ` }}>
          Friends
        </Text>
      </View>
      <TextInput 
      onChange={(text) => handleChangeText(text)} 
      style={tw`bg-gray-900 mx-10 rounded-md h-10 px-5 text-white`} 
      placeholder="Search your friends" 
      placeholderTextColor="white"/>
      <FlatList
        data={searchResult}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        style={tw`flex-1`}
      />
      <View style={tw`bg-white bottom-0 h-full mt-10`}>
        <View>
          <Text style={tw`font-bold m-5`}>
            Request friends
          </Text>
        </View>
        <View>
          <Text style={tw`font-bold m-5`}>
            Your Friends
          </Text>
        </View>
      </View>
    </LinearGradient>
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
