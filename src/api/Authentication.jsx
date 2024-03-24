import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  getIdToken,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const CreateUser = (user, pass) => {
  try {
    let email = `${user}@gmail.com`;
    createUserWithEmailAndPassword(auth, email, pass);
    console.log("User account created & signed in!");
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      console.log("That email address is already in use!");
    } else if (e.code === "auth/invalid-email") {
      console.log("That email address is invalid!");
    } else {
      console.error("CreateUserError: " + e.message);
    }
  }
};

export const UserAuth = async (user, pass) => {
  try {
    let email = `${user}@gmail.com`;
    await signInWithEmailAndPassword(auth, email, pass);
    const currentUser = auth.currentUser;

    if (user) {
      const userToken = await currentUser.getIdToken();
      await AsyncStorage.setItem("userToken", userToken); 
      
      console.log("User account signed in!");

      return { status: true, message: "success" };
    } else {
      throw new Error("User not found");
    }

  } catch (e) {
    return { status: false, message: e.code };
  }
};


export const signedOut = async () => {
  try {
    await AsyncStorage.clear();
    await signOut(auth);
    console.log("User signed out!");
    return true; 
  } catch (e) {
    console.error("Error signing out:", e);
    return false; 
  }
};
