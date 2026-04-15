import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../ThemeContext";
import { Sun, Moon, User, LogOut, Settings } from "lucide-react";
import gsap from "gsap";
import { UserSignOut } from "../../lib/services/AuthService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import UpdateProfileModal from "./UpdateProfileModal";

const quotes = [
  "Every voice deserves to be heard.",
  "Silence hides problems. SpeakUp reveals them.",
  "Your report can create real change.",
  "Small voices. Big impact.",
];

export default function AdminDashboardHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading , setLoading]= useState<boolean>(false);
  const [ismodalOpen , setismodalOpen] =  useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      })
        .call(() => {
          setIndex((prev) => (prev + 1) % quotes.length);
        })
        .fromTo(
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
  
 async function handleSignOut(){
   setLoading(true);

   try{
    
   await UserSignOut();

   toast.success("User SignOut Success");
    
   setTimeout(() => {
    navigate("/signin")
   }, 1500);
   }catch(err){
   console.log((err as Error).message);
   toast.error((err as Error).message || "Error while signing Out");
   }finally{
    setLoading(false);
   }
  }
  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-inner">
          <div className="logo">
            <a href="/" className="-mr-2">
              <img src="/logo.png" alt="SpeakUp Logo" />
            </a>
            <span>SpeakUp</span>
          </div>

          <div className="quote" ref={quoteRef}>
            {quotes[index]}
          </div>

          <div className="actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="user-wrapper" ref={dropdownRef}>
              <button
                className={`user-btn ${open ? "active" : ""}`}
                onClick={() => setOpen(!open)}
              >
                <User size={18} />
              </button>

              <div className={`dropdown ${open ? "show" : ""}`}>
                
                <button className="dropdown-item danger" onClick={handleSignOut}>
                  <LogOut size={16} />
                  <span>{loading ? "Signing Out" : "SignOut"}</span>
                </button>
              </div>
            </div>
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
          margin-right: -20px;
        }

        .logo span {
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-toggle, .user-btn {
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
          position: relative;
        }

        .theme-toggle:hover, .user-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-soft);
        }

        .user-btn.active {
          box-shadow: 0 0 0 2px rgba(100,150,255,0.3), var(--shadow-soft);
        }

        .user-wrapper {
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: 52px;
          right: 0;
          min-width: 200px;
          padding: 8px;
          border-radius: 16px;
          background: var(--bg-glass);
          backdrop-filter: blur(24px);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          opacity: 0;
          transform: translateY(10px) scale(0.96);
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        .dropdown.show {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dropdown-item:hover {
          background: rgba(255,255,255,0.06);
          transform: translateX(4px);
        }

        .dropdown-item.danger {
          color: #ff4d6d;
        }

        .dropdown-item.danger:hover {
          background: rgba(255,77,109,0.12);
        }
      `}</style>
    </>
  );
}