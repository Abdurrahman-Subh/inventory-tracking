// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR64oH4M9Bz65QD0KgLMzHGWfNB8cIhIo",
  authDomain: "stok-takip-67633.firebaseapp.com",
  projectId: "stok-takip-67633",
  storageBucket: "stok-takip-67633.appspot.com",
  messagingSenderId: "359445957143",
  appId: "1:359445957143:web:e7235c692f7db5417f6a52",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
