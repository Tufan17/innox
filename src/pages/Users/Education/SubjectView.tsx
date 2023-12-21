import { useParams } from "react-router-dom";

const SubjectView = () => {
    const {id}= useParams<{id:string}>();
    return ( <>
    
    {id}
    </> );
}
 
export default SubjectView;