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

const waveformHeights = [14, 26, 18, 34, 22, 40, 16, 30, 20, 28, 12, 24];

const Hero = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const barsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-badge", { y: 24, opacity: 0, duration: 0.9 })
                .from(".hero-title-line", { y: 46, opacity: 0, duration: 1.1, stagger: 0.12 }, "-=0.5")
                .from(".hero-subtext", { y: 26, opacity: 0, duration: 0.9 }, "-=0.6")
                .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(".hero-stat", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4")
                .from(".hero-panel", { y: 40, opacity: 0, duration: 1, scale: 0.97 }, "-=0.9")
                .from(".hero-step-line", { scaleY: 0, transformOrigin: "top", duration: 0.9 }, "-=0.6")
                .from(".hero-step", { x: -16, opacity: 0, duration: 0.6, stagger: 0.18 }, "-=0.7")
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
            className="relative w-full min-h-screen flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden pt-28 pb-16"
        >
            <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[140px] opacity-80" />
            <div className="hero-glow absolute top-[40%] left-[20%] w-[420px] h-[420px] bg-[var(--accent-core)] opacity-20 blur-[160px] rounded-full -z-10" />
            <div className="hero-glow absolute bottom-[10%] right-[10%] w-[360px] h-[360px] bg-[var(--accent-aurora)] opacity-15 blur-[150px] rounded-full -z-10" />

            <div className="max-w-[1280px] w-full mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

                <div className="flex flex-col items-start text-left gap-7">

                    <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] font-mono text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-aurora)]" />
                        End-to-end encrypted reporting
                    </div>

                    <h1 className="text-[40px] sm:text-[54px] lg:text-[68px] leading-[1.02] tracking-tight text-[var(--text-primary)] font-medium">
                        <span className="hero-title-line block">The truth deserves</span>
                        <span className="hero-title-line block font-light italic">
                            a{" "}
                            <span className="not-italic font-semibold bg-gradient-to-r from-[var(--accent-core)] via-[var(--accent-aurora)] to-[var(--accent-core)] bg-clip-text text-transparent">
                                witness.
                            </span>
                        </span>
                    </h1>

                    <p className="hero-subtext text-[16px] sm:text-[18px] text-[var(--text-secondary)] max-w-[480px] leading-relaxed">
                        Most problems stay hidden because people don't feel safe speaking up.
                        SpeakUp gives every voice a protected, verifiable path from report to resolution.
                    </p>

                    <div className="hero-buttons flex flex-wrap gap-4 pt-1">
                        <Button onClick={() => navigate("/complaint")}>
                            Raise Voice
                        </Button>
                        <Button variant="secondary" onClick={() => navigate("/signup")}>
                            Sign Up
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-x-10 gap-y-6 pt-6 w-full border-t border-[var(--border-subtle)] mt-2">
                        <div className="hero-stat flex flex-col gap-0.5">
                            <span className="text-[26px] font-semibold text-[var(--text-primary)]">50K+</span>
                            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Voices raised</span>
                        </div>
                        <div className="hero-stat flex flex-col gap-0.5">
                            <span className="text-[26px] font-semibold text-[var(--text-primary)]">92%</span>
                            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Resolution rate</span>
                        </div>
                        <div className="hero-stat flex flex-col gap-0.5">
                            <span className="text-[26px] font-semibold text-[var(--text-primary)]">10x</span>
                            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Faster response</span>
                        </div>
                    </div>
                </div>

                <div className="hero-panel relative w-full rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-2xl shadow-[var(--shadow-soft)] p-6 sm:p-8">

                    <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)]">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)] opacity-40" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)] opacity-40" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-aurora)]" />
                        </div>
                        <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)]">
                            Case #48213
                        </span>
                    </div>

                    <div className="flex items-end gap-1.5 h-16 py-6">
                        {waveformHeights.map((h, i) => (
                            <span
                                key={i}
                                ref={(el) => (barsRef.current[i] = el)}
                                style={{ height: `${h}px`, transformOrigin: "bottom" }}
                                className="w-1.5 rounded-full bg-gradient-to-t from-[var(--accent-core)] to-[var(--accent-aurora)] opacity-80"
                            />
                        ))}
                    </div>

                    <div className="relative flex flex-col gap-6 pt-4">
                        <span className="hero-step-line absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
                        {timelineSteps.map((step) => (
                            <div key={step.label} className="hero-step relative flex items-start gap-4">
                                <span className="relative z-10 mt-1 w-[15px] h-[15px] rounded-full border-2 border-[var(--accent-aurora)] bg-[var(--bg-glass)] flex-shrink-0" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium text-[var(--text-primary)]">{step.label}</span>
                                    <span className="text-xs text-[var(--text-muted)]">{step.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center"
                
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