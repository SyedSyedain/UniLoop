"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { AppLogo } from "@/components/brand/AppLogo";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { AUTH_HEADINGS, AUTH_TABS, CALLBACK_ERRORS } from "@/lib/auth/constants";
import type { AuthMode } from "@/types/auth";

interface FormPanelProps {
  callbackError?: string;
}

export function FormPanel({ callbackError }: FormPanelProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const { title, subtitle } = AUTH_HEADINGS[mode];

  const errorMessage = callbackError
    ? (CALLBACK_ERRORS[callbackError] ?? "Something went wrong. Please try again.")
    : null;

  return (
    <section className="form-panel" aria-label="Authentication form">
      <div className="mobile-logo">
        <AppLogo compact />
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            role="alert"
            className="auth-alert"
          >
            <AlertCircle size={15} className="auth-alert__icon" aria-hidden="true" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div role="tablist" aria-label="Authentication mode" className="tab-bar">
        {AUTH_TABS.map(({ mode: tabMode, label }) => (
          <button
            key={tabMode}
            type="button"
            role="tab"
            aria-selected={mode === tabMode}
            onClick={() => setMode(tabMode)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                setMode((prev) => (prev === "login" ? "signup" : "login"));
              }
            }}
            className={`tab-btn ${mode === tabMode ? "tab-btn--active" : "tab-btn--inactive"}`}
          >
            {mode === tabMode && (
              <motion.span
                layoutId="tab-pill"
                className="tab-indicator"
                aria-hidden="true"
                transition={{ type: "spring", bounce: 0.2, duration: 0.38 }}
              />
            )}
            <span className="tab-label">{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`h-${mode}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
        >
          <h1 className="form-heading">{title}</h1>
          <p className="form-subheading">{subtitle}</p>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`f-${mode}`}
          initial={{ opacity: 0, x: mode === "signup" ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mode === "signup" ? -16 : 16 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {mode === "login" ? (
            <LoginForm onSwitchToSignup={() => setMode("signup")} />
          ) : (
            <SignupForm onSwitchToLogin={() => setMode("login")} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
