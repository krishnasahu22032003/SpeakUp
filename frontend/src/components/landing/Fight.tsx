import { ShieldAlert, Zap, Gavel } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Fight = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" }
      });

      tl.from(".fight-left", {
        x: -60,
        opacity: 0,
        duration: 1.2,
      })

      .from(".fight-step", {
        x: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.25,
      }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="fight"
      className="relative py-28 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <div className="fight-left flex flex-col gap-6">
          
          <h2 className="text-[30px] sm:text-[36px] lg:text-[44px] font-semibold text-[var(--text-primary)] leading-[1.15] tracking-tight">
            Silence protects problems.{" "}
            <span className="bg-gradient-to-r from-[var(--accent-core)] to-[var(--accent-aurora)] bg-clip-text text-transparent">
              Action solves them.
            </span>
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[var(--text-secondary)] leading-relaxed max-w-lg">
            SpeakUp is not just about reporting issues — it’s about taking action. 
            From raising a concern to ensuring resolution, every step is designed 
            to create real impact.
          </p>

          <p className="text-sm text-[var(--text-muted)] max-w-md">
            No delays. No silence. No ignored voices.
          </p>

        </div>


        <div className="relative flex flex-col gap-10">

          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[var(--border-subtle)]" />

          <div className="fight-step flex items-start gap-6 relative">
            
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent-core)]/10 text-[var(--accent-core)] z-10">
              <ShieldAlert size={18} />
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                Raise the issue
              </h3>
              <p className="text-[14px] text-[var(--text-muted)]">
                Report concerns instantly with full protection and anonymity.
              </p>
            </div>

          </div>

          <div className="fight-step flex items-start gap-6 relative">
            
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent-core)]/10 text-[var(--accent-core)] z-10">
              <Zap size={18} />
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                Trigger action
              </h3>
              <p className="text-[14px] text-[var(--text-muted)]">
                Notify the right people and initiate immediate response.
              </p>
            </div>

          </div>

          <div className="fight-step flex items-start gap-6 relative">
            
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent-core)]/10 text-[var(--accent-core)] z-10">
              <Gavel size={18} />
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                Ensure resolution
              </h3>
              <p className="text-[14px] text-[var(--text-muted)]">
                Track progress until the issue is fully resolved.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Fight;