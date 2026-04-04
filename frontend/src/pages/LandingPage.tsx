import Features from "../components/landing/Features"
import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-(--bg-main)">
      <Header />
      <Hero />
      <Features/>
    </div>
  )
}

export default LandingPage
