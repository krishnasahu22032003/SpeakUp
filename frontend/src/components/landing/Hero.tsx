import { ChevronDown, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const timelineSteps = [
    { label: "Report filed", detail: "Identity encrypted on submission" },
    { label: "Case reviewed", detail: "Assigned within 24 hours" },
    { label: "Resolved", detail: "Outcome shared back to you" },
];

const waveformHeights = [10, 18, 28, 16, 34, 22, 40, 24, 32, 14, 26, 12];

const Hero = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-badge", { y: 24, opacity: 0, duration: 0.9 })
                .from(".hero-title-line", { y: 46, opacity: 0, duration: 1.1, stagger: 0.12 }, "-=0.5")
                .from(".hero-subtext", { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
                .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(".hero-stat", { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4")
                .from(".hero-panel", { y: 36, opacity: 0, duration: 1, scale: 0.97 }, "-=0.35")
                .from(".hero-step-line-h", { scaleX: 0, transformOrigin: "left", duration: 0.8 }, "-=0.55")
                .from(".hero-step-line-v", { scaleY: 0, transformOrigin: "top", duration: 0.8 }, "<")
                .from(".hero-step", { y: 14, opacity: 0, duration: 0.6, stagger: 0.16 }, "-=0.55")
                .from(".hero-scroll", { opacity: 0, y: 16, duration: 0.8 }, "-=0.2");

            gsap.to(".hero-glow", {
                y: 50,
                duration: 9,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            barsRef.current.forEach((bar, i) => {
                if (!bar) return;
                gsap.to(bar, {
                    scaleY: 0.4 + Math.random() * 0.9,
                    duration: 0.6 + Math.random() * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.05,
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-10 overflow-hidden pt-32 pb-20"
        >
            <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[140px] opacity-80" />
            <div className="hero-glow absolute top-[38%] left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[var(--accent-core)] opacity-[0.16] blur-[170px] rounded-full -z-10" />
            <div className="hero-glow absolute top-[55%] left-[62%] w-[380px] h-[380px] bg-[var(--accent-aurora)] opacity-[0.14] blur-[160px] rounded-full -z-10" />

            <div className="relative w-full max-w-[880px] mx-auto flex flex-col items-center text-center">

                <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] font-mono text-[11px] sm:text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-aurora)]" />
                    End-to-end encrypted reporting
                </div>

                <h1 className="text-balance mt-8 text-[40px] sm:text-[52px] lg:text-[70px] leading-[1.05] tracking-tight text-[var(--text-primary)] font-medium">
                    <span className="hero-title-line block">The truth deserves</span>
                    <span className="hero-title-line block font-light italic">
                        a{" "}
                        <span className="not-italic font-semibold bg-gradient-to-r from-[var(--accent-core)] via-[var(--accent-aurora)] to-[var(--accent-core)] bg-clip-text text-transparent">
                            witness.
                        </span>
                    </span>
                </h1>

                <p className="hero-subtext text-balance mt-7 text-[14px] sm:text-[16px] text-[var(--text-secondary)] max-w-[700px] leading-relaxed">
                    Most problems stay hidden because people don't feel safe speaking up.
                    SpeakUp gives every voice a protected, verifiable path from report to resolution.
                </p>

                <div className="hero-buttons flex flex-wrap justify-center gap-4 mt-10">
                    <Button onClick={() => navigate("/complaint")}>
                        Raise Voice
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                </div>

                <div className="flex items-center justify-center divide-x divide-[var(--border-subtle)] mt-14">
                    <div className="hero-stat flex flex-col items-center gap-1 px-8 first:pl-0 last:pr-0">
                        <span className="text-[26px] sm:text-[30px] font-semibold text-[var(--text-primary)]">50K+</span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Voices raised</span>
                    </div>
                    <div className="hero-stat flex flex-col items-center gap-1 px-8">
                        <span className="text-[26px] sm:text-[30px] font-semibold text-[var(--text-primary)]">92%</span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Resolution rate</span>
                    </div>
                    <div className="hero-stat flex flex-col items-center gap-1 px-8 first:pl-0 last:pr-0">
                        <span className="text-[26px] sm:text-[30px] font-semibold text-[var(--text-primary)]">10x</span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Faster response</span>
                    </div>
                </div>

                <div className="hero-panel relative w-full max-w-[640px] mt-16 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-2xl shadow-[var(--shadow-soft)] p-6 sm:p-8">

                    <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)]">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)] opacity-40" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)] opacity-40" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-aurora)]" />
                        </div>
                        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--text-muted)]">
                            Case #48213
                        </span>
                    </div>

                    <div className="flex items-end justify-center gap-1.5 h-14 py-6">
                        {waveformHeights.map((h, i) => (
                            <span
                                key={i}
                                ref={(el) => {barsRef.current[i] = el}}
                                style={{ height: `${h}px`, transformOrigin: "bottom" }}
                                className="w-1.5 rounded-full bg-gradient-to-t from-[var(--accent-core)] to-[var(--accent-aurora)] opacity-80"
                            />
                        ))}
                    </div>

                    <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-4">
                        <span className="hero-step-line-h hidden sm:block absolute top-[13px] left-[16.6%] right-[16.6%] h-px bg-[var(--border-subtle)]" />
                        <span className="hero-step-line-v sm:hidden absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
                        {timelineSteps.map((step) => (
                            <div
                                key={step.label}
                                className="hero-step relative flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 sm:text-center"
                            >
                                <span className="relative z-10 mt-0.5 sm:mt-0 w-[15px] h-[15px] rounded-full border-2 border-[var(--accent-aurora)] bg-[var(--bg-glass)] flex-shrink-0" />
                               <div className="flex flex-col gap-0.5 text-left sm:text-center">
                                    <span className="text-sm font-medium text-[var(--text-primary)]">{step.label}</span>
                                    <span className="text-xs text-[var(--text-muted)]">{step.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center items-center">
                <a
                    href="#features"
                    className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text-muted)] transition-all duration-300 hover:scale-110 hover:text-[var(--text-primary)] hover:shadow-[var(--shadow-soft)]"
                >
                    <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                    <span className="absolute inset-0 rounded-full bg-[var(--accent-core)] opacity-0 group-hover:opacity-10 blur-md transition" />
                </a>
            </div>
        </section>
    );
};

export default Hero;