import Footer from "../landing/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;