import ContentsModel from "../model/ContentsModel";

const index = async () => {
  const data = await new ContentsModel().getAll();
  return data;
};

const create = async (data: any) => {
  const result = await new ContentsModel().create(data);
  return result;
};

const update = async (id: string, data: any) => {
  const result = await new ContentsModel().update(id, data);
  return result;
};

const remove = async (id: string) => {
  const result = await new ContentsModel().delete(id);
  return result;
};

export default { index, create, update, remove };