import { useParams } from "react-router-dom";

const EditQuestionView = () => {
    const { id } = useParams<{ id: string }>();
    return ( <>
        {id}
    </> );
}
 
export default EditQuestionView;