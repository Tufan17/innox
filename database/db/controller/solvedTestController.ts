import SolvedTestModel from "../model/SolvedTestModel";

const create = async (data: any) => {
    try{
        await new SolvedTestModel().create({
            sub_id: data.sub_id,
            user_id: data.user_id,
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

const getLessons = async (user_id:string) => {
    try{
        const solvedTests = await new SolvedTestModel().getSub(user_id);
        return solvedTests;
    }catch(error){
        console.log(error);
        return false;
    }

};

export default {create, getLessons};
