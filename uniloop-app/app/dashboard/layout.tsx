import { AppLogo } from "@/components/brand/AppLogo";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export const metadata = {
  title: "Dashboard - Uniloop",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <AppLogo compact />
        <SignOutButton />
      </header>

      <main className="app-main">{children}</main>
    </div>
  );
}
