// App.tsx
import { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Styles } from "./styles/styles";
import Index from "./pages";
import LoginView from "./pages/Login/login_view";
import NotFoundView from "./pages/404";
import RegisterView from "./pages/Login/register_view";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import routers from "./constants";
import Loader from "./pages/Loader";
import useAuthentication from "./hooks/useAuthentication";
import UsersView from "./pages/Users/mobile";
import EducationView from "./pages/Users/mobile/Education";
import SubjectsView from "./pages/Users/mobile/subjects";
import UserDashBoard from "./pages/Users/web";
import UserSubjectView from "./pages/Users/web/user_rsubject_view";
import UserSubjectDetailView from "./pages/Users/web/user_subject_detail";
import WebExamView from "./pages/Users/web/web_exam_view";
import ExamMobileView from "./pages/Users/mobile/exam";
import ResultExamView from "./pages/Users/mobile/exam/result_exam";
import ResultExamWebView from "./pages/Users/web/result_exam";

export default function App() {
  const login = useAuthentication();
  const user = JSON.parse(window.localStorage.getItem("user")!);


  if (login === null) {
    return (<Loader />);
  }


  return (
    <>


      <Routes>
        <Route path="/" element={

          <Suspense fallback={null}>
            <Styles />
            <Header />
            <Index />
            <Footer />
          </Suspense>} />
        {

          !login ? (<>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
          </>
          ) :

            user!.role === "admin" ?
              (<>
                <Route path="/dashboard/*" element={<Dashboard />} />
              </>
              ) :
              (
                <>
                  <Route path="/dashboard" element={<UsersView />} />
                  <Route path="/user_dashboard" element={<UserDashBoard />} />
                  <Route path="/user_dashboard/exam/:id" element={<WebExamView />} />
                  <Route path="/user_dashboard/subject/:id" element={<UserSubjectView />} />
                  <Route path="/user_dashboard/subject/detail/:id" element={<UserSubjectDetailView />} />
                  <Route path="/user_dashboard/result/:id" element={<ResultExamWebView />} />

                  <Route path={"/app/*"} element={<EducationView />} />
                  <Route
                    path="mobile/exam/:id"
                    element={<ExamMobileView />}
                  />
                  <Route
                    path="mobile/result/*"
                    element={<ResultExamView />}
                  />
                  <Route
                    path="mobile/subject/*"
                    element={<SubjectsView />}
                  />
                </>

              )

        }
        <Route path="*" element={routers.includes(window.location.pathname.split("/")[1]) ? <Loader /> : <NotFoundView />} />

      </Routes>

    </>

  );
}
