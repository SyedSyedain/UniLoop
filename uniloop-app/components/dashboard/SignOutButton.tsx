"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    if (loading) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.push("/auth");
      router.refresh();
    } catch {
      window.location.href = "/auth";
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleSignOut} disabled={loading} className="btn-secondary">
      {loading && <Loader2 size={13} className="animate-spin" aria-hidden="true" />}
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
