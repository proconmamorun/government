// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiZvgKMPCWbx6ut3RFSVf_K-FM7H49iig",
  authDomain: "risk-level-e2a33.firebaseapp.com",
  projectId: "risk-level-e2a33",
  storageBucket: "risk-level-e2a33.appspot.com",
  messagingSenderId: "104452915833",
  appId: "1:104452915833:web:78463f72842e1386f78aa8",
  measurementId: "G-9TVR62QTY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);