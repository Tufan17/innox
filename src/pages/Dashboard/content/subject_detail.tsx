import { useParams } from "react-router-dom";

const SubjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    return ( 
        <>

            {id}
        
        </>
     );
}
 
export default SubjectDetail;