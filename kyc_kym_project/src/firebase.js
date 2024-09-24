// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAV1KDMpZ-j7Ul4kpLHKBCIJbpm2fyrGDs",
    authDomain: "kycapplication-763d9.firebaseapp.com",
    projectId: "kycapplication-763d9",
    storageBucket: "kycapplication-763d9.appspot.com",
    messagingSenderId: "871052896138",
    appId: "1:871052896138:web:0898dfb9a7e6dbe4d54a73",
    measurementId: "G-06L11G4M53"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };