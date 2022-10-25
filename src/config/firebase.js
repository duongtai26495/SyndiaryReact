// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr0meD5vENmOnkSTHbpy8M1xRoHqL--ro",
  authDomain: "synote-kai.firebaseapp.com",
  databaseURL: "https://synote-kai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "synote-kai",
  storageBucket: "synote-kai.appspot.com",
  messagingSenderId: "8979494841",
  appId: "1:8979494841:web:f74027db86dc575566e868",
  measurementId: "G-1VVJPD9XMF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)



// Initialize Firebase
export {app, database}
