import QuestionsModel from "../model/QuestionsModel";

const index = async () => {
  const data = await new QuestionsModel().getAll();
  return data;
};
const getById = async (id: any) => {
  const data = await new QuestionsModel().getById(id);
  return data;
}

const create = async (data: any) => {
  try {
    const result = await new QuestionsModel().createQuestion(data);
    return {
      success: "Soru başarıyla oluşturuldu",
      result,
    };
  } catch (error) {
    return { error: "Yüklenirken bir hata oluştu" };
  }
};

const getQuestions=(ids:any)=>{
  return new QuestionsModel().getByIds(ids);
}

const update = async (id: any, data: any) => {
  try {
    const result = await new QuestionsModel().update(id, data);
    return {
      success: "Soru başarıyla güncellendi",
      result,
    };
  } catch (error) {
    return { error: "Güncellenirken bir hata oluştu" };
  }
}

export default { index,getById, create ,getQuestions,update};
