import { IoReturnUpBackOutline } from "react-icons/io5";
import { secondaryColor } from "../../constants/color";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
    const navigate = useNavigate();

    return ( <div style={{
        backgroundColor:secondaryColor,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"20%",
        width:"50px",
        height:"36.5px",
        color:"white",
    }}
    onClick={()=>{
        navigate(-1);
    }}
    >
    
   <IoReturnUpBackOutline size={30}/>
    
    </div> );
}
 
export default BackButton;