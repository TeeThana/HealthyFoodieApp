import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";

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

export const GoogleAuth = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithCredential(auth, provider);

    console.log("Successfully signed in with Google:", user.displayName);
  } catch (error) {
    console.error("Google Sign-In failed:", error.message);
  }
};

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
    console.log("User account signed in!");

    return { status: true, message: "success" };
  } catch (e) {
    return { status: false, message: e.code };
  }
};

export const signedOut = () => {
  signOut(auth);
  console.log("User signed out!");
};
