"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { LoginForm }  from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import type { AuthMode } from "@/types/auth";

const TABS: { mode: AuthMode; label: string }[] = [
  { mode: "login",  label: "Sign In"        },
  { mode: "signup", label: "Create Account" },
];

const HEADINGS: Record<AuthMode, { title: string; subtitle: string }> = {
  login: {
    title:    "Welcome back",
    subtitle: "Sign in to continue to your account",
  },
  signup: {
    title:    "Create your account",
    subtitle: "Join Uniloop and start buying or selling today",
  },
};

export function FormPanel() {
  const [mode, setMode] = useState<AuthMode>("login");
  const { title, subtitle } = HEADINGS[mode];

  return (
    <section className="form-panel" aria-label="Authentication form">

      {/* Mobile-only logo */}
      <div className="mobile-logo">
        <div
          className="brand-logo-mark"
          style={{ width: "1.875rem", height: "1.875rem", borderRadius: "0.5rem" }}
        >
          <RefreshCw size={14} color="#fff" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <span className="brand-logo-text" style={{ fontSize: "1rem" }}>uniloop</span>
      </div>

      {/* Tab switcher */}
      <div role="tablist" aria-label="Authentication mode" className="tab-bar">
        {TABS.map(({ mode: m, label }) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`tab-btn ${mode === m ? "tab-btn--active" : "tab-btn--inactive"}`}
          >
            {mode === m && (
              <motion.span
                layoutId="tab-pill"
                className="tab-indicator"
                aria-hidden="true"
                transition={{ type: "spring", bounce: 0.2, duration: 0.38 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`h-${mode}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0  }}
          exit={{    opacity: 0, y:  4  }}
          transition={{ duration: 0.18 }}
        >
          <h1 className="form-heading">{title}</h1>
          <p className="form-subheading">{subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {/* Form area */}
      <div className={mode === "signup" ? "overflow-y-auto form-scroll max-h-[420px] pr-0.5" : ""}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`f-${mode}`}
            initial={{ opacity: 0, x: mode === "signup" ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x: mode === "signup" ? -16 : 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {mode === "login" ? (
              <LoginForm  onSwitchToSignup={() => setMode("signup")} />
            ) : (
              <SignupForm onSwitchToLogin={()  => setMode("login")}  />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
