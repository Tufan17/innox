import UserModel from "../model/UserModel";
import ContentsModel from "../model/ContentsModel";

const index = async () => {
  const contents = await new ContentsModel().count();
  const users = await new UserModel().count();
  const data = { contents, users };
  return data;
};


export default { index };