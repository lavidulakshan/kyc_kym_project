// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Make sure getAuth is imported

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY0_s_Jh4EuYfn4oWsXKxlDjJnt4XM8cY",
  authDomain: "open-kyckym-system.firebaseapp.com",
  projectId: "open-kyckym-system",
  storageBucket: "open-kyckym-system.appspot.com",
  messagingSenderId: "940447057656",
  appId: "1:940447057656:web:391fcf69e5936bb8679d0d",
  measurementId: "G-GBG9V70FY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Initialize Firebase Auth

// Export the services
export { db, storage, auth, app };
