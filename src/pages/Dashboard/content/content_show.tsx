import { useParams } from "react-router-dom";

const ShowContentView = () => {
    const { id } = useParams();
    return ( <>
    

    show=
    {id}
    
    </> );
}
 
export default ShowContentView;