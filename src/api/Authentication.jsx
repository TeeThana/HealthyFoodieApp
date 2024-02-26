import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createTokenWithCode = async (code) => {
  const url =
    `https://github.com/login/oauth/access_token` +
    `?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}` +
    `&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}` +
    `&code=${code}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

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

export const checkState = async () => {
  return new Promise((resolve, reject) => {
    const onAuthStateChange = (user) => {
      if (user) {
        resolve({ status: true, user });
      } else {
        reject({ status: false, message: "User authentication failed." });
      }
    };

    const subscriber = onAuthStateChanged(auth, onAuthStateChange);

    return () => subscriber();
  });
};

export const signedOut = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("userToken");
    console.log("User signed out!");
    return true;
  } catch (e) {
    console.error("Error signing out:", e);
    return false;
  }
};
