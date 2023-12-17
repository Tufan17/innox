import SubjectModel from "../model/SubjectModel";

const index = async (id:string) => {
  const data = await new SubjectModel().getByWhere("content_id",id,);
  return data;
};

const create = async (data: any) => {
  const index = await new SubjectModel().getByWhere("index", data.index);
  if (index.length > 0) {
    return { error: "Bu sıra zaten var." };
  } else {
    await new SubjectModel().create({
      index: data.index,
      title: data.title,
      subtitle: data.subtitle,
      icon: data.icon,
      width: data.width,
      height: data.height,
    });
    return { success: "Konu başarıyla eklendi." };
  }
};

const update = async (id: string, data: any) => {
  try {
    if (data?.index) {
      const index = await new SubjectModel().getByWhere("index", data.index);
      if (index.length > 0) {
        return { error: "Bu sıra zaten var." };
      }
    }
    await new SubjectModel().update(id, data);
    return { success: "Konu başarıyla güncellendi." };
  } catch (e) {
    return { error: "Konu güncellenirken bir hata oluştu." };
  }
};

const getById = async (id: string) => {
  const result = await new SubjectModel().getById(id);
  return result;
};

export default { index, create, update, getById };
