import QuestionBankModel from "../model/QuestionBankModel";

const index = async () => {
  const data = await new QuestionBankModel().getAll();
return data;
}

const create= async (data:any) => {
    const result = await new QuestionBankModel().create(data);
    return result;
}


export default  {index,create};