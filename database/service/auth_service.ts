import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  collection,
  where,
  doc,
  getDocs,
  setDoc,
  query,
} from "firebase/firestore";

const nicknameAndEmail = async (email: string, nickname: string) => {
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const docRefUser = doc(db, "users", user.uid);
    await setDoc(docRefUser, {
      email: user.email,
      id: user.uid,
      avatar:"https://firebasestorage.googleapis.com/v0/b/innox-ee22c.appspot.com/o/avatar%2Favatar_24.jpg?alt=media&token=1ce0f757-c4da-4534-9107-ffd0e7b56dab",
      nickname: nickname,
      status: 1,
      role: "user",
      language: "tr",
      education: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
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
const signout = () => {
  window.localStorage.removeItem("user");
  return signOut(auth);
};
export { nicknameAndEmail, createUser, login, signout };
