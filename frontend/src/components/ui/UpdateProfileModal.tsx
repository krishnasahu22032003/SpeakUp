import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { UpdateUserDetails } from "../../lib/services/AuthService";
import { toast, Toaster } from "sonner";

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
        email.trim() !== "" ||
        username.trim() !== "" ||
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
        try {
            const payload: any = {};

            if (username.trim()) payload.username = username;
            if (email.trim()) payload.email = email;
            if (password.trim()) payload.password = password;

            await UpdateUserDetails(payload);

            toast.success("User detail Updated");

        } catch (err) {
            console.log((err as Error).message);
            toast.error((err as Error).message || "Error While Updating");
        } finally {
            setTimeout(() => {
                setLoading(false);
                onClose();
            }, 1200);
        }

    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-3 sm:px-0">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-xl"
            />

            <div
                ref={modalRef}
                className="
          relative z-10 w-[92%] sm:w-full max-w-md
          rounded-2xl
       bg-gradient-to-br from-[#0F1629]/95 via-[#141D35]/95 to-[#0B1220]/95
border border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          backdrop-blur-2xl
          p-5 sm:p-6 max-h-[90vh] overflow-y-auto overflow-hidden
        "
            >
                <div className="absolute inset-0 pointer-events-none rounded-2xl">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2f3fa8]/25 blur-3xl rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#166a5e]/25 blur-3xl rounded-full" />
                </div>

                <div className="relative z-10 flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-foreground">
                            Update Profile
                        </h2>
                        <p className="text-xs sm:text-sm text-muted">
                            Keep your information up to date
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
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
               bg-[#0B1220]/80 border border-white/10
                text-sm text-foreground
                outline-none
                transition-all duration-300

                focus:border-accent-core
                focus:ring-2 focus:ring-accent-core/20
              "
                            placeholder="Update email (leave blank to keep current)"
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
               bg-[#0B1220]/80 border border-white/10
                text-sm text-foreground
                outline-none
                transition-all duration-300

                focus:border-accent-core
                focus:ring-2 focus:ring-accent-core/20
              "
                           placeholder="Update username (leave blank to keep current)"
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
               bg-[#0B1220]/80 border border-white/10
                text-sm text-foreground
                outline-none
                transition-all duration-300

                focus:border-accent-core
                focus:ring-2 focus:ring-accent-core/20
              "
                           placeholder="Update password (leave blank to keep current)"
                        />
                        <p className="text-[11px] text-muted">
                            Must be at least 8 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`
                cursor-pointer
              w-full h-11 rounded-xl font-medium
              bg-accent-core text-white
              transition-all duration-300
              active:scale-[0.97]
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
            cursor-pointer
              w-full h-11 rounded-xl mt-2
           
              text-sm text-muted
border border-white/10
bg-white/[0.02]
hover:bg-white/[0.06]
active:scale-[0.97]
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