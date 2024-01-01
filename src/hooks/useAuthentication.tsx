import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import userController from "../../database/db/controller/userController";
import languageController from "../../database/db/controller/languageController";
import { useDispatch, useSelector } from "react-redux";
import {  userStore } from "../redux/features/user";

const useAuthentication = () => {
  const [login, setLogin] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  useSelector((state: any) => state.user.value);
  useEffect(() => {
    const handleAuthStateChange = (user: any) => {
      if(user){
        userController.getUser(user.uid!).then((res) => {
          const { updated_at, ...rest } = res;
          dispatch(userStore(rest));
          if (window.location.pathname === "/login"||window.location.pathname === "/") {
            if(res.role=== "user"){
              const userAgent = navigator.userAgent;
              if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
                window.location.href = res.education === null ? "/dashboard" : "/app/home";
            } else {
                window.location.href = "/user_dashboard";
            }
            }else{
              languageController.index().then((res) => {
                window.localStorage.setItem("languages", JSON.stringify(res));
                setLogin(true);
              }).finally(()=>{
              window.location.href = "/dashboard";
            });
          }
            
          }
          setLogin(true);
      })
      
    }else{
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


/*

- önce auth mu diye soracağız




*/