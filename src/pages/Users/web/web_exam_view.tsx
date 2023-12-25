import { useParams } from "react-router-dom";

const WebExamView = () => {
    const {id}= useParams();

    return ( <>
        <h1>Web Exam View</h1>
        {id}
    </> );
}
 
export default WebExamView;