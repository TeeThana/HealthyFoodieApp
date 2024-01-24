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

// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({
//   webClientId:
//     "943554588284-g5m1eb9j50miqph1ggjmi54acrqjm38g.apps.googleusercontent.com",
// });



// export const GoogleAuth = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = GoogleAuthProvider.credential(idToken);

//     // Sign in with the Google credential
//     await signInWithCredential(auth, googleCredential);

//     // Handle the sign-in success here if needed
//     console.log("Google Sign-In successful");
//   } catch (error) {
//     console.error("Google Sign-In failed:", error.message);
//     // Handle the sign-in error here if needed
//   }
// };

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
