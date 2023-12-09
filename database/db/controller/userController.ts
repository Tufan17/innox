import UserModel from "../model/UserModel";

const index = async () => {
  const data = await new UserModel().getAll();
return data;
};
const getUser= async (id:string) => {
  const data = await new UserModel().getById(id);
return data;
}







export default  {index,getUser};