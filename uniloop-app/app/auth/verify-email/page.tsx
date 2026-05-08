import Link from "next/link";
import { Mail } from "lucide-react";
import { AppLogo } from "@/components/brand/AppLogo";

export const metadata = {
  title: "Check your email - Uniloop",
};

export default function VerifyEmailPage() {
  return (
    <main className="auth-page">
      <section className="verify-card" aria-labelledby="verify-title">
        <div className="verify-logo">
          <AppLogo compact />
        </div>

        <div className="verify-icon">
          <Mail size={22} color="#2563EB" aria-hidden="true" />
        </div>

        <h1 id="verify-title" className="verify-title">
          Check your inbox
        </h1>

        <p className="verify-copy">
          We&apos;ve sent a confirmation link to your email address. Click it to
          activate your account and start using Uniloop.
        </p>

        <p className="verify-footnote">
          Already confirmed?{" "}
          <Link href="/auth" className="verify-link">
            Sign in
          </Link>
        </p>
      </section>

      <footer className="auth-footer">© 2026 Uniloop · Made in India</footer>
    </main>
  );
}
