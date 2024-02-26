// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAjInhGvgpls0X5NRYOxso70id8nJNV0ik",
  authDomain: "healthygen-f5e1b.firebaseapp.com",
  projectId: "healthygen-f5e1b",
  storageBucket: "healthygen-f5e1b.appspot.com",
  messagingSenderId: "943554588284",
  appId: "1:943554588284:web:6ae812974271f812a5e3f9",
  measurementId: "G-RVBRDMRJBF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

// ios: 267329452619-7jmva6ulo836cfer9433ft61pn12k5b3.apps.googleusercontent.com
// android: 267329452619-htevif1rujracgha7jr7qn3iip50bnn7.apps.googleusercontent.com
// web: 267329452619-r9mhl9gntj5kll9sjoea2djks161rojo.apps.googleusercontent.com

export { app, auth, db };
