"use client";

import { Search, ShieldCheck, SlidersHorizontal, Star } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CATEGORY_FILTERS,
  formatInr,
  type MarketplaceListing,
  QUALITY_FILTERS,
  SORT_FILTERS,
} from "@/lib/marketplace-demo";

interface MarketplaceBrowseProps {
  displayName: string;
  schoolName: string;
  listings?: MarketplaceListing[];
}

type SortOption = (typeof SORT_FILTERS)[number];

function listingScore(listing: MarketplaceListing) {
  return listing.sellerRating * 2 + listing.qualityScore - listing.listedHoursAgo / 72;
}

function sortListings(listings: MarketplaceListing[], sort: SortOption) {
  if (sort === "Newest first") {
    return [...listings].sort((a, b) => a.listedHoursAgo - b.listedHoursAgo);
  }

  if (sort === "Price: Low to High") {
    return [...listings].sort((a, b) => a.priceInr - b.priceInr);
  }

  if (sort === "Price: High to Low") {
    return [...listings].sort((a, b) => b.priceInr - a.priceInr);
  }

  if (sort === "Best quality") {
    return [...listings].sort((a, b) => b.qualityScore - a.qualityScore);
  }

  return [...listings].sort((a, b) => listingScore(b) - listingScore(a));
}

export function MarketplaceBrowse({ displayName, schoolName, listings = [] }: MarketplaceBrowseProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [quality, setQuality] = useState("All quality");
  const [sort, setSort] = useState<SortOption>("Recommended");
  const [budget, setBudget] = useState(5000);

  const schoolListings = useMemo(
    () => (Array.isArray(listings) ? listings : []),
    [listings]
  );

  const filteredListings = useMemo(() => {
    const loweredQuery = query.trim().toLowerCase();

    const filtered = schoolListings.filter((listing) => {
      if (listing.priceInr > budget) return false;
      if (category !== "All" && listing.category !== category) return false;
      if (quality !== "All quality" && listing.quality !== quality) return false;
      if (!loweredQuery) return true;

      return (
        listing.title.toLowerCase().includes(loweredQuery) ||
        listing.size.toLowerCase().includes(loweredQuery) ||
        listing.conditionNotes.toLowerCase().includes(loweredQuery)
      );
    });

    return sortListings(filtered, sort);
  }, [budget, category, quality, query, schoolListings, sort]);

  return (
    <div className="marketplace-page">
      <section className="marketplace-hero">
        <div className="marketplace-hero__main">
          <div className="marketplace-kicker">
            <ShieldCheck size={14} aria-hidden="true" />
            Buyer marketplace
          </div>
          <h1 className="marketplace-title">Purchase uniforms and school essentials at {schoolName}</h1>
          <p className="marketplace-subtitle">
            Hi {displayName}. You are seeing only items listed for your registered school. Compare
            quality, size, and pricing transparently before contacting a verified seller.
          </p>
        </div>
        <div className="marketplace-stats" aria-label="Marketplace quick statistics">
          <div>
            <strong>{schoolListings.length}</strong>
            <span>School listings</span>
          </div>
          <div>
            <strong>{filteredListings.length}</strong>
            <span>Matches now</span>
          </div>
          <div>
            <strong>{formatInr(budget)}</strong>
            <span>Budget limit</span>
          </div>
        </div>
      </section>

      <section className="marketplace-toolbar" aria-label="Search and filters">
        <label className="marketplace-search">
          <Search size={17} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search uniform, shoes, size, condition..."
            aria-label="Search listings"
          />
        </label>
        <div className="filter-toggle" aria-hidden="true">
          <SlidersHorizontal size={16} aria-hidden="true" />
          Frontend filters active
        </div>
      </section>

      <section className="marketplace-filters" aria-label="Marketplace controls">
        <FilterGroup
          title="Category"
          options={CATEGORY_FILTERS}
          selected={category}
          onSelect={setCategory}
        />
        <FilterGroup
          title="Quality"
          options={QUALITY_FILTERS}
          selected={quality}
          onSelect={setQuality}
        />
        <FilterGroup title="Sort" options={SORT_FILTERS} selected={sort} onSelect={setSort} />

        <label className="budget-control">
          <span>Maximum budget: {formatInr(budget)}</span>
          <input
            type="range"
            min={200}
            max={5000}
            step={100}
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            aria-label="Maximum budget in INR"
          />
        </label>
      </section>

      <section className="listing-feed" aria-label="Uniform and school item listings">
        <div className="feed-header">
          <div>
            <h2>{filteredListings.length} items for {schoolName}</h2>
            <p>All prices are shown clearly with quality score and condition notes.</p>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <div className="empty-state">
            <h3>No matching listings right now</h3>
            <p>Try removing a filter or increasing budget to see more items.</p>
          </div>
        ) : (
          <div className="listing-grid">
            {filteredListings.map((listing) => {
              const savings = listing.originalPriceInr - listing.priceInr;
              return (
                <article className="listing-card" key={listing.id}>
                  <Image
                    className="listing-photo"
                    src={listing.images[0]}
                    alt={listing.title}
                    width={1200}
                    height={900}
                  />

                  <div className="listing-body">
                    <div className="listing-meta-row">
                      <span className="condition-pill">{listing.quality}</span>
                      <span className="rating-pill">
                        <Star size={12} aria-hidden="true" />
                        {listing.sellerRating.toFixed(1)}
                      </span>
                    </div>

                    <h3>{listing.title}</h3>
                    <p className="listing-institution">{listing.schoolName}</p>

                    <div className="listing-details">
                      <span>{listing.category}</span>
                      <span>{listing.size}</span>
                      <span>Quality {listing.qualityScore.toFixed(1)}/10</span>
                    </div>

                    <p className="condition-note">{listing.conditionNotes}</p>

                    <div className="seller-row">
                      <ShieldCheck size={13} aria-hidden="true" />
                      {listing.sellerName} | {listing.location} | verified seller
                    </div>
                  </div>

                  <div className="listing-actions">
                    <div className="listing-price-block">
                      <div className="listing-price">{formatInr(listing.priceInr)}</div>
                      <div className="listing-original">was {formatInr(listing.originalPriceInr)}</div>
                      <div className="listing-savings">Save {formatInr(savings)}</div>
                    </div>
                    <button className="purchase-button" type="button">
                      View and Purchase
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <div className="filter-chips">
        {options.map((option) => (
          <button
            className={`filter-chip${selected === option ? " filter-chip--active" : ""}`}
            key={option}
            type="button"
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
