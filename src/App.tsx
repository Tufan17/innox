import { useRoutes } from "react-router-dom"
import { Suspense, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Styles } from "./styles/styles";
import Index from "./pages";
import LoginView from "./pages/Login/login_view";
import NotFoundView from "./pages/404";
import RegisterView from "./pages/Login/register_view";
import { auth} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
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

  const routes = useRoutes(
    login?
    [
    {
      path: '/',
      element:
        <Suspense fallback={null}>
          <Styles />
          <Header />
          <Index />
          <Footer />
        </Suspense>
    },
    {
      path: '/login',
      element: <LoginView />
    },
    {
      path: '/register',
      element: <RegisterView />
    },
    {
      path: '*',
      element: <NotFoundView />
    }

  ]:[
    {
      path: '/',
      element:
        <Suspense fallback={null}>
          <Styles />
          <Header />
          <Index />
          <Footer />
        </Suspense>
    },
    {
      path: '/login',
      element: <LoginView />
    },
    {
      path: '/register',
      element: <RegisterView />
    },
    {
      path: '*',
      element:  <Suspense fallback={null}>
      <Styles />
      <Header />
      <Index />
      <Footer />
    </Suspense>
    }
  ]);

  return routes;
}

