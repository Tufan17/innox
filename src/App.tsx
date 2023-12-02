// App.tsx
import React, { Suspense, useEffect, useState } from "react";
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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/Router/PrivateRoute";
export default function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    document.title = `InnoX`;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = `/img/logo_IX.png`;
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setLogin(true);
      } else {
        console.log("no user");
        setLogin(false);
      }
    });
  }, []);

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Suspense fallback={null}>
        <Styles />
        <Header />
        <Index />
        <Footer />
      </Suspense>} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      {/* <PrivateRoute login={login} path="/dashboard" element={<Container>Dashboard</Container>} /> */}
  
      <Route path="*" element={<NotFoundView />}/>

    </Routes>
  </AuthProvider>);
}
