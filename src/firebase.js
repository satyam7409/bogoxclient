// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationjs
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6YrT4NeTIRyI2z9sHkRpe53DGrd3FKtg",
  authDomain: "bogoxlens.firebaseapp.com",
  projectId: "bogoxlens",
  storageBucket: "bogoxlens.firebasestorage.app",
  messagingSenderId: "615570878992",
  appId: "1:615570878992:web:90ebd67ba4f9a253671095",
  measurementId: "G-V972PXCWNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
