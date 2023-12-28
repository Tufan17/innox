import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import ContentsModel from "../model/ContentsModel";

const index = async (type:string) => {
  const data = await new ContentsModel().getContent(type,"index", "asc");
  return data;
};
const subIndex = async (id:string) => {
  const data = await new ContentsModel().getContentSub(id);
  return data;
};


const create = async (data: any) => {
  const index = await new ContentsModel().getByWhere("index", data.index);
  if (index.length > 0) {
    return { error: "Bu sıra zaten var." };
  } else {
    const path = "contents/" + data.icon.name;
    const fileRef = ref(storage, path);
    try {
      await uploadBytes(fileRef, data.icon);
      const downloadURL = await getDownloadURL(fileRef);

      await new ContentsModel().create({
        index: data.index,
        title: data.title,
        subtitle: data.subtitle,
        icon: downloadURL,
        width: data.width,
        height: data.height,
      });
      return { success: "İçerik başarıyla eklendi." };
    } catch (e) {
      return { error: "İçerik eklenirken bir hata oluştu." };
    }
  }
};

const update = async (id: string, data: any) => {
  try {
    if (data?.index) {
      const index = await new ContentsModel().getByWhere("index", data.index);
      if (index.length > 0) {
        return { error: "Bu sıra zaten var." };
      }
    } 
     if (data?.icon) {
      const path = "contents/" + data.icon.name;
      const fileRef = ref(storage, path);
      await uploadBytes(fileRef, data.icon);
      const downloadURL = await getDownloadURL(fileRef);
      data.icon = downloadURL;
      await new ContentsModel().update(id, data);
    } else {
      await new ContentsModel().update(id, data);
    }
    return { success: "İçerik başarıyla güncellendi." };
  } catch (e) {
    return { error: "İçerik güncellenirken bir hata oluştu." };
  }
};

const getById = async (id: string) => {
  try{
    const result = await new ContentsModel().getById(id);
    return result;
  }catch(e){
    return { error: "İçerik bulunamadı." };
  }
};

const remove = async (id: string) => {
  const result = await new ContentsModel().delete(id);
  return result;
};


const addSubContent = async (data: any) => {
  const path = "contents/" + data.icon.name;
  const fileRef = ref(storage, path);
  try {
    await uploadBytes(fileRef, data.icon);
    const downloadURL = await getDownloadURL(fileRef);

    await new ContentsModel().create({
      index: 0,
      title: data.name,
      subtitle: data.subtitle,
      icon: downloadURL,
      main_id: data.content_id,
      type: "sub",
      card_type: data.type,
      width: data.width,
      height: data.height,
    });
    return { success: "İçerik başarıyla eklendi." };
  } catch (e) {
    return { error: "İçerik eklenirken bir hata oluştu." };
  }

};





export default { index, create, getById, update, remove,addSubContent,subIndex };
