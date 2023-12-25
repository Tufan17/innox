import QuestionsModel from "../model/QuestionsModel";

const index = async () => {
  const data = await new QuestionsModel().getAll();
  return data;
};

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

export default { index, create ,getQuestions};
