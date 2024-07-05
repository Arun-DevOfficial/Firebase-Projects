// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc33QrCQAfASSVxSBvA3lZ1Qx8Fd24vCw",
  authDomain: "otp-auth-a50f7.firebaseapp.com",
  projectId: "otp-auth-a50f7",
  storageBucket: "otp-auth-a50f7.appspot.com",
  messagingSenderId: "270935485118",
  appId: "1:270935485118:web:cd62934d399ac327e98cef",
  measurementId: "G-SVDFE2EHFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)