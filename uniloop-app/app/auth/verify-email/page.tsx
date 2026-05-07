import Link from "next/link";
import { RefreshCw, Mail } from "lucide-react";

export const metadata = {
  title: "Check your email – Uniloop",
};

export default function VerifyEmailPage() {
  return (
    <main className="auth-page">
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "1.5rem",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05), 0 24px 64px rgba(37,99,235,0.08)",
          padding: "3rem 2.5rem",
          maxWidth: "26rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <div className="brand-logo-mark" style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem" }}>
            <RefreshCw size={13} color="#fff" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="brand-logo-text" style={{ fontSize: "1rem" }}>uniloop</span>
        </div>

        {/* Icon */}
        <div
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <Mail size={22} color="#2563EB" aria-hidden="true" />
        </div>

        <h1
          style={{
            fontSize: "1.375rem",
            fontWeight: 800,
            color: "#080F1E",
            letterSpacing: "-0.03em",
            margin: "0 0 0.625rem",
          }}
        >
          Check your inbox
        </h1>

        <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.65, margin: "0 0 2rem" }}>
          We&apos;ve sent a confirmation link to your email address.
          Click it to activate your account and start using Uniloop.
        </p>

        <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }}>
          Already confirmed?{" "}
          <Link
            href="/auth"
            style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none" }}
          >
            Sign in
          </Link>
        </p>
      </div>

      <footer className="auth-footer">© 2026 Uniloop · Made in India</footer>
    </main>
  );
}
