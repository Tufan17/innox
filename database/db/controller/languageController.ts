import LanguageModel from "../model/LanguageModel";

const index = async () => {
  const data = await new LanguageModel().getAll();
return data;
}

const create= async (data:any) => {
    const result = await new LanguageModel().create(data);
    return result;
}


export default  {index,create};