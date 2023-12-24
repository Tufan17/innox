import { addDoc, arrayUnion, collection, updateDoc } from "firebase/firestore";
import BaseModel from "./BaseModel";
import { db } from "../../../firebase";
import questionBankController from "../controller/questionBankController";
class QuestionsModel extends BaseModel {
  constructor() {
    super("questions");
  }
  async createQuestion(data: any): Promise<boolean> {
    try {
      const val = await addDoc(collection(db, this.moduleName), data);
      await updateDoc(val, {
        id: val.id,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
      questionBankController.update(data.qb_id, {
        questions: arrayUnion(val.id),
      });
      return true;
    } catch (error) {
      console.error("Error creating document:", error);
      return false;
    }
  }
}
export default QuestionsModel;
