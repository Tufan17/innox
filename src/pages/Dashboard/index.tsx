import Header from "./common/header.tsx";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Nav from "./common/nav.tsx";
import Main from "./common/main.tsx";
import Footer from "../../components/Footer";
import Header1 from "../../components/Header";
import { Styles } from "../../styles/styles";
import Index from "../../pages";
import LoginView from "../../pages/Login/login_view";
import NotFoundView from "../../pages/404";
import RegisterView from "../../pages/Login/register_view";
import AnalysisView from "./analysis.tsx";
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
          {
            <>
              <Route
                path="/login"
                element={<Main children={<LoginView />} mobile={mobile} />}
              />
              <Route
                path="/register"
                element={<Main children={<RegisterView />} mobile={mobile} />}
              />
            </>
          }
          {
            <>
              <Route
                path="/dashboard/*"
                element={<Main children={<Dashboard />} mobile={mobile} />}
              />
            </>
          }
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
