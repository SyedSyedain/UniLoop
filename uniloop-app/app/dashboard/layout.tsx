import { RefreshCw } from "lucide-react";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export const metadata = {
  title: "Dashboard – Uniloop",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0F5FF",
        backgroundImage: "radial-gradient(rgba(37,99,235,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Top nav */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "0 2rem",
          height: "3.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "1.875rem",
              height: "1.875rem",
              borderRadius: "0.5rem",
              background: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
            }}
          >
            <RefreshCw size={13} color="#fff" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              color: "#0C1A3B",
              letterSpacing: "-0.03em",
            }}
          >
            uniloop
          </span>
        </div>

        <SignOutButton />
      </header>

      <main style={{ padding: "3rem 2rem", maxWidth: "72rem", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
