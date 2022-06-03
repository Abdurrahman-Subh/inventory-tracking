// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG88KrM2Hxbr27AQXEu66zZFFQeOvyraY",
  authDomain: "the-net-ninja-7a756.firebaseapp.com",
  projectId: "the-net-ninja-7a756",
  storageBucket: "the-net-ninja-7a756.appspot.com",
  messagingSenderId: "1030692512444",
  appId: "1:1030692512444:web:455f668c778736410226b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
