import { Route, Routes } from "react-router-dom";
import SubjectView from "./SubjectView";
import SubjectDetailView from "./SubjectDetailView";

const SubjectsView = () => {
    return (
        <>         
        <Routes>
            <Route path="/detail/:id" element={<SubjectDetailView />} />
            <Route path="/:id" element={<SubjectView />} />
        </Routes>
        

        </>
         );
}
 
export default SubjectsView;