import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  getFirestore,
  collection,
  where,
  doc,
  getDocs,
  setDoc,
  query,
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

const createUser = async (email: string, password: string, nickname: string) => {
  try {
    const docRef = doc(db, "demo", "1");
    await setDoc(docRef, {
      email: email,
      id: 1,
      nickname: nickname,
    });
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await  create(userCredential,nickname);
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};


const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};
const create = async (userCredential: any,nickname:string) => {
  const user = userCredential.user;
  const docRefUser = doc(db, "users", user.uid);
  await setDoc(docRefUser, {
    email: user.email,
    id: user.uid,
    profile:"https://firebasestorage.googleapis.com/v0/b/innox-ee22c.appspot.com/o/avatar%2Favatar_24.jpg?alt=media&token=1ce0f757-c4da-4534-9107-ffd0e7b56dab",
    nickname: nickname,
    status: 1,
    education: null,
  });
}
const signout = () => {
  return signOut(auth);
};
export { nicknameAndEmail, createUser, login, signout };
