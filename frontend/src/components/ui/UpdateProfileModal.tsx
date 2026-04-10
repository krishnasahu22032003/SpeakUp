import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

type Props = {
  onClose: () => void;
};

export default function UpdateProfileModal({ onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    email.trim() !== "" &&
    username.trim() !== "" &&
    password.trim() !== "";

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1200);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xl"
      />

      <div
        ref={modalRef}
        className="
          relative z-10 w-full max-w-md
          rounded-2xl
          bg-surface-soft
          border border-border
          shadow-2xl
          backdrop-blur-2xl
          p-6 overflow-hidden
        "
      >
        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-core/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-calm/20 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Update Profile
            </h2>
            <p className="text-sm text-muted">
              Keep your information up to date
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                h-11 px-3 rounded-xl
                bg-white/5
                border border-border
                text-sm text-foreground
                outline-none
                transition-all duration-300

                focus:border-accent-core
                focus:ring-2 focus:ring-accent-core/20
              "
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                h-11 px-3 rounded-xl
                bg-white/5
                border border-border
                text-sm text-foreground
                outline-none
                transition-all duration-300

                focus:border-accent-core
                focus:ring-2 focus:ring-accent-core/20
              "
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                h-11 px-3 rounded-xl
                bg-white/5
                border border-border
                text-sm text-foreground
                outline-none
                transition-all duration-300

                focus:border-accent-core
                focus:ring-2 focus:ring-accent-core/20
              "
              placeholder="Enter new password"
            />
            <p className="text-[11px] text-muted">
              Must be at least 8 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`
              w-full h-11 rounded-xl font-medium
              bg-accent-core text-white
              transition-all duration-300

              ${loading ? "opacity-70 cursor-not-allowed" : ""}
              ${isValid ? "hover:shadow-lg hover:shadow-accent-core/30 active:scale-[0.98]" : "opacity-50 cursor-not-allowed"}
            `}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              w-full h-11 rounded-xl mt-2
              border border-border
              text-sm text-muted

              hover:bg-white/5
              transition
            "
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}