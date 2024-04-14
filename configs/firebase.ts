// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbkT0LUtYMulD0YTirV85BYFdRGWEnyBU",
  authDomain: "fieldwork-95455.firebaseapp.com",
  projectId: "fieldwork-95455",
  storageBucket: "fieldwork-95455.appspot.com",
  messagingSenderId: "228040489113",
  appId: "1:228040489113:web:8b33be7e43c4caaa65a008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const authentication = getAuth(app)

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')

export const contactsCollectionRef = collection(db, 'contacts')
