"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedInputProps {
  icon:          React.ReactNode;
  label:         string;
  type?:         string;
  value:         string;
  onChange:      (value: string) => void;
  error?:        string;
  rightSlot?:    React.ReactNode;
  autoComplete?: string;
}

export function AnimatedInput({
  icon,
  label,
  type         = "text",
  value,
  onChange,
  error,
  rightSlot,
  autoComplete = "off",
}: AnimatedInputProps) {
  const inputId = useId();
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <div>
      {/*
       * .input-field owns all border/background/shadow state via CSS :focus-within.
       * Framer Motion only animates layout (position + font-size) on the label.
       * No JS-driven !important overrides anywhere.
       */}
      <div className={`input-field${error ? " input-field--error" : ""}`}>
        <span className="input-icon">{icon}</span>

        <div className="input-body">
          <motion.label
            htmlFor={inputId}
            className="input-label"
            animate={{
              top:      isLifted ? "6px"  : "50%",
              y:        isLifted ? "0%"   : "-50%",
              fontSize: isLifted ? "10px" : "14px",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {label}
          </motion.label>

          <input
            id={inputId}
            type={type}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="input-native"
          />
        </div>

        {rightSlot && <span className="input-right">{rightSlot}</span>}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="input-error-msg"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
