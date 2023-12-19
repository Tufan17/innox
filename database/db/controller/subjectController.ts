import SubjectModel from "../model/SubjectModel";

const index = async (id:string) => {
  const data = await new SubjectModel().getByWhere("sub_id",id,);
  return data;
};

const create = async (data: any) => {
  try{
    //data içerisinde sub_id content title olmak zorunda değilse hata ver
    if (!data?.sub_id || !data?.content || !data?.title) {
      return { error: "Konu oluşturulurken bir hata oluştu." };
    }
    await new SubjectModel().create(data);
    return { success: "Konu başarıyla oluşturuldu." };
  }catch(e){
    return { error: "Konu oluşturulurken bir hata oluştu." };
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
