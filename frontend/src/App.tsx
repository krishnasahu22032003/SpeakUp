import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/global/Layout";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Complaint from "./pages/ComplaintPage";
import { Toaster } from "sonner";
import { CheckUserStore } from "./store/useAuthStore";
import { useEffect } from "react";
import UserDashboardPage from "./pages/UserDashboardPage";
import ProtectedRoute from "./components/global/ProtectedRoute";
import PublicRoute from "./components/global/PublicRoute";
import AdminSignup from "./pages/AdminSignUpPage";
import AdminSignInPage from "./pages/AdminSignInPage";

const App = () => {
  const checkAuth = CheckUserStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  return (
    <>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<PublicRoute> <SignIn /> </PublicRoute>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/signup" element={<AdminSignup/>}/>
            <Route path="/admin/signin" element={<AdminSignInPage/>}/>
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </>

  );
};

export default App;