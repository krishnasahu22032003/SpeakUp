import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CheckUserStore } from "../../store/useAuthStore";

const PublicRoute = ({ children } :{children:React.ReactNode}) => {
  const { isAuth, loading, checkAuth } = CheckUserStore();

  useEffect(() => {
    checkAuth(); 
  }, []);

  if (loading) return children ;

  if (isAuth) {
    return (
      <Navigate
        to="/user-dashboard"
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;