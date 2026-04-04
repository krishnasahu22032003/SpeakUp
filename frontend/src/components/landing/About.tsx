import { ShieldCheck, EyeOff, MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: {
          ease: "power2.out",
        }
      });

      tl.from(".about-title", {
        y: 60,
        opacity: 0,
        duration: 1.4,
      })

      .from(".about-subtext", {
        y: 40,
        opacity: 0,
        duration: 1.2,
      }, "-=0.8")

      .fromTo(".about-stat",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
        },
        "-=0.6"
      )

      .fromTo(".about-card",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
        },
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="about"
      ref={containerRef}
      className="relative py-22 px-6 overflow-hidden"
    >
      
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center gap-16">

        <div className="flex flex-col gap-5 max-w-2xl">
             
          <h2 className="about-title text-[30px] sm:text-[36px] lg:text-[44px] font-semibold text-[var(--text-primary)] leading-[1.15] tracking-tight">
            Most people stay silent.{" "}
            <span className="bg-gradient-to-r from-[var(--accent-core)] to-[var(--accent-aurora)] bg-clip-text text-transparent">
              Not because they don’t care —
            </span>{" "}
            but because they don’t feel safe.
          </h2>

          <p className="about-subtext text-[16px] sm:text-[18px] text-[var(--text-secondary)] leading-relaxed">
            SpeakUp was built to change that. A system where anyone can raise concerns without fear,
            track progress transparently, and see real action happen.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6">
          
          <div className="about-stat group p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl text-center transition hover:-translate-y-2">
            <div className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] group-hover:scale-110 transition">
              72%
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Issues go unreported
            </p>
          </div>

          <div className="about-stat group p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl text-center transition hover:-translate-y-2">
            <div className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] group-hover:scale-110 transition">
              50K+
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Voices empowered
            </p>
          </div>

          <div className="about-stat group p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl text-center transition hover:-translate-y-2 col-span-2 sm:col-span-1">
            <div className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] group-hover:scale-110 transition">
              92%
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Resolution success
            </p>
          </div>

        </div>

        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          
          <div className="about-card group relative p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2">
            
            <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-[var(--accent-core)]/10 text-[var(--accent-core)] mb-4 transition group-hover:scale-110">
              <ShieldCheck size={20} />
            </div>

            <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">
              Safe by design
            </h3>

            <p className="text-[14px] text-[var(--text-muted)]">
              Every report is protected with strong privacy and security principles.
            </p>

            <div className="absolute inset-0 rounded-[var(--radius-lg)] border border-transparent group-hover:border-[var(--accent-core)]/20 transition" />
          </div>

          <div className="about-card group relative p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2">
            
            <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-[var(--accent-core)]/10 text-[var(--accent-core)] mb-4 transition group-hover:scale-110">
              <EyeOff size={20} />
            </div>

            <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">
              Anonymous first
            </h3>

            <p className="text-[14px] text-[var(--text-muted)]">
              Users can raise concerns without exposing identity or risking backlash.
            </p>

            <div className="absolute inset-0 rounded-[var(--radius-lg)] border border-transparent group-hover:border-[var(--accent-core)]/20 transition" />
          </div>

          <div className="about-card group relative p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2">
            
            <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-[var(--accent-core)]/10 text-[var(--accent-core)] mb-4 transition group-hover:scale-110">
              <MessageSquare size={20} />
            </div>

            <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">
              Clear resolution
            </h3>

            <p className="text-[14px] text-[var(--text-muted)]">
              Transparent communication ensures issues don’t disappear — they get solved.
            </p>

            <div className="absolute inset-0 rounded-[var(--radius-lg)] border border-transparent group-hover:border-[var(--accent-core)]/20 transition" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;