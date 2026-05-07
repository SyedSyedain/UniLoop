import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  // first_name / last_name are stored in user_metadata at signup
  const meta        = user.user_metadata as Record<string, string> | undefined;
  const firstName   = meta?.first_name ?? "";
  const lastName    = meta?.last_name  ?? "";
  const displayName = firstName ? `${firstName} ${lastName}`.trim() : user.email;

  return (
    <div>
      {/* Welcome header */}
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: 800,
            color: "#080F1E",
            letterSpacing: "-0.04em",
            margin: "0 0 0.5rem",
          }}
        >
          Welcome back, {displayName} 👋
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "#64748B", margin: 0 }}>
          Your Uniloop dashboard — buy and sell school uniforms within your community.
        </p>
      </div>

      {/* Placeholder cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {[
          { label: "Browse Listings",  desc: "Find uniforms from families in your school."  },
          { label: "Create a Listing", desc: "Sell uniforms your children have outgrown."    },
          { label: "My Orders",        desc: "Track purchases and sales in one place."       },
          { label: "My Profile",       desc: "Update your details and school information."   },
        ].map(({ label, desc }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "1rem",
              padding: "1.75rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: "#0F172A",
                margin: "0 0 0.375rem",
              }}
            >
              {label}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#94A3B8", margin: 0, lineHeight: 1.6 }}>
              {desc}
            </p>
            <div
              style={{
                display: "inline-block",
                marginTop: "1rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#2563EB",
                background: "#EFF6FF",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid #BFDBFE",
              }}
            >
              Coming soon
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
