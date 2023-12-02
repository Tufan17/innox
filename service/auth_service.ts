import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore,doc,getDoc,query, deleteDoc,collection,where, getDocs, updateDoc,setDoc, orderBy} from "firebase/firestore";

const createUser= async (email: string, password: string,nickname:string) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      //user tablosuna ekleme yapılacak
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, {
          email: email,
          password: password,
          id: user.uid
        });      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });}
const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
}



export {createUser,login};



