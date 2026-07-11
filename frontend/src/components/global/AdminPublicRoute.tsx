import { Navigate } from "react-router-dom";
import AdminAuthStore from "../../store/AdminAuthStore";

const AdminPublicRoute = ({ children }:{children : React.ReactNode}) => {
  const { isAuth } = AdminAuthStore();

  if (isAuth) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default AdminPublicRoute;