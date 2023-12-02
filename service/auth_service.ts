import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth,db } from "../firebase";
import {
  getFirestore,
  doc,
  query,
  collection,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";

const nicknameAndEmail = async (email: string, nickname: string) => {
  const db = getFirestore();
  const emailQuery = query(
    collection(db, "users"),
    where("email", "==", email)
  );
  const nicknameQuery = query(
    collection(db, "users"),
    where("nickname", "==", nickname)
  );

  const emailQuerySnapshot = await getDocs(emailQuery);
  const nicknameQuerySnapshot = await getDocs(nicknameQuery);

  return {
    email: emailQuerySnapshot.empty,
    nickname: nicknameQuerySnapshot.empty,
  };
};

const createUser = async (
  email: string,
  password: string,
  nickname: string
) => {
  try {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, {
          email: email,
          id: user.uid,
          nickname: nickname,
        });
        return {
          status: true,
          user: {
            email: email,
            id: user.uid,
            nickname: nickname,
          },
        };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
          status: false,
          errorCode: errorCode,
          error: errorMessage,
        };
      });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      error: error,
    };
  }
};

const login = async (email: string, password: string) => {
    try{
      const data=await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
      return {
        status: true,
      };
    }catch(error){
      return {
        status: false,
        error: error,
      };
    } 
};
export { nicknameAndEmail, createUser, login };
