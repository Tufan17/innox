import { useRoutes } from "react-router-dom"
import { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Styles } from "./styles/styles";
import Index from "./pages";
import LoginView from "./pages/Login/login_view";
export default function App() {

  const routes=useRoutes([
    {
      path:'/',
      element:
      <Suspense fallback={null}>
      <Styles />
      <Header />
      <Index />
      <Footer />

    </Suspense>
    },
    {
      path:'/login',
      element:<LoginView />
    },
  ]);

  return routes;
}

