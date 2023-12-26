import Header from "./common/header.tsx";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Nav from "./common/nav.tsx";
import Main from "./common/main.tsx";
import NotFoundView from "../../pages/404";
import AnalysisView from "./analysis.tsx";
import UsersView from "./users";
import SettingView from "./settings.tsx";
import ContentsView from "./contents.tsx";
import AddContentView from "./content/content_add.tsx";
import EditContentView from "./content/content_edit.tsx";
import ShowContentView from "./content/content_show.tsx";
import SubContentAddView from "./content/sub_content_add.tsx";
import SubjectDetail from "./subject/index.tsx";
import SubContentEditView from "./content/sub_content_edit.tsx";
import SubjectAddView from "./subject/subject_add.tsx";
import QuestionBankView from "./questionbank/index.tsx";
import AllSubject from "./subject/all_subjects.tsx";
import QuestionBankAddView from "./questionbank/add_question_bank.tsx";
import ShowQuestionBankView from "./questionbank/show_questionbank.tsx";
import AddQuestionView from "./questionbank/questions/add_question.tsx";
import EditQuestionBank from "./questionbank/edit_question_bank.tsx";
import SubjectEditView from "./subject/edit_subject.tsx";
import SubjectShowView from "./subject/show_subject.tsx";
const Dashboard = () => {
  const [openNav, setOpenNav] = useState<boolean>(true);
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/Android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
      setMobile(true);
    }
  }, []);
  return (
    <div
      style={{
        overflowY: "hidden",
        width: "100%",
        height: window.innerHeight,
      }}
    >
      <Header mobile={mobile} onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav
          openNav={openNav}
          mobile={mobile}
          onCloseNav={() => setOpenNav(false)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                children={<AnalysisView/>}
                mobile={mobile}
              />
            }
          />
          
            
              <Route
                path="/users"
                element={<Main children={<UsersView />} mobile={mobile} />}
              />
              <Route
                path="/questionbank"
                element={<Main children={<QuestionBankView />} mobile={mobile} />}
              />
              <Route
                path="/questionbank/:id"
                element={<Main children={<EditQuestionBank />} mobile={mobile} />}
              />
              <Route
                path="/questionbank/add"
                element={<Main children={<QuestionBankAddView />} mobile={mobile} />}
              />
              <Route
                path="/questionbank/show/:id"
                element={<Main children={<ShowQuestionBankView />} mobile={mobile} />}
              />
              <Route
                path="/questionbank/question/add/:id"
                element={<Main children={<AddQuestionView />} mobile={mobile} />}
              />
              <Route
                path="/subjects"
                element={<Main children={<AllSubject />} mobile={mobile} />}
              />
              <Route
                path="/subjects/edit/:id"
                element={<Main children={<SubjectEditView />} mobile={mobile} />}
              />
              <Route
                path="/subjects/show/:id"
                element={<Main children={<SubjectShowView />} mobile={mobile} />}
              />
              <Route
                path="/settings"
                element={<Main children={<SettingView />} mobile={mobile} />}
              />
              <Route
                path="/contents"
                element={<Main children={<ContentsView />} mobile={mobile} />}
              />
              <Route
                path="/contents/add"
                element={<Main children={<AddContentView />} mobile={mobile} />}
              />
              <Route
                path="/contents/edit/:id"
                element={<Main children={<EditContentView />} mobile={mobile} />}
              />
              <Route
                path="/contents/show/:id"
                element={<Main children={<ShowContentView />} mobile={mobile} />}
              />
               <Route
                path="/contents/show/:id/add"
                element={<Main children={<SubContentAddView />} mobile={mobile} />}
              />
              <Route
                path="/contents/show/:id/edit/:sub_id"
                element={<Main children={<SubContentEditView />} mobile={mobile} />}
              />
             <Route
                path="/contents/subject/:id"
                element={<Main children={<SubjectDetail />} mobile={mobile} />}
              />
              <Route
                path="/contents/subject/:id/add"
                element={<Main children={<SubjectAddView />} mobile={mobile} />}
              />

          <Route
            path="*"
            element={<Main children={<NotFoundView />} mobile={mobile} />}
          />
        </Routes>
      </Box>
    </div>
  );
};

export default Dashboard;
