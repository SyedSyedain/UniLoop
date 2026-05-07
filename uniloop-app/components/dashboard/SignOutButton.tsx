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
      // Sign-out rarely fails; if it does, force a hard redirect
      // so the user isn't silently stuck on a protected page.
      window.location.href = "/auth";
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.5rem 1.25rem",
        borderRadius: "0.625rem",
        border: "1.5px solid #E2E8F0",
        background: "#fff",
        color: loading ? "#CBD5E1" : "#475569",
        fontSize: "0.875rem",
        fontWeight: 600,
        fontFamily: "inherit",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "border-color 0.2s ease, color 0.2s ease",
      }}
    >
      {loading && <Loader2 size={13} className="animate-spin" aria-hidden="true" />}
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
