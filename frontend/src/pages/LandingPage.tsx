import About from "../components/landing/About"
import Features from "../components/landing/Features"
import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"
import Fight from "../components/landing/Fight"
import Testimonials from "../components/landing/Testimonials"
import CTA from "../components/landing/CTA"
import Footer from "../components/landing/Footer"
import { CheckUserStore } from "../store/useAuthStore"
import { Navigate } from "react-router-dom"

const LandingPage = () => {
   const { isAuth, loading, user } = CheckUserStore();

  if (loading) return <div className="min-h-screen bg-[var(--bg-main)]" />;

  if (isAuth) {
    return (
      <Navigate
        to={user?.role === "ADMIN" ? "/admin-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }
  return (
    <div className="min-h-screen bg-(--bg-main)">
      <Header />
      <Hero />
      <Features/>
      <About/>
      <Fight/>
      <Testimonials/>
      <CTA/>
    </div>
  )
}

export default LandingPage
