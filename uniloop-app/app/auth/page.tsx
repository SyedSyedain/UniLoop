import { AuthCard } from "@/components/auth/AuthCard";

interface AuthPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { error } = await searchParams;

  return (
    <main className="auth-page">
      <AuthCard callbackError={error} />
      <footer className="auth-footer">© 2026 Uniloop · Made in India</footer>
    </main>
  );
}
