import { IoChevronBack } from "react-icons/io5";
import { quinaryColor } from "../../constants/color";
import { useNavigate } from "react-router-dom";
const MobileBackButton = () => {
    const navigate = useNavigate();

    return (   <div style={{
        paddingLeft: "8px",
        paddingRight: "13px",
        paddingTop: "10px",
        paddingBottom: "3px",
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