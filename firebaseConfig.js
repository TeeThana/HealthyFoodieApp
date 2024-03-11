// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";


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

//Configuration: healthyfoodie (Default)
// Keystore
// Type                JKS
// Key Alias           2ab2d5ca26390177e5dff659f28efced
// MD5 Fingerprint     DD:22:1C:6D:F1:6C:E3:85:15:8A:A3:B3:B3:8E:97:0D
// SHA1 Fingerprint    C4:C9:44:9D:77:54:A4:BF:35:DE:0E:0E:8F:1D:F1:82:D1:15:20:2F
// SHA256 Fingerprint  2E:BA:B1:3F:DA:58:A9:64:92:64:92:C8:C0:10:AD:C5:AD:1E:1E:7A:67:64:46:BD:8C:7F:E2:24:4F:9B:F8:42
// Updated             4 seconds ago


//AIzaSyCWkeezDwH2NHGpNiQECyOABIyT9RgAnlg

export { app, auth, db };
