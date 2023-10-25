// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA82Ri5eM9h21bRDGmIuPXr6o2UKOvTgyc",
  authDomain: "innox-ee22c.firebaseapp.com",
  projectId: "innox-ee22c",
  storageBucket: "innox-ee22c.appspot.com",
  messagingSenderId: "222231716806",
  appId: "1:222231716806:web:1090704130c235a18788c7",
  measurementId: "G-TP53RG0K14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);