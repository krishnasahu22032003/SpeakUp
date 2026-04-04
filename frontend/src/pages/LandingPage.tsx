import About from "../components/landing/About"
import Features from "../components/landing/Features"
import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"
import Fight from "../components/landing/Fight"
import Testimonials from "../components/landing/Testimonials"
import CTA from "../components/landing/CTA"
import Footer from "../components/landing/Footer"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-(--bg-main)">
      <Header />
      <Hero />
      <Features/>
      <About/>
      <Fight/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default LandingPage
