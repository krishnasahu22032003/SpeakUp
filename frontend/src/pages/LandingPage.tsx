import About from "../components/landing/About"
import Features from "../components/landing/Features"
import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-(--bg-main)">
      <Header />
      <Hero />
      <Features/>
      <About/>
    </div>
  )
}

export default LandingPage
