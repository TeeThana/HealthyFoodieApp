// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

// Configuration: Build Credentials t2fzRZBSKZ (Default)
// Keystore
// Type                JKS
// Key Alias           5e358cfa97f08cb98806c89adde50b27
// MD5 Fingerprint     F4:95:93:62:92:71:2E:C2:D2:87:8A:F7:7C:82:7B:9B
// SHA1 Fingerprint    DC:7F:30:49:6B:8B:EB:D2:F8:6B:13:2B:16:5B:4E:A1:8C:A1:59:5F
// SHA256 Fingerprint  CB:0C:30:21:CD:E6:46:86:EC:51:79:DC:F5:59:C7:5D:46:88:0B:F6:FA:90:B9:0B:EF:1B:D2:F6:49:1D:A8:29
// Updated             32 minutes ago

//android client id: 267329452619-i340lm4g2jaiil45uqm0gffmj1knuc4d.apps.googleusercontent.com

export { app, auth, db };
