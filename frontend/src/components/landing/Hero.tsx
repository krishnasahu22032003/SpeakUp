import { ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate() ;

    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                }
            });

            tl.from(".hero-badge", {
                y: 30,
                opacity: 0,
                duration: 1.2,
            })

                .from(".hero-title", {
                    y: 60,
                    opacity: 0,
                    duration: 1.4,
                }, "-=0.6")

                .from(".hero-subtext", {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.2,
                }, "-=0.8")

                .from(".hero-buttons", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                }, "-=0.6")

                .from(".hero-stats > div", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                }, "-=0.6")

                .from(".hero-scroll", {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                }, "-=0.5");

            gsap.to(".hero-glow", {
                y: 60,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden pt-24"
        >

            <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[140px] opacity-80" />

            <div className="hero-glow absolute top-[45%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[var(--accent-core)] opacity-20 blur-[160px] rounded-full" />

            <div className="max-w-[1000px] w-full mx-auto text-center flex flex-col items-center gap-7">

                <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-aurora)] animate-pulse" />
                    <span className="text-sm text-[var(--text-secondary)] tracking-wide">
                        Empowering voices worldwide
                    </span>
                </div>

                <h1 className="hero-title text-[38px] sm:text-[48px] lg:text-[60px] leading-[1.05] tracking-tight text-[var(--text-primary)]">
                    SpeakUp.{" "}
                    <span className="bg-gradient-to-r from-[var(--accent-core)] via-[var(--accent-aurora)] to-[var(--accent-core)] bg-clip-text text-transparent">
                        Be Heard.
                    </span>
                </h1>

                <p className="hero-subtext text-[16px] sm:text-[18px] text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                    Most problems stay hidden because people don’t feel safe speaking up.{" "}
                    <span className="text-[var(--text-primary)] font-medium">
                        SpeakUp creates that safety.
                    </span>{" "}
                    A secure platform where voices are protected, heard, and acted upon.
                </p>

                <p className="hero-subtext text-[14px] sm:text-[15px] text-[var(--text-muted)] max-w-lg">
                    Built for trust. Designed for accountability. Used to create real change.
                </p>

                <div className="hero-buttons flex flex-wrap justify-center gap-4 pt-2">
                    <Button onClick={()=>{navigate("/complaint")}}>Raise Voice</Button>
                    <Button variant="secondary" onClick={()=>{navigate("/signup")}}>Sign Up</Button>
                </div>

                <div className="hero-stats flex flex-wrap justify-center gap-10 pt-5">

                    <div className="flex flex-col items-center group">
                        <span className="text-[28px] sm:text-[32px] font-semibold text-[var(--text-primary)] transition group-hover:scale-110">
                            50K+
                        </span>
                        <span className="text-sm text-[var(--text-muted)]">
                            Voices Raised
                        </span>
                    </div>

                    <div className="flex flex-col items-center group">
                        <span className="text-[28px] sm:text-[32px] font-semibold text-[var(--text-primary)] transition group-hover:scale-110">
                            92%
                        </span>
                        <span className="text-sm text-[var(--text-muted)]">
                            Resolution Rate
                        </span>
                    </div>

                    <div className="flex flex-col items-center group">
                        <span className="text-[28px] sm:text-[32px] font-semibold text-[var(--text-primary)] transition group-hover:scale-110">
                            10x
                        </span>
                        <span className="text-sm text-[var(--text-muted)]">
                            Faster Response
                        </span>
                    </div>

                </div>

                <div className="hero-scroll pt-5 flex justify-center items-center">
                    <a
                        href="#features"
                        className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-muted)] transition-all duration-300 hover:scale-110 hover:text-[var(--text-primary)] hover:shadow-[var(--shadow-soft)]"
                    >
                        <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1 animate-[float_3s_ease-in-out_infinite]" />
                        <span className="absolute inset-0 rounded-full bg-[var(--accent-core)] opacity-0 group-hover:opacity-10 blur-md transition" />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Hero;