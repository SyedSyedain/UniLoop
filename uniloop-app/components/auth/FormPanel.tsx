"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { LoginForm }  from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import type { AuthMode } from "@/types/auth";

const TABS: { mode: AuthMode; label: string }[] = [
  { mode: "login",  label: "Sign In"         },
  { mode: "signup", label: "Create Account"  },
];

const HEADINGS: Record<AuthMode, { title: string; subtitle: string }> = {
  login: {
    title:    "Welcome back",
    subtitle: "Sign in to your account to continue",
  },
  signup: {
    title:    "Join Uniloop",
    subtitle: "Create your account and start saving today",
  },
};

export function FormPanel() {
  const [mode, setMode] = useState<AuthMode>("login");

  const { title, subtitle } = HEADINGS[mode];

  return (
    <section
      className="flex-1 flex flex-col justify-center p-8 lg:px-12 lg:py-10"
      aria-label="Authentication form"
    >
      {/* Mobile-only logo */}
      <div className="lg:hidden flex items-center gap-2 mb-7">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #D4A843, #C49332)",
            boxShadow: "0 0 16px rgba(212,168,67,0.4)",
          }}
        >
          <RefreshCw size={15} className="text-navy-950" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <span className="text-lg font-extrabold text-white tracking-tight">
          uni<span className="text-gold-500">loop</span>
        </span>
      </div>

      {/* Tab switcher */}
      <div
        role="tablist"
        aria-label="Authentication mode"
        className="flex bg-white/[0.04] border border-white/[0.07] rounded-2xl p-1 mb-7"
      >
        {TABS.map(({ mode: m, label }) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className="relative flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200"
          >
            {mode === m && (
              <motion.span
                layoutId="auth-tab-indicator"
                className="absolute inset-0 rounded-xl"
                aria-hidden="true"
                style={{
                  background: "linear-gradient(135deg, #C49332, #D4A843, #E8BE55)",
                }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
              />
            )}
            <span
              className="relative z-10 transition-colors duration-200"
              style={{ color: mode === m ? "#040D1F" : "rgba(255,255,255,0.38)" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`heading-${mode}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{    opacity: 0, y:  6 }}
          transition={{ duration: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
            {title}
          </h1>
          <p className="text-sm text-white/36">{subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {/*
       * Signup has many fields, so we constrain the height and allow
       * the form to scroll internally on smaller screens.
       */}
      <div
        className={mode === "signup" ? "overflow-y-auto form-scroll max-h-[420px] pr-0.5" : ""}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`form-${mode}`}
            initial={{ opacity: 0, x: mode === "signup" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x: mode === "signup" ? -20 : 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
