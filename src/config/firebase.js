// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPySx4KPxanY_cqvlz7rXqcF-dVqXK-cQ",
  authDomain: "nn-lms.firebaseapp.com",
  databaseURL: "https://nn-lms-default-rtdb.firebaseio.com",
  projectId: "nn-lms",
  storageBucket: "nn-lms.appspot.com",
  messagingSenderId: "57212172692",
  appId: "1:57212172692:web:3c6b188ccb9ba44823b781",
  measurementId: "G-1VTXY8RX2L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage };
