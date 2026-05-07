"use client";

import { motion } from "framer-motion";
import { BrandPanel } from "@/components/auth/BrandPanel";
import { FormPanel }  from "@/components/auth/FormPanel";

export function AuthCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="auth-card"
    >
      <div className="flex">
        <BrandPanel />
        <FormPanel  />
      </div>
    </motion.div>
  );
}
