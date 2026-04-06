import { Navigate } from "react-router-dom";
import { CheckUserStore } from "../../store/useAuthStore";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, loading, user } = CheckUserStore();

  if (loading) return null;

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