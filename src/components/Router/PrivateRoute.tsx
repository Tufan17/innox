import React from "react";
import {  Route, Navigate, Routes } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
  login: boolean;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path, login, ...rest }) => {
  return login &&( <Routes>
    <Route path={path} element={element} {...rest} />
    </Routes>
  ) ;
};

export default PrivateRoute;
