import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SubjectModel from "../model/SubjectModel";
import { storage } from "../../../firebase";
const index = async (id: string) => {
  const data = await new SubjectModel().getByWhere("sub_id", id);
  return data;
};

const create = async (data: any) => {
  try {
    //data içerisinde sub_id content title olmak zorunda değilse hata ver
    if (!data?.sub_id || !data?.content || !data?.title) {
      return { error: "Konu oluşturulurken bir hata oluştu." };
    } else {
      if (data.icon) {
        const path = "subjects/" + data.icon.name;
        const fileRef = ref(storage, path);
        await uploadBytes(fileRef, data.icon);
        const downloadURL = await getDownloadURL(fileRef);
        data.icon = downloadURL;
      } else {
        data.icon = "https://firebasestorage.googleapis.com/v0/b/innox-ee22c.appspot.com/o/icons%2F6329.jpg?alt=media&token=bcf9f1f3-eacc-4968-b648-b42b8fc7228b";
      }
      await new SubjectModel().create(data);
    }
    return { success: "Konu başarıyla oluşturuldu." };
  } catch (e) {
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
