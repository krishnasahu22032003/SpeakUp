import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import AdminAuthStore from "../../store/AdminAuthStore";

const AdminPublicRoute = ({ children }:{children : React.ReactNode}) => {
  const { isAuth, loading, checkAdminAuth } = AdminAuthStore();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  if (loading) return children ;

  if (isAuth) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default AdminPublicRoute;