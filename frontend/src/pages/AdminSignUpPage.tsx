"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AdminSignUp } from "../lib/services/AdminAuthService";

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



export default function AdminSignup() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const rules = [
    { label: "Uppercase", valid: /[A-Z]/.test(password) },
    { label: "Lowercase", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /\d/.test(password) },
    { label: "Symbol", valid: /[^A-Za-z0-9]/.test(password) },
  ];


  const isPasswordValid = rules.every(rule => rule.valid);

  async function handleSignUp() {

    if (!isPasswordValid) {
      toast.error("Please complete all password requirements");
      return;
    }

    try {
      setLoading(true);

      const admin = await AdminSignUp({
        username,
        email,
        password
      });

      toast.success("SingUp success");
      setTimeout(() => {
        navigate("/admin/signin");
      }, 1000);
      console.log("user Created ", admin);

    } catch (err: any) {
      toast.error(err.message || "SignUp Failed");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

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
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Join SpeakUp As A Admin
            </p>
          </motion.div>

          <motion.form variants={container} className="space-y-5">

            <motion.div variants={fade}>
              <label className="text-[12px] text-[var(--text-muted)]">
                Full Name
              </label>
              <div className="relative mt-2">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="input pl-11"
                  placeholder="John Doe"
                />
              </div>
            </motion.div>

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
                  value={password}
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

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                {rules.map((rule) => (
                  <motion.div
                    key={rule.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 text-[11px]"
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${rule.valid
                        ? "bg-[var(--accent-core)] scale-110 shadow"
                        : "bg-[var(--border-subtle)]"
                        }`}
                    />
                    <span
                      className={`transition ${rule.valid
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                        }`}
                    >
                      {rule.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fade}>
              <label className="text-[12px] text-[var(--text-muted)]">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type={showConfirm ? "text" : "password"}
                  className="input pl-11 pr-11"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={fade} className="pt-3">
              <motion.button
                whileHover={isPasswordValid ? { scale: 1.03 } : {}}
                whileTap={isPasswordValid ? { scale: 0.96 } : {}}
                disabled={!isPasswordValid || loading}
                onClick={handleSignUp}
                className={`btn-root btn-primary w-full h-12 ${(!isPasswordValid || loading)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
              >
                <span className="btn-content">{loading ? "Creating..." : "Create Account"}</span>
                <span className="btn-glow" />
                <span className="btn-highlight" />
              </motion.button>
            </motion.div>

          </motion.form>

          <motion.p
            variants={fade}
            className="mt-7 text-center text-sm text-[var(--text-muted)]"
          >
            Already have an account?{" "}
            <span className="text-[var(--text-primary)] hover:underline cursor-pointer" onClick={() => { navigate("/signin") }}>
              Sign in
            </span>
          </motion.p>

        </motion.div>
      </motion.section>
    </main>
  );
}
