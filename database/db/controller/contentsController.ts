import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import ContentsModel from "../model/ContentsModel";

const index = async () => {
  const data = await new ContentsModel().getOrderBy("index", "asc");
  return data;
};

const create = async (data: any) => {
  const index = await new ContentsModel().getByWhere("index", data.index);
  if (index.length > 0) {
    return { error: "Bu sıra zaten var." };
  } else {
    const path="contents/"+data.icon.name;
    const fileRef = ref(storage, path);
    try{
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

    }catch(e){
        
        return { error: "İçerik eklenirken bir hata oluştu." };
      }
    
  }

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
