import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFMteif5MGQEUQpTXbPme69k8yBZjnr0A",
    authDomain: "mamorun-loc-6f5ee.firebaseapp.com",
    projectId: "mamorun-loc-6f5ee",
    storageBucket: "mamorun-loc-6f5ee.appspot.com",
    messagingSenderId: "757624437764",
    appId: "1:757624437764:web:bd904ec75b933c94bc0951"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };