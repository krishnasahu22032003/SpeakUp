import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../ThemeContext";
import { Sun, Moon } from "lucide-react";
import gsap from "gsap";

const quotes = [
    "Every voice deserves to be heard.",
    "Silence hides problems. SpeakUp reveals them.",
    "Your report can create real change.",
    "Small voices. Big impact.",
];

export default function ComplaintHeader() {

    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const quoteRef = useRef(null);
useEffect(() => {
  const el = quoteRef.current;

  const interval = setInterval(() => {
    const tl = gsap.timeline();

    tl.to(el, {
      opacity: 0,
      y: -12,
      filter: "blur(8px)",
      duration: 0.5,
      ease: "power2.in",
    }).call(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }).fromTo(
      el,
      {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);
    return (
        <>
            <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
                <div className="header-inner">

                    <div className="logo">
                        <a href="/" className="-mr-2"><img src="/logo.png" alt="SpeakUp Logo" /></a>
                        <span>SpeakUp</span>
                    </div>

                    <div className="quote" ref={quoteRef}>
                        {quotes[index]}
                    </div>

                    <div className="actions">

                        <button className="theme-toggle" onClick={toggleTheme}>
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            <style>{`
            .quote {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  color: var(--text-muted);
  pointer-events: none;
  white-space: nowrap;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .quote {
    display: none;
  }
}
    .header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .header-scrolled {
          background: transparent;
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-soft);
        }

        .header-inner {
          max-width: 1180px;
          margin: auto;
          padding: 16px 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

    .logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 72px;
  height: 58px;
  object-fit: contain;
  margin-right: -20px; /* precise control */
}

.logo span {
  font-weight: 600;
  letter-spacing: -0.01em; /* tighter premium look */
}

        .nav {
          display: flex;
          gap: 28px;
        }

        .nav a {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 14px;
          transition: 0.3s;
        }

        .nav a:hover {
          color: var(--text-primary);
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .desktop-buttons {
          display: flex;
          gap: 10px;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);

          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-soft);
        }

        .menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

  .mobile-header {
  position: absolute;
  top: 20px;
  right: 20px;
}

.close-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-soft);
}

        @media (max-width: 900px) {
          .nav {
            display: none;
          }

          .desktop-buttons {
            display: none;
          }

          .menu-btn {
            display: block;
          }
        }
      `}</style>
        </>
    );
}