// App.tsx
import { Suspense, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Styles } from "./styles/styles";
import Index from "./pages";
import LoginView from "./pages/Login/login_view";
import NotFoundView from "./pages/404";
import RegisterView from "./pages/Login/register_view";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import routers from "./constants";
import Loader from "./pages/Loader";
import { signout } from "../database/service/auth_service";

export default function App() {
  const [login, setLogin] = useState<boolean | null>(false);
  useEffect(() => {
    document.title = `InnoX`;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = `/img/logo_IX.png`;
    }
    if(window.location.pathname !== "/register"){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLogin(true);
  
          if (window.location.pathname === "/login") {
            window.location.href = "/dashboard";
          }
        } else {
          if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
            window.location.href = "/";
          }
          setLogin(false);
        }
      });}else{
        signout();
      }
  }, []);
  if (login === null) {
    return (<Loader/>);
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

          !login && (<>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
          </>
          )
        }
        {
          login && (<>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </>
          )
        }
        <Route path="*" element={routers.includes(window.location.pathname.split("/")[1]) ? <Loader/> : <NotFoundView />} />

      </Routes>

    </>

  );
}
