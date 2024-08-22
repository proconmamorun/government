import {initializeApp,getApps,getApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdj3i65Jp-AyeCwFUj6n0GmjW_M9Pcr38",
    authDomain: "[mamorun-loc-6f5ee.firebaseapp.com](http://mamorun-loc-6f5ee.firebaseapp.com/)",
    projectId: "mamorun-loc-6f5ee",
    storageBucket: "[mamorun-loc-6f5ee.appspot.com](http://mamorun-loc-6f5ee.appspot.com/)",
    messagingSenderId: "757624437764",
    appId: "1:757624437764:web:bd904ec75b933c94bc0951",
    measurementId: "G-G0FPYG5JV4"
    };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db, firebaseConfig };