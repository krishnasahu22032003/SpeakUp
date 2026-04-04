import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useTheme } from "../../ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-inner">

          <div className="logo">
            <img src="/logo.png" alt="SpeakUp Logo" />
            <span>SpeakUp</span>
          </div>

          <nav className="nav">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#fight">Fight</a>
            <a href="#testimonials">Testimonials</a>
          </nav>

          <div className="actions">

            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="desktop-buttons">
              <Button variant="secondary">Login</Button>

            </div>

            <button
              className="menu-btn"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">

          <div className="mobile-header">
            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-links">
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#fight" onClick={() => setOpen(false)}>Fight</a>
            <a href="#testimonials" onClick={() => setOpen(false)}>Testimonials</a>
          </div>

          <div className="mobile-actions">
            <Button variant="secondary">Login</Button>
            <Button>Report Now</Button>
          </div>

        </div>
      )}

      <style>{`
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
          border-bottom: 1px solid var(--border-subtle);
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

     .mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 200;

  padding: 90px 20px 20px;

  background: rgba(10, 15, 28, 0.95);
  backdrop-filter: blur(20px);

  display: flex;
  flex-direction: column;
  gap: 20px;

  animation: slideDown 0.3s ease;
}
  .mobile-header {
  position: absolute;
  top: 20px;
  right: 20px;
}

.close-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--bg-glass);
  backdrop-filter: blur(12px);

  color: var(--text-primary);
  cursor: pointer;

  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-soft);
}

/* links section */
.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
}

.mobile-links a {
  font-size: 18px;
  color: var(--text-primary);
  text-decoration: none;
}

/* buttons section */
.mobile-actions {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

        .mobile-menu a {
          text-decoration: none;
          color: var(--text-primary);
          font-size: 16px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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