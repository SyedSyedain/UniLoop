"use client";

import { Check, ChevronLeft, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatInr,
  getListingDetails,
  getListingGallery,
  type ListingDetailAttributes,
  type MarketplaceListing,
} from "@/lib/marketplace-demo";

interface MarketplaceItemDetailProps {
  listing: MarketplaceListing;
  relatedListings: MarketplaceListing[];
}

export function MarketplaceItemDetail({ listing, relatedListings }: MarketplaceItemDetailProps) {
  const gallery = useMemo(() => getListingGallery(listing), [listing]);
  const details = useMemo<ListingDetailAttributes>(() => getListingDetails(listing), [listing]);

  const [activeImage, setActiveImage] = useState(gallery[0] ?? listing.images[0]);
  const [selectedSize, setSelectedSize] = useState(details.availableSizes[0] ?? listing.size);
  const [selectedColor, setSelectedColor] = useState(details.colors[0] ?? "Standard");
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  const savings = listing.originalPriceInr - listing.priceInr;

  return (
    <div className="item-detail-page">
      <div className="item-detail-headline">
        <Link href="/marketplace-preview" className="back-link">
          <ChevronLeft size={16} aria-hidden="true" />
          Back to marketplace
        </Link>
      </div>

      <article className="item-detail-card">
        <section className="item-gallery" aria-label="Uniform photo gallery">
          <div className="item-main-image-wrap">
            <Image
              className="item-main-image"
              src={activeImage}
              alt={listing.title}
              width={1200}
              height={900}
              priority
            />
          </div>

          <div className="item-thumbnails">
            {gallery.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveImage(image)}
                className={`item-thumb-btn${activeImage === image ? " item-thumb-btn--active" : ""}`}
                aria-label={`View photo ${index + 1} for ${listing.title}`}
                aria-pressed={activeImage === image}
              >
                <Image src={image} alt={listing.title} width={280} height={200} className="item-thumb-image" />
              </button>
            ))}
          </div>
        </section>

        <section className="item-summary">
          <div className="item-top-pills">
            <span className="condition-pill">{listing.quality}</span>
            <span className="rating-pill">
              <Star size={12} aria-hidden="true" />
              {listing.sellerRating.toFixed(1)}
            </span>
          </div>

          <h1>{listing.title}</h1>
          <p className="item-school">{listing.schoolName}</p>

          <div className="item-price-row">
            <div className="item-price">{formatInr(listing.priceInr)}</div>
            <div className="item-original">was {formatInr(listing.originalPriceInr)}</div>
            <div className="item-save">Save {formatInr(savings)}</div>
          </div>

          <p className="item-description">{details.description}</p>

          <div className="item-info-grid" aria-label="Uniform details">
            <div>
              <span>Type</span>
              <strong>{details.type}</strong>
            </div>
            <div>
              <span>Season</span>
              <strong>{details.season}</strong>
            </div>
            <div>
              <span>Material</span>
              <strong>{details.material}</strong>
            </div>
            <div>
              <span>Condition</span>
              <strong>{listing.conditionNotes}</strong>
            </div>
          </div>

          <div className="item-option-group">
            <h2>Size</h2>
            <div className="item-option-row" role="radiogroup" aria-label="Select size">
              {details.availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`item-option-btn${selectedSize === size ? " item-option-btn--active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  role="radio"
                  aria-checked={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="item-option-group">
            <h2>Color</h2>
            <div className="item-option-row" role="radiogroup" aria-label="Select color">
              {details.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`item-option-btn${selectedColor === color ? " item-option-btn--active" : ""}`}
                  onClick={() => setSelectedColor(color)}
                  role="radio"
                  aria-checked={selectedColor === color}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="item-option-group">
            <h2>Quantity</h2>
            <div className="item-quantity-control" aria-label="Select quantity">
              <button
                type="button"
                className="item-qty-btn"
                onClick={() => setQuantity((previous) => Math.max(1, previous - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                className="item-qty-btn"
                onClick={() => setQuantity((previous) => Math.min(5, previous + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="item-actions-row">
            <button
              type="button"
              className="add-cart-btn"
              onClick={() =>
                setStatusMessage(
                  `${quantity} item(s) added to cart with size ${selectedSize} and color ${selectedColor}.`
                )
              }
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now-btn"
              onClick={() =>
                setStatusMessage(
                  `Proceeding to checkout for ${quantity} item(s), size ${selectedSize}, color ${selectedColor}.`
                )
              }
            >
              Buy Now
            </button>
          </div>

          {statusMessage ? (
            <p className="item-action-feedback" role="status" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}

          <div className="item-assurance">
            <div>
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Verified seller: {listing.sellerName}</span>
            </div>
            <div>
              <Truck size={14} aria-hidden="true" />
              <span>Pickup location: {listing.location}</span>
            </div>
            <div>
              <Check size={14} aria-hidden="true" />
              <span>Selected: {selectedSize}, {selectedColor}</span>
            </div>
          </div>
        </section>
      </article>

      <section className="item-detail-extra">
        <h2>What is it?</h2>
        <p>
          {listing.title} is listed for {listing.schoolName}. This item is most suitable for students needing{" "}
          {details.season.toLowerCase()} usage and comes with transparent condition notes and seller verification.
        </p>
        <h3>Included in this listing</h3>
        <ul>
          {details.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {relatedListings.length > 0 ? (
        <section className="related-items">
          <h2>More uniforms from your school</h2>
          <div className="related-grid">
            {relatedListings.map((related) => (
              <Link key={related.id} href={`/marketplace-preview/${related.id}`} className="related-card">
                <Image src={related.images[0]} alt={related.title} width={800} height={600} className="related-image" />
                <div className="related-body">
                  <h3>{related.title}</h3>
                  <p>{related.size} | {related.quality}</p>
                  <strong>{formatInr(related.priceInr)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
