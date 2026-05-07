"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";
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

const CALLBACK_ERRORS: Record<string, string> = {
  callback_error: "Your confirmation link has expired or is invalid. Please sign up again or request a new link.",
};

interface FormPanelProps {
  callbackError?: string;
}

export function FormPanel({ callbackError }: FormPanelProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const { title, subtitle } = HEADINGS[mode];

  const errorMessage = callbackError
    ? (CALLBACK_ERRORS[callbackError] ?? "Something went wrong. Please try again.")
    : null;

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

      {/* Callback error banner — shown when email confirmation fails */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            role="alert"
            style={{
              display:      "flex",
              alignItems:   "flex-start",
              gap:          "0.625rem",
              padding:      "0.75rem 1rem",
              borderRadius: "0.75rem",
              background:   "#FEF2F2",
              border:       "1px solid #FECACA",
              marginBottom: "1.25rem",
              fontSize:     "0.8125rem",
              color:        "#991B1B",
              lineHeight:   1.55,
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: "1px", color: "#EF4444" }} aria-hidden="true" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab switcher — arrow keys cycle between tabs (ARIA tablist pattern) */}
      <div role="tablist" aria-label="Authentication mode" className="tab-bar">
        {TABS.map(({ mode: m, label }) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                setMode((prev) => (prev === "login" ? "signup" : "login"));
              }
            }}
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

      {/* Form area — no overflow constraint so SchoolSelect dropdown isn't clipped */}
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

    </section>
  );
}
