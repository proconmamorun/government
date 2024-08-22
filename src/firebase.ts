import {initializeApp} from "firebase/app";
import firebase from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";
import {firebaseConfig} from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = getFirestore(app);