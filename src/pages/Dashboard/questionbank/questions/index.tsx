import { useParams } from "react-router-dom";

const QuestionView = () => {
    const { id } = useParams<{ id: string }>();
    return ( <>
        {id}
    </> );
}
 
export default QuestionView;