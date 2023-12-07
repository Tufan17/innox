import UserModel from "../model/UserModel";

const index = async () => {
  const data = await new UserModel().getAll();
return data;
};
const store = async () => {
    const data = await new UserModel().create({
        name: "test",
        email: ""
    });
    console.log(data);
};
export default  {index,store};