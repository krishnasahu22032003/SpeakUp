import Button from "../ui/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    
  const navigate = useNavigate() ;

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" }
      });

      tl.from(".cta-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
      })

      .from(".cta-subtext", {
        y: 40,
        opacity: 0,
        duration: 1,
      }, "-=0.6")

      .from(".cta-buttons", {
        y: 30,
        opacity: 0,
        duration: 1,
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-70" />

      <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-8">
        
        <h2 className="cta-title text-[30px] sm:text-[36px] lg:text-[44px] font-semibold text-[var(--text-primary)] leading-[1.15] tracking-tight">
          Your voice matters.{" "}
          <span className="bg-gradient-to-r from-[var(--accent-core)] to-[var(--accent-aurora)] bg-clip-text text-transparent">
            Make it heard.
          </span>
        </h2>

        <p className="cta-subtext text-[16px] sm:text-[18px] text-[var(--text-secondary)] max-w-2xl">
          SpeakUp gives you a safe, secure way to raise concerns, track progress,
          and create real change — without fear.
        </p>

        <div className="cta-buttons flex flex-wrap justify-center gap-4">
          <Button onClick={()=>{navigate("/complaint")}}>
            Raise Voice
          </Button>
        </div>

        <p className="text-sm text-[var(--text-muted)] pt-4">
          Anonymous • Secure • No identity required
        </p>

      </div>
    </section>
  );
};

export default CTA;