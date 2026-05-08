import { AppLogo } from "@/components/brand/AppLogo";
import { MarketplaceBrowse } from "@/components/marketplace/MarketplaceBrowse";
import { listingsForSchool } from "@/lib/marketplace-demo";

export const metadata = {
  title: "Marketplace - Uniloop",
};

export default function MarketplacePreviewPage() {
  const schoolName = "Delhi Public School";

  return (
    <div className="app-shell">
      <header className="app-header">
        <AppLogo compact />
        <span className="preview-badge">Sample account</span>
      </header>
      <main className="app-main">
        <MarketplaceBrowse
          displayName="Syed"
          schoolName={schoolName}
          listings={listingsForSchool(schoolName)}
        />
      </main>
    </div>
  );
}
