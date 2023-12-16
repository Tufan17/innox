import BaseModel from "./BaseModel";
import {
    collection,
    where,
    getDocs,
    DocumentData,
    query,
    orderBy,
    OrderByDirection,
  } from "firebase/firestore";
  import {  db } from "../../../firebase";
class ContentsModel extends BaseModel {
    constructor() {
        super('contents');
    }
   async getContent(type:string,orderField: string, orderValue: OrderByDirection): Promise<DocumentData[]> {
        try {
            const q = query(
              collection(db, this.moduleName),
              where("type", "==", type),
              orderBy(orderField, orderValue)
            );
      
            const querySnapshot = await getDocs(q);
            const data: DocumentData[] = [];
      
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });
      
            return data;
          } catch (error) {
            console.error("Error getting documents:", error);
            throw error;
          }
    }
  async getContentSub(id:string): Promise<DocumentData[]> {
    try {
        const q = query(
          collection(db, this.moduleName),
          where("main_id", "==", id),
          orderBy("index", "asc")
        );
  
        const querySnapshot = await getDocs(q);
        const data: DocumentData[] = [];
  
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
  
        return data;
      } catch (error) {
        console.error("Error getting documents:", error);
        throw error;
      }
    }
}
export default ContentsModel;