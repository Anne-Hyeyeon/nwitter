import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCOI-2xTpcGwhsAJInx6DORfT6Tk4xSsi8",
  authDomain: "nwitter-daf9a.firebaseapp.com",
  projectId: "nwitter-daf9a",
  storageBucket: "nwitter-daf9a.appspot.com",
  messagingSenderId: "284008921559",
  appId: "1:284008921559:web:3828d90f050a4c8b68b392",
  measurementId: "G-3PGXZE9EKG"
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();