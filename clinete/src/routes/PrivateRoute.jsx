import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo = "/home" }) => {
  const { isAuthenticated, user } = useAuth0();
  const [authUser, setAuthUser] = useState({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 7000);
  useEffect(() => {
    if (isAuthenticated !== false && user !== undefined) {
      if (isAuthenticated) {
        setAuthUser({ isAuthenticated: true, user: user });
      } else {
        setAuthUser({ isAuthenticated: false, user: null });
      }
    }
  }, [isAuthenticated, user]);
  console.log("PrivateRoute", isAuthenticated, user, authUser);

  if (isLoading) {
    return (
      <>
        <div style={{padding:"30px", fontWeight:"bold", backgroundColor: "black" }}>Loading...</div>; // o algún
        tipo de indicador de carga
        <img width={"1000px"} height={"700px"} src={"https://cdn.dribbble.com/users/4045758/screenshots/13752558/media/90f245fd66ab09e7b9f36161709bd1aa.gif"} alt="loading..." />
      </>
    );
  }
  console.log("PrivateRoute then", isAuthenticated, user, authUser);
  if (!authUser.isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};
export default PrivateRoute;
