// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCogqLtbhf9YaPOEl1xy5yfV4SRcvpaBq8",
  authDomain: "netflix-2-0-8dae9.firebaseapp.com",
  projectId: "netflix-2-0-8dae9",
  storageBucket: "netflix-2-0-8dae9.appspot.com",
  messagingSenderId: "374341612266",
  appId: "1:374341612266:web:494f87e04375d03ae9dd93",
  measurementId: "G-MKXLY53K4N"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore();

export default db;