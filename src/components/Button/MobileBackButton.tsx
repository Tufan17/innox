import { IoChevronBack } from "react-icons/io5";
import { quinaryColor } from "../../constants/color";
import { useNavigate } from "react-router-dom";
const MobileBackButton = () => {
    const navigate = useNavigate();

    return (   <div style={{
        paddingLeft: "10px",
        paddingRight: "15px",
        paddingTop: "12px",
        paddingBottom: "5px",
        border: "1px solid #ccc",
        borderRadius: "100%",
        }}
        onClick={()=>{
            navigate(-1);
        }}>
        <IoChevronBack color={quinaryColor} size={30}/>
            
            </div> );
}
 
export default MobileBackButton;