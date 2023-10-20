import { useRoutes } from "react-router-dom"
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Styles } from "./styles/styles";
import Index from "./pages";
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
      path:'dashboard',
      element:<div>2</div>
    },
    {
      path:'*',
      element:<>3</>
    }
  ]);

  return routes;
}

