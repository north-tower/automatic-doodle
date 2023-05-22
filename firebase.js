// import firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyBw-f1qIf4zJA93NF0M9S7SbMODPMte5hk",
//     authDomain: "curly-couscous-3ebee.firebaseapp.com",
//     projectId: "curly-couscous-3ebee",
//     storageBucket: "curly-couscous-3ebee.appspot.com",
//     messagingSenderId: "807691893449",
//     appId: "1:807691893449:web:e307bc0cb5e0f6494eab18"
//   };

//   const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

//   const db = app.firestore();

//   export default db;

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBw-f1qIf4zJA93NF0M9S7SbMODPMte5hk',
  authDomain: 'curly-couscous-3ebee.firebaseapp.com',
  projectId: 'curly-couscous-3ebee',
  storageBucket: 'curly-couscous-3ebee.appspot.com',
  messagingSenderId: '807691893449',
  appId: '1:807691893449:web:e307bc0cb5e0f6494eab18',
};

// const app = firebase.initializeApp(firebaseConfig);
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


const db = app.firestore();

export default db;
