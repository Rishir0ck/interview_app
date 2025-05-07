import { getApp, getApps, initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCJUlzY5pAcBEjK_9sMH61ZwJXnPLllpBk",
//   authDomain: "aceready.firebaseapp.com",
//   projectId: "aceready",
//   storageBucket: "aceready.firebasestorage.app",
//   messagingSenderId: "805312363119",
//   appId: "1:805312363119:web:e47c24da2343211e0bab9a",
//   measurementId: "G-1N9949PJD2"
// };

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const app =  initializeApp(firebaseConfig); 

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {auth,db,provider};