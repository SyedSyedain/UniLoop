"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

interface GoldButtonProps {
  label: string;
  loading?: boolean;
}

export function GoldButton({ label, loading = false }: GoldButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={loading}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.97 }}
      /*
       * The `btn-gold` class runs the gradient + pulse animations.
       * `btn-gold--loading` disables the shimmer ::after pseudo-element
       * so it doesn't clash with the spinner while loading.
       */
      className={`btn-gold${loading ? " btn-gold--loading" : ""}`}
      style={{
        transition:
          "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
      }}
    >
      <span className="btn-gold__inner">
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            {label}
            <ArrowRight size={15} />
          </>
        )}
      </span>
    </motion.button>
  );
}
