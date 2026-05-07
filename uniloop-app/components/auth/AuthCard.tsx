"use client";

import { motion } from "framer-motion";
import { BrandPanel } from "@/components/auth/BrandPanel";
import { FormPanel }  from "@/components/auth/FormPanel";

interface AuthCardProps {
  callbackError?: string;
}

export function AuthCard({ callbackError }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="auth-card"
    >
      <div className="flex">
        <BrandPanel />
        <FormPanel callbackError={callbackError} />
      </div>
    </motion.div>
  );
}
