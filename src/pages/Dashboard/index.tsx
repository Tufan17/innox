import Header from "./common/header.tsx";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Nav from "./common/nav.tsx";
import Main from "./common/main.tsx";
import NotFoundView from "../../pages/404";
import RegisterView from "../../pages/Login/register_view";
import AnalysisView from "./analysis.tsx";
import UsersView from "./users";
import SettingView from "./settings.tsx";
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
                path="/settings"
                element={<Main children={<SettingView />} mobile={mobile} />}
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
