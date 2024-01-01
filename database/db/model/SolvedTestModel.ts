import { DocumentData,  collection, getDocs, query, where } from "firebase/firestore";
import BaseModel from "./BaseModel";
import { db } from "../../../firebase";

class SolvedTestModel extends BaseModel {
  constructor() {
    super('solved_tests');
  }
  

async getSub(user_id:string) {
    try {
      const q = await query(
        collection(db, this.moduleName),
        where("user_id", "==", user_id),
        // where("sub_id", "==", sub_id),
        where("deleted_at", "==", null),

      );
      const querySnapshot = await getDocs(q);
    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
    } catch (error) {
      console.error("Error creating document:", error);
      return false;
    }
}


    /*
        Model tipi
        id: number;
        [key: sub_id]: any;{
            
        }

*/  
}
export default SolvedTestModel;