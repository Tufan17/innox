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
import { Container, Spinner } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
export default function App() {
  const [login, setLogin] = useState<boolean | null>(null);
  useEffect(() => {
    document.title = `InnoX`;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = `/img/logo_IX.png`;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if(window.location.pathname === "/login" || window.location.pathname === "/register"){
          window.location.href = "/dashboard";
        }
        setLogin(true);
      } else {
        console.log("no user");
        setLogin(false);
      }
    });
  }, []);
  if (login === null) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }


  return (
    <>


      <Routes>
        <Route path="/" element={<Suspense fallback={null}>
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
            <Route path="/dashboard" element={<Container>Dashboard</Container>} />
          </>
          )
        }
        <Route path="*" element={<NotFoundView />} />

      </Routes>

    </>

  );
}
