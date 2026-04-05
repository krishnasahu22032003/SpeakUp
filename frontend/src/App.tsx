import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/global/Layout";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Complaint from "./pages/ComplaintPage";
import { Toaster } from "sonner";

const App = () => {
  return (
  <>
  <Toaster position="top-center" richColors/>
    <Router>
      <Routes>
         <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/complaint" element={<Complaint/>} />
        </Route>
      </Routes>
    </Router>
  </>
  
  );
};

export default App;