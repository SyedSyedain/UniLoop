import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const DASHBOARD_ACTIONS = [
  { label: "Browse Listings", desc: "Find uniforms from families in your school." },
  { label: "Create a Listing", desc: "Sell uniforms your children have outgrown." },
  { label: "My Orders", desc: "Track purchases and sales in one place." },
  { label: "My Profile", desc: "Update your details and school information." },
] as const;

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const meta = user.user_metadata as Record<string, string> | undefined;
  const firstName = meta?.first_name ?? "";
  const lastName = meta?.last_name ?? "";
  const displayName = firstName ? `${firstName} ${lastName}`.trim() : user.email;

  return (
    <div>
      <section className="dashboard-hero">
        <h1 className="dashboard-title">Welcome back, {displayName}</h1>
        <p className="dashboard-subtitle">
          Your Uniloop dashboard - buy and sell school uniforms within your community.
        </p>
      </section>

      <section className="dashboard-grid" aria-label="Dashboard actions">
        {DASHBOARD_ACTIONS.map(({ label, desc }) => (
          <article key={label} className="dashboard-card">
            <p className="dashboard-card__title">{label}</p>
            <p className="dashboard-card__desc">{desc}</p>
            <div className="dashboard-card__badge">Coming soon</div>
          </article>
        ))}
      </section>
    </div>
  );
}
