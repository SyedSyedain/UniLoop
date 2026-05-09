import { AppLogo } from "@/components/brand/AppLogo";
import { MarketplaceItemDetail } from "@/components/marketplace/MarketplaceItemDetail";
import { findListingById, getRelatedListings } from "@/lib/marketplace-demo";
import { notFound } from "next/navigation";

interface ListingDetailPageProps {
  params: Promise<{
    listingId: string;
  }>;
}

export async function generateMetadata({ params }: ListingDetailPageProps) {
  const { listingId } = await params;
  const listing = findListingById(listingId);

  return {
    title: listing ? `${listing.title} - Uniloop` : "Uniform Detail - Uniloop",
  };
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { listingId } = await params;
  const listing = findListingById(listingId);

  if (!listing) {
    notFound();
  }
  const relatedListings = getRelatedListings(listing);

  return (
    <div className="app-shell">
      <header className="app-header">
        <AppLogo compact />
        <span className="preview-badge">Sample account</span>
      </header>
      <main className="app-main">
        <MarketplaceItemDetail listing={listing} relatedListings={relatedListings} />
      </main>
    </div>
  );
}
