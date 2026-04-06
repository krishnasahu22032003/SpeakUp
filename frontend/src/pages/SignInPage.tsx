"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignIn } from "../lib/services/AuthService";
import { toast } from "sonner";
import { CheckUserStore } from "../store/useAuthStore";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const fade = {
  hidden: { opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

export default function SpeakUpSignin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const checkAuth = CheckUserStore((state) => state.checkAuth);

  async function handleSignIn() {
    try {
      setLoading(true);

      await UserSignIn({
        email,
        password
      });

      await checkAuth();

      toast.success("Login success");

      navigate("/user-dashboard");

    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "Error While Login");
    } finally {
      setLoading(false);
    }
  }

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <main className="relative min-h-screen flex items-center justify-center px-5">
      <div className="bg-effect" />

      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease }}
        className="glass w-full max-w-md px-8 py-9"
      >
        <motion.div variants={container} initial="hidden" animate="show">

          <motion.div variants={fade} className="text-center mb-8">
            <h1 className="text-[1.6rem] font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Sign in to continue to SpeakUp
            </p>
          </motion.div>

          <motion.form variants={container} className="space-y-5">

            <motion.div variants={fade}>
              <label className="text-[12px] text-[var(--text-muted)]">
                Email
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-11"
                  placeholder="you@speakup.app"
                />
              </div>
            </motion.div>

            <motion.div variants={fade}>
              <label className="text-[12px] text-[var(--text-muted)]">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-11 pr-11"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={fade} className="pt-3">
              <motion.button
                whileHover={isFormValid ? { scale: 1.03 } : {}}
                whileTap={isFormValid ? { scale: 0.96 } : {}}
                onClick={handleSignIn}
                className={`btn-root btn-primary w-full h-12 ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={loading || !isFormValid}
              >
                <span className="btn-content">{loading ? "Please Wait..." : "Sign In"}</span>
                <span className="btn-glow" />
                <span className="btn-highlight" />
              </motion.button>
            </motion.div>

          </motion.form>

          <motion.p
            variants={fade}
            className="mt-7 text-center text-sm text-[var(--text-muted)]"
          >
            Don’t have an account?{" "}
            <span className="text-[var(--text-primary)] hover:underline cursor-pointer" onClick={() => { navigate("/signup") }}>
              Sign up
            </span>
          </motion.p>

        </motion.div>
      </motion.section>
    </main>
  );
}