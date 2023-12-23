import UserModel from "../model/UserModel";
import ContentsModel from "../model/ContentsModel";
import SubjectModel from "../model/SubjectModel";
import QuestionBankModel from "../model/QuestionBankModel";

const index = async () => {
  const contents = await new ContentsModel().count();
  const users = await new UserModel().count();
  const subjects = await new SubjectModel().count();
  const questions=await new QuestionBankModel().count();
  const data = { contents, users , subjects, questions};
  return data;
};


export default { index };