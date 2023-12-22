import QuestionsModel from "../model/QuestionsModel";

const index = async () => {
  const data = await new QuestionsModel().getAll();
  return data;
};

const create = async (data: any) => {};

export default { index, create };
