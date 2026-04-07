import { Navigate } from "react-router-dom";
import AdminAuthStore from "../../store/AdminAuthStore";
import { useEffect } from "react";
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { isAuth, admin, loading, checkAdminAuth } = AdminAuthStore();
    useEffect(() => {
        checkAdminAuth()
    }, [])

    if (loading) {
        return (
            <div className="relative flex items-center justify-center min-h-screen bg-[var(--bg-main)] overflow-hidden">

                <div className="absolute inset-0 bg-effect"></div>

                <div className="relative flex items-center justify-center">

                    <div className="absolute w-40 h-40 rounded-full border border-[var(--border-subtle)] animate-ping opacity-30"></div>

                    <div className="w-28 h-28 rounded-full bg-[var(--gradient-main)] shadow-[var(--glow-core)] blur-[0.5px] animate-[spin_6s_linear_infinite]"></div>

                    <div className="absolute w-20 h-20 rounded-full glass flex items-center justify-center">

                        <div className="absolute w-full h-full rounded-full border-2 border-transparent border-t-[var(--accent-core)] border-r-[var(--accent-aurora)] animate-spin"></div>

                        <div className="w-3 h-3 rounded-full bg-[var(--accent-core)] shadow-[var(--glow-core)] animate-pulse"></div>
                    </div>

                    <div className="absolute w-2 h-2 bg-[var(--accent-aurora)] rounded-full top-0 left-1/2 animate-[float_6s_ease-in-out_infinite] shadow-[var(--glow-aurora)]"></div>
                    <div className="absolute w-2 h-2 bg-[var(--accent-core)] rounded-full bottom-0 right-1/3 animate-[float_8s_ease-in-out_infinite] shadow-[var(--glow-core)]"></div>
                </div>

                <div className="absolute bottom-24 text-center">
                    <p className="text-[var(--text-secondary)] text-sm tracking-wide animate-pulse">
                        Verifying your session...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuth) {
        return <Navigate to="/admin/signin" />
    };

    if (admin?.role !== "ADMIN") {
        return <Navigate to="/" />
    }
    return children;
};

export default AdminProtectedRoute;

