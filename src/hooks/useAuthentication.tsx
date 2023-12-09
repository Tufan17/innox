import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import userController from "../../database/db/controller/userController";
import languageController from "../../database/db/controller/languageController";

const useAuthentication = () => {
  const [login, setLogin] = useState<boolean | null>(false);

  useEffect(() => {
    document.title = `InnoX`;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    
    if (link) {
      link.href = `/img/logo_IX.png`;
    }

    const handleAuthStateChange = (user: any) => {
      if (user) {
        setLogin(true);
        userController.getUser(user.uid!).then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res));
        });
        languageController.index().then((res) => {
          window.localStorage.setItem("languages", JSON.stringify(res));
        });

        if (window.location.pathname === "/login") {
          window.location.href = "/dashboard";
        }
      } else {
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/";
        }
        setLogin(false);
      }
    };

    if (window.location.pathname !== "/register") {
      const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return login;
};

export default useAuthentication;
