import { useParams } from "react-router-dom";

const EditContentView = () => {
    const { id } = useParams();
    return ( 
<>
        edit content
        url den gelen id : {id}

</>


     );
}
 
export default EditContentView;