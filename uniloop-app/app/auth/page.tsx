import { AuthCard } from "@/components/auth/AuthCard";

// Server Component — reads searchParams so the callback route's
// ?error=callback_error is surfaced to the user as a visible banner.
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
