import { AuthCard } from "@/components/auth/AuthCard";

interface AuthPageProps {
  searchParams: Promise<{ error?: string; reason?: string }>;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { error, reason } = await searchParams;

  return (
    <main className="auth-page">
      <AuthCard callbackError={error} callbackReason={reason} />
      <footer className="auth-footer">(c) 2026 Uniloop | Made in India</footer>
    </main>
  );
}
