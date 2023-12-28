import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import userController from "../../database/db/controller/userController";
import languageController from "../../database/db/controller/languageController";

const useAuthentication = () => {
  const [login, setLogin] = useState<boolean | null>(null);

  useEffect(() => {
    document.title = `InnoX | Dijital Eğitim Platformu`;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;

    if (link) {
      link.href = `/img/logo_IX.png`;
    }

    const handleAuthStateChange = (user: any) => {
      if (user) {
       
        userController.getUser(user.uid!).then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res));
          if(res.role === "admin"){
            languageController.index().then((res) => {
              window.localStorage.setItem("languages", JSON.stringify(res));
              setLogin(true);
            });
          }else{
            setLogin(true);
          }
        });

        if (window.location.pathname === "/login"||window.location.pathname === "/") {
          const data= JSON.parse(window.localStorage.getItem("user")!);          
          if(data.role=== "user"){
            const userAgent = navigator.userAgent;
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
              window.location.href = data.education === null ? "/dashboard" : "/app/home";
          } else {
              window.location.href = "/user_dashboard";
          }
          }else{
            window.location.href = "/dashboard";
          }
          
        }
      } else {
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/"
        ) {
          if(window.location.pathname==="/info"){
            const userAgent = navigator.userAgent;
            if (!/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
              window.location.href = "/";
            }
          }else{
            window.location.href = "/";

          }
        }
        setLogin(false);
      }
    };

      const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

      return () => {
        unsubscribe();
      };
  }, []);

  return login;
};

export default useAuthentication;
