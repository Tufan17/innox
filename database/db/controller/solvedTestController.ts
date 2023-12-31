import SolvedTestModel from "../model/SolvedTestModel";

const create = async (data: any) => {
    try{
        const user=JSON.parse(window.localStorage.getItem("user")!);  
        await new SolvedTestModel().create({
            sub_id: data.sub_id,
            user_id: user.id,
            qb_id: data.qb_id,
            correct: data.correct,
            wrong: data.wrong,
            empty: data.empty,
            size: data.size,
        });
        console.log("object");
        return true;

    }catch(error){
        console.log(error);
        return false;
    }
};

export default {
    create};
