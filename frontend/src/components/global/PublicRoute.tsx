import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CheckUserStore } from "../../store/useAuthStore";

const PublicRoute = ({ children } :{children:React.ReactNode}) => {
  const { isAuth, loading, user, checkAuth } = CheckUserStore();

  useEffect(() => {
    checkAuth(); 
  }, []);

  if (loading) return <div>Loading...</div>; 

  if (isAuth) {
    return (
      <Navigate
        to={user?.role === "ADMIN" ? "/admin-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;