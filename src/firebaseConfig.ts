import {initializeApp,getApps,getApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db, firebaseConfig };