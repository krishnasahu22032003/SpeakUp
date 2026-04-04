import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-8 px-6 border-t border-[var(--border-subtle)]">
      
      <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center gap-2 text-center">
        
        <p className="text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} SpeakUp. All rights reserved.
        </p>

        <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
          Made with{" "}
          <Heart
            size={14}
            className="text-red-500 animate-pulse"
            fill="currentColor"
          />{" "}
          by Krishna
        </p>

      </div>
    </footer>
  );
};

export default Footer;