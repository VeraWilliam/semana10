// Import the functions you need from the SDKs you need

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA796h4O-0OiMRNRbHi21zj7Mnk5wN3laY",
  authDomain: "pry-portafolio-d62ad.firebaseapp.com",
  projectId: "pry-portafolio-d62ad",
  storageBucket: "pry-portafolio-d62ad.appspot.com",
  messagingSenderId: "494472731966",
  appId: "1:494472731966:web:8f15ee6b18d23e4906e06f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export {
  db,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
};