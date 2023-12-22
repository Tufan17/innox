import UserModel from "../model/UserModel";
import ContentsModel from "../model/ContentsModel";
import SubjectModel from "../model/SubjectModel";

const index = async () => {
  const contents = await new ContentsModel().count();
  const users = await new UserModel().count();
  const subjects = await new SubjectModel().count();
  const questions=0;
  const data = { contents, users , subjects, questions};
  return data;
};


export default { index };