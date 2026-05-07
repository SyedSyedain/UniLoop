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

  /* Subtle magnetic pull — restrained, not exaggerated */
  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.08;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.08;
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
      whileTap={{ scale: 0.98 }}
      className="btn-primary"
      style={{
        transition:
          "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <span className="btn-primary__inner">
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            <span>Processing…</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </>
        )}
      </span>
    </motion.button>
  );
}
