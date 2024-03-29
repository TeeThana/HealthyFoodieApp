import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CreateUser = async (user, pass) => {
  try {
    await createUserWithEmailAndPassword(auth, user, pass);
    console.log("User account created & signed in!");
    return { status: true, message: "success" };
  } catch (e) {
    return { status: false, message: e.code };
  }
};

export const UserAuth = async (user, pass) => {
  try {
    await signInWithEmailAndPassword(auth, user, pass);

    if (user) {
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

export const ForgetPass = async (user) => {
  try {
    const res = await sendPasswordResetEmail(auth, user);
    console.log("reset password email sent!");
    return { status: true, message: res };
  } catch (err) {
    return { status: false, message: err };
  }
};
