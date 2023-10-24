import { useRoutes } from "react-router-dom"
import { Suspense, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Styles } from "./styles/styles";
import Index from "./pages";
import LoginView from "./pages/Login/login_view";
import NotFoundView from "./pages/404";
export default function App() {

  useEffect(() => {
    document.title = `InnoX`;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = `/img/logo_IX.png`;
    }
    window.location.pathname.split("/");
  }, []);

  const routes = useRoutes([
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
      path: '*',
      element: <NotFoundView />
    }
  ]);

  return routes;
}

