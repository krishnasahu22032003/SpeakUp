import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/global/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
         <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;