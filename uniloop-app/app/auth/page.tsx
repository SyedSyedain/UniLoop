"use client";

import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { AuthCard }       from "@/components/auth/AuthCard";

export default function AuthPage() {
  return (
    <main className="auth-page">
      {/* Ambient particle network */}
      <ParticleCanvas />

      {/* Background gradient orbs — decorative only */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <AuthCard />

      <footer className="auth-footer">
        © 2025 Uniloop · Built with care in Bangalore, India
      </footer>
    </main>
  );
}
