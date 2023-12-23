import QuestionBankModel from "../model/QuestionBankModel";

const index = async () => {
  const data = await new QuestionBankModel().getAll();
return data;
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


export default  {index,create};