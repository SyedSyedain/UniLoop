"use client";

import { motion, type Variants } from "framer-motion";
import { RefreshCw, Check } from "lucide-react";
import type { Easing } from "framer-motion";

const FEATURES = [
  "Every listing quality-checked before it goes live",
  "Sellers keep 80% — school earns on every sale",
  "7-day hassle-free return on every order",
] as const;

const EASE: Easing = "easeOut";

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.45, ease: EASE },
  }),
};

export function BrandPanel() {
  return (
    <aside className="brand-panel" aria-label="About Uniloop">

      {/* Logo */}
      <div>
        <div className="brand-logo">
          <div className="brand-logo-mark">
            <RefreshCw size={16} color="#fff" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="brand-logo-text">uniloop</span>
        </div>
      </div>

      {/* Headline */}
      <div>
        <motion.h2
          className="brand-headline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        >
          Pre-loved<br />
          uniforms.<br />
          <span>Better prices.</span>
        </motion.h2>

        <motion.p
          className="brand-subtext"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
        >
          A peer-to-peer marketplace connecting families within the same school
          to buy and sell uniforms their children have outgrown.
        </motion.p>

        {/* Feature list */}
        <ul className="brand-features" style={{ marginTop: "1.75rem" }} aria-label="Key features">
          {FEATURES.map((text, i) => (
            <motion.li
              key={text}
              className="brand-feature-item"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <span className="brand-feature-dot" aria-hidden="true">
                <Check size={9} strokeWidth={3} color="#2563EB" />
              </span>
              {text}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="brand-badge" role="status">
          <span className="brand-badge-dot" aria-hidden="true" />
          Now accepting early access requests
        </div>
      </motion.div>

    </aside>
  );
}
