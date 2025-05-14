import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCTdX1OB1Xv7U7_EPhUmPHEoQYd99DoCZQ",
  authDomain: "babycodebase.firebaseapp.com",
  projectId: "babycodebase",
  storageBucket: "babycodebase.firebasestorage.app",
  messagingSenderId: "688653456430",
  appId: "1:688653456430:web:88ec3620d085cfcf96bbbf",
  measurementId: "G-7P86ECY9Z8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
