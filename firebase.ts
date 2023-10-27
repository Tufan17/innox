import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore,doc,getDoc,query, deleteDoc,collection,where, getDocs, updateDoc,setDoc, orderBy} from "firebase/firestore";
import { getStorage, ref ,deleteObject } from 'firebase/storage';

// Your web app's Firebase configuration
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
export const auth = getAuth(app);
const db = getFirestore(app);

