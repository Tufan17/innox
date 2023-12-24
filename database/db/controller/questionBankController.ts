import QuestionBankModel from "../model/QuestionBankModel";
import QuestionsModel from "../model/QuestionsModel";

const index = async () => {
  const data = await new QuestionBankModel().getAll();
return data;
}
const getById = async (id:string) => {
  const data = await new QuestionBankModel().getById(id);
return data;
}
const getQuestions = async (ids:[]) => {
  const data = await new QuestionsModel().getByIds(ids);
return data;
}

const update = async (id:string,data:any) => {
  try{
    await new QuestionBankModel().update(id,data);
    return {success:"Soru bankası başarıyla güncellendi"};
  }catch(error){
    return {error:"Güncellenirken bir hata oluştu"};
  }
}

const create= async (data:any) => {
   try{

    const result = await new QuestionBankModel().create(data);
    return {
      success:"Soru bankası başarıyla oluşturuldu",
      result};
  }catch(error){
    return {error:"Yüklenirken bir hata oluştu"};
  }
}


export default  {update,index,getById,getQuestions,create};