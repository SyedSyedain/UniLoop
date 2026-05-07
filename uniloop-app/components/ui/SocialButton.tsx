"use client";

import { motion } from "framer-motion";

interface SocialButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function SocialButton({ label, icon, onClick }: SocialButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="social-btn"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
