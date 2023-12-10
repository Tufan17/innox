import BannerModel from "../model/BannerModel";

const index = async () => {
  const data = await new BannerModel().getAll();
  return data;
};

const create = async (data: any) => {
  const result = await new BannerModel().create(data);
  return result;
};

const update = async (id: string, data: any) => {
  const result = await new BannerModel().update(id, data);
  return result;
};

const remove = async (id: string) => {
  const result = await new BannerModel().delete(id);
  return result;
};

export default { index, create, update, remove };
