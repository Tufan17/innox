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
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Center } from "@mantine/core";
import { FallingLines } from 'react-loader-spinner'
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
        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
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
    return <Center
      style={{
        width: "100%",
        height: window.innerHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <FallingLines
        color="#18216d"
        width="100"
        visible={true}
      />
    </Center>;
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
        {/* Var olan bir sayfa olmadığında 404 sayfasına yönlendirme yapma geri dönder */}
        
        <Route path="*" element={<NotFoundView />} />

      </Routes>

    </>

  );
}
