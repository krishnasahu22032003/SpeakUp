import { Quote, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    message:
      "I reported something I was scared to even talk about. For the first time, I felt heard — without risking anything.",
  },
  {
    message:
      "The ability to stay anonymous gave me the confidence to speak up. That alone changed everything.",
  },
  {
    message:
      "Usually these things get ignored. Here, I could actually track progress and see action being taken.",
  },
  {
  message:
    "I was hesitant at first, but staying anonymous made it easy to speak up. The process felt safe from start to finish.",
},
{
  message:
    "This platform gave me a way to raise serious concerns without fear. That kind of security is rare.",
},
{
  message:
    "What stood out was the transparency. Even without revealing who I was, I could see real progress happening.",
}
];

const Testimonials = () => {
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

      tl.from(".test-title", {
        y: 60,
        opacity: 0,
        duration: 1.4,
      })

      .from(".test-subtext", {
        y: 40,
        opacity: 0,
        duration: 1.2,
      }, "-=0.8")

      .fromTo(".test-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.25,
        },
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative py-22 px-6 overflow-hidden"
    >
      
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center gap-14">
        
        {/* heading */}
        <div className="max-w-2xl flex flex-col gap-4">
          
          <h2 className="test-title text-[30px] sm:text-[36px] lg:text-[44px] font-semibold text-[var(--text-primary)] tracking-tight leading-[1.15]">
            Real voices.{" "}
            <span className="bg-gradient-to-r from-[var(--accent-core)] to-[var(--accent-aurora)] bg-clip-text text-transparent">
              Protected identities.
            </span>
          </h2>

          <p className="test-subtext text-[16px] sm:text-[18px] text-[var(--text-secondary)]">
            We don’t show names or faces — that’s the point.  
            What matters is the voice, not the identity.
          </p>

        </div>

        {/* testimonials */}
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card group relative p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-strong)]"
            >
              
              {/* glow */}
              <div className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top,rgba(99,110,246,0.15),transparent_70%)]" />

              {/* quote icon */}
              <Quote className="text-[var(--accent-core)] mb-4 opacity-80" size={22} />

              {/* message */}
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                “{t.message}”
              </p>

              {/* anonymous label */}
              <div className="mt-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <ShieldCheck size={14} className="text-[var(--accent-core)]" />
                Anonymous • Identity protected
              </div>

              {/* border glow */}
              <div className="absolute inset-0 rounded-[var(--radius-lg)] border border-transparent group-hover:border-[var(--accent-core)]/20 transition" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;