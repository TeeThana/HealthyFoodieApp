import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  getIdToken,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CreateUser = (user, pass) => {
  try {
    createUserWithEmailAndPassword(auth, user, pass);
    console.log("User account created & signed in!");
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      console.log("That email address is already in use!");
      return { status: false, message: e.code };
    } else if (e.code === "auth/invalid-email") {
      console.log("That email address is invalid!");
    } else {
      console.error("CreateUserError: " + e.message);
    }
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
