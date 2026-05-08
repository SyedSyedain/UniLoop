export type ListingCategory = "Uniform" | "Shoes" | "Sportswear" | "Accessories";
export type ListingQuality = "Premium" | "Excellent" | "Good";

export interface MarketplaceListing {
  id: string;
  schoolName: string;
  title: string;
  category: ListingCategory;
  size: string;
  quality: ListingQuality;
  qualityScore: number;
  conditionNotes: string;
  priceInr: number;
  originalPriceInr: number;
  location: string;
  sellerName: string;
  sellerRating: number;
  images: string[];
  listedHoursAgo: number;
}

export const CATEGORY_FILTERS: readonly string[] = [
  "All",
  "Uniform",
  "Shoes",
  "Sportswear",
  "Accessories",
];

export const QUALITY_FILTERS: readonly string[] = ["All quality", "Premium", "Excellent", "Good"];

export const SORT_FILTERS: readonly string[] = [
  "Recommended",
  "Newest first",
  "Price: Low to High",
  "Price: High to Low",
  "Best quality",
];

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: "dps-1",
    schoolName: "Delhi Public School",
    title: "Class 8 complete uniform set",
    category: "Uniform",
    size: "M / Class 8",
    quality: "Premium",
    qualityScore: 9.5,
    conditionNotes: "No stains, recent dry-clean, buttons reinforced",
    priceInr: 1250,
    originalPriceInr: 2900,
    location: "Sector 45",
    sellerName: "Ananya P.",
    sellerRating: 4.9,
    images: ["/marketplace/uniform-1.svg"],
    listedHoursAgo: 14,
  },
  {
    id: "dps-2",
    schoolName: "Delhi Public School",
    title: "Formal black school shoes",
    category: "Shoes",
    size: "EU 38",
    quality: "Excellent",
    qualityScore: 8.8,
    conditionNotes: "Light sole wear, fresh laces added",
    priceInr: 780,
    originalPriceInr: 1790,
    location: "Sushant Lok",
    sellerName: "Rohit S.",
    sellerRating: 4.8,
    images: ["/marketplace/uniform-2.svg"],
    listedHoursAgo: 28,
  },
  {
    id: "dps-3",
    schoolName: "Delhi Public School",
    title: "House sports kit (red house)",
    category: "Sportswear",
    size: "S / Class 6",
    quality: "Good",
    qualityScore: 7.9,
    conditionNotes: "Fabric stretch intact, minor fade on logo",
    priceInr: 620,
    originalPriceInr: 1490,
    location: "DLF Phase 4",
    sellerName: "Meera K.",
    sellerRating: 4.7,
    images: ["/marketplace/uniform-3.svg"],
    listedHoursAgo: 9,
  },
  {
    id: "dps-4",
    schoolName: "Delhi Public School",
    title: "Winter blazer + tie bundle",
    category: "Uniform",
    size: "L / Class 10",
    quality: "Premium",
    qualityScore: 9.2,
    conditionNotes: "Inner lining intact, no fray at cuffs",
    priceInr: 1840,
    originalPriceInr: 4100,
    location: "Golf Course Road",
    sellerName: "Kabir N.",
    sellerRating: 5.0,
    images: ["/marketplace/uniform-4.svg"],
    listedHoursAgo: 34,
  },
  {
    id: "dps-5",
    schoolName: "Delhi Public School",
    title: "Logo tie + belt + badge set",
    category: "Accessories",
    size: "One size",
    quality: "Excellent",
    qualityScore: 8.7,
    conditionNotes: "Badge pin replaced, tie fabric smooth",
    priceInr: 420,
    originalPriceInr: 980,
    location: "South City 1",
    sellerName: "Priya R.",
    sellerRating: 4.8,
    images: ["/marketplace/uniform-5.svg"],
    listedHoursAgo: 17,
  },
  {
    id: "dps-6",
    schoolName: "Delhi Public School",
    title: "Class 5 shirt and trouser combo",
    category: "Uniform",
    size: "XS / Class 5",
    quality: "Good",
    qualityScore: 7.6,
    conditionNotes: "One shirt has slight cuff discoloration",
    priceInr: 560,
    originalPriceInr: 1320,
    location: "Nirvana Country",
    sellerName: "Arjun D.",
    sellerRating: 4.6,
    images: ["/marketplace/uniform-6.svg"],
    listedHoursAgo: 41,
  },
  {
    id: "nps-1",
    schoolName: "National Public School (Indiranagar)",
    title: "NPS blazer with crest",
    category: "Uniform",
    size: "M / Class 9",
    quality: "Premium",
    qualityScore: 9.1,
    conditionNotes: "Dry-cleaned this month, crest stitching perfect",
    priceInr: 1580,
    originalPriceInr: 3650,
    location: "Indiranagar",
    sellerName: "Leena V.",
    sellerRating: 4.9,
    images: ["/marketplace/uniform-7.svg"],
    listedHoursAgo: 22,
  },
  {
    id: "nps-2",
    schoolName: "National Public School (Indiranagar)",
    title: "House T-shirt and track pants",
    category: "Sportswear",
    size: "M",
    quality: "Excellent",
    qualityScore: 8.6,
    conditionNotes: "Elastic good, logo print intact",
    priceInr: 740,
    originalPriceInr: 1680,
    location: "Domlur",
    sellerName: "Fatima A.",
    sellerRating: 4.8,
    images: ["/marketplace/uniform-8.svg"],
    listedHoursAgo: 11,
  },
  {
    id: "nps-3",
    schoolName: "National Public School (Indiranagar)",
    title: "Black school shoes (formal)",
    category: "Shoes",
    size: "EU 40",
    quality: "Good",
    qualityScore: 7.8,
    conditionNotes: "Visible toe crease, no sole crack",
    priceInr: 610,
    originalPriceInr: 1690,
    location: "Ulsoor",
    sellerName: "Sanjay T.",
    sellerRating: 4.7,
    images: ["/marketplace/uniform-9.svg"],
    listedHoursAgo: 31,
  },
  {
    id: "bc-1",
    schoolName: "Bishop Cotton Boys' School",
    title: "Senior uniform shirt pack (3 pcs)",
    category: "Uniform",
    size: "L / Class 11",
    quality: "Excellent",
    qualityScore: 8.9,
    conditionNotes: "Collars firm, no yellowing",
    priceInr: 980,
    originalPriceInr: 2350,
    location: "Richmond Town",
    sellerName: "Nisha M.",
    sellerRating: 4.9,
    images: ["/marketplace/uniform-10.svg"],
    listedHoursAgo: 6,
  },
  {
    id: "bc-2",
    schoolName: "Bishop Cotton Boys' School",
    title: "School tie and socks combo",
    category: "Accessories",
    size: "One size",
    quality: "Good",
    qualityScore: 7.4,
    conditionNotes: "Socks are lightly used, tie almost new",
    priceInr: 280,
    originalPriceInr: 760,
    location: "Shanti Nagar",
    sellerName: "Rhea J.",
    sellerRating: 4.6,
    images: ["/marketplace/uniform-11.svg"],
    listedHoursAgo: 26,
  },
  {
    id: "bc-3",
    schoolName: "Bishop Cotton Boys' School",
    title: "PE sneakers",
    category: "Shoes",
    size: "EU 39",
    quality: "Premium",
    qualityScore: 9.0,
    conditionNotes: "Almost unused, fresh insole",
    priceInr: 920,
    originalPriceInr: 2150,
    location: "Langford Road",
    sellerName: "Harsh V.",
    sellerRating: 5.0,
    images: ["/marketplace/uniform-12.svg"],
    listedHoursAgo: 19,
  },
];

function normalizeSchoolName(value: string) {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function schoolMatches(listingSchool: string, registeredSchool: string) {
  const a = normalizeSchoolName(listingSchool);
  const b = normalizeSchoolName(registeredSchool);
  if (!a || !b) return false;
  return a === b;
}

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function listingsForSchool(registeredSchool: string) {
  return MARKETPLACE_LISTINGS.filter((listing) =>
    schoolMatches(listing.schoolName, registeredSchool)
  );
}
