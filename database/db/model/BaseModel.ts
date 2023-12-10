import {
  collection,
  where,
  doc,
  getDocs,
  setDoc,
  addDoc,
  DocumentReference,
  DocumentData,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {  db } from "../../../firebase";

class BaseModel {
  moduleName: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  async create(data:any): Promise<boolean> {
    try {
      await addDoc(collection(db, this.moduleName), data);
      return true;
    } catch (error) {
      console.error("Error creating document:", error);
      return false;
    }
  }

  async update(id: string, data:any): Promise<boolean> {
    try {
      const docRef = doc(db, this.moduleName, id);
      await updateDoc(docRef, data);
      await updateDoc(docRef, { updated_at: new Date() });
      return true;
    } catch (error) {
      console.error("Error updating document:", error);
      return false;
    }
  }
  

  async delete(id: string): Promise<boolean> {
    try {
      await setDoc(doc(db, this.moduleName, id), { created_at: new Date() });
      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  }

  async getById(id: string): Promise<any> {
    try {
      const docRef: DocumentReference<DocumentData> = doc(
        db,
        this.moduleName,
        id
      );
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("No such document!");
        return null;
      }

      const data = docSnap.data();
      return data;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  async getAll(): Promise<any> {
    try {
      const querySnapshot = await getDocs(collection(db, this.moduleName));
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  async getByWhere(whereField: string, whereValue: string): Promise<any> {
    try {
      const q = query(
        collection(db, this.moduleName),
        where(whereField, "==", whereValue)
      );
      const querySnapshot = await getDocs(q);
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }
}

export default BaseModel;
