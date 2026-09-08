export type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  images: readonly string[];
  alt: string;
  category: (typeof CATEGORIES)[number];
  collections: readonly string[];
  featured: boolean;
  customisable: boolean;
  details: string[];
};

export const CATEGORIES = ["All", "Bracelets", "Charms", "Necklaces", "Gifts"] as const;
export const WHATSAPP_NUMBER = "916300790881";
export const WHATSAPP_DISPLAY = "+91 63007 90881";
export const INSTAGRAM_HANDLE = "@charmelle.jewellery";
export const INSTAGRAM_URL = "https://instagram.com/charmelle.jewellery";
export const BRAND_NAME = "Charmelle";
export const BRACELET_BASE_PRICE = 2400;

export const COLLECTIONS: Record<string, { name: string; blurb: string; image: string }> = {
  charms: { name: "Charm Bracelets", blurb: "Stories you can wear.", image: "/images/product-01.jpg" },
  beaded: { name: "Beaded Bracelets", blurb: "Everyday elegance.", image: "/images/product-03.jpg" },
  necklaces: { name: "Necklaces", blurb: "Close to the heart.", image: "/images/product-07.jpg" },
  gifts: { name: "Gifts", blurb: "For someone you love.", image: "/images/product-08.jpg" },
  new: { name: "New Arrivals", blurb: "Just crafted.", image: "/images/product-02.jpg" },
};

export const products: readonly Product[] = [
  {
    slug: "the-memory-keeper",
    name: "The Memory Keeper",
    description: "A hand-assembled charm bracelet with butterfly, heart and key charms — for the moments you never want to forget.",
    price: 3200,
    images: ["/images/product-01.jpg", "/images/product-02.jpg"],
    alt: "The Memory Keeper charm bracelet on ivory linen",
    category: "Bracelets",
    collections: ["charms", "new"],
    featured: true,
    customisable: true,
    details: ["Gold-tone brass base", "Hand-set resin charms", "Adjustable 16–20 cm", "Made to order in 5 days"],
  },
  {
    slug: "little-wonders",
    name: "Little Wonders",
    description: "Delicate beaded bracelet in champagne and blush tones. Made to be layered, worn, and loved.",
    price: 1800,
    images: ["/images/product-03.jpg"],
    alt: "Little Wonders beaded bracelet in champagne tones",
    category: "Bracelets",
    collections: ["beaded"],
    featured: true,
    customisable: false,
    details: ["Glass & resin beads", "Elastic fit", "One size", "Ready to ship"],
  },
  {
    slug: "heart-of-gold",
    name: "Heart of Gold",
    description: "A single gold heart charm on a fine chain. Quiet, meaningful, and entirely yours.",
    price: 1450,
    images: ["/images/product-04.jpg"],
    alt: "Heart of Gold single charm bracelet",
    category: "Charms",
    collections: ["charms"],
    featured: false,
    customisable: true,
    details: ["Gold-tone brass", "Lobster clasp", "Adjustable 15–18 cm", "Made to order"],
  },
  {
    slug: "wanderlust",
    name: "Wanderlust",
    description: "A travel-inspired charm bracelet with a compass, plane and star. For the ones who collect places.",
    price: 3600,
    images: ["/images/product-05.jpg"],
    alt: "Wanderlust travel charm bracelet",
    category: "Bracelets",
    collections: ["charms", "new"],
    featured: true,
    customisable: true,
    details: ["Gold-tone brass base", "3 hand-set charms", "Adjustable 16–20 cm", "Made to order in 5 days"],
  },
  {
    slug: "initial-charm",
    name: "Initial Charm",
    description: "Your initial, hand-cast in gold-tone brass on a delicate chain. Quietly personal.",
    price: 1650,
    images: ["/images/product-06.jpg"],
    alt: "Initial Charm bracelet with letter A",
    category: "Charms",
    collections: ["charms"],
    featured: true,
    customisable: true,
    details: ["Gold-tone brass", "Letter A–Z available", "Adjustable 15–18 cm", "Made to order"],
  },
  {
    slug: "forever-necklace",
    name: "Forever Necklace",
    description: "A single charm on a fine gold chain. The piece that stays close to your heart.",
    price: 2800,
    images: ["/images/product-07.jpg"],
    alt: "Forever Necklace with single charm",
    category: "Necklaces",
    collections: ["necklaces"],
    featured: false,
    customisable: false,
    details: ["Gold-tone brass", "42 cm + 5 cm extender", "Lobster clasp", "Ready to ship"],
  },
  {
    slug: "the-gift-set",
    name: "The Gift Set",
    description: "A charm bracelet, keepsake pouch and handwritten note. For someone you love.",
    price: 4200,
    images: ["/images/product-08.jpg"],
    alt: "The Gift Set with charm bracelet and pouch",
    category: "Gifts",
    collections: ["gifts"],
    featured: true,
    customisable: true,
    details: ["Charm bracelet included", "Linen keepsake pouch", "Handwritten note", "Gift-wrapped"],
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    description: "A warm-toned beaded bracelet for the in-between hours. Soft, golden, easy to wear.",
    price: 1900,
    images: ["/images/product-09.jpg"],
    alt: "Golden Hour beaded bracelet",
    category: "Bracelets",
    collections: ["beaded", "new"],
    featured: false,
    customisable: false,
    details: ["Glass & resin beads", "Elastic fit", "One size", "Ready to ship"],
  },
  {
    slug: "black-clover",
    name: "Black Clover",
    description: "A sleek bracelet finished with black clover charms for a bold little touch of luck.",
    price: 20000,
    images: ["/images/black-clover.jpg"],
    alt: "Black Clover charm bracelet on a dark background",
    category: "Bracelets",
    collections: ["charms", "new"],
    featured: true,
    customisable: false,
    details: ["Gold-tone brass base", "Black clover charms", "Adjustable 16–20 cm", "Ready to ship"],
  },
  {
    slug: "couple-bracelet",
    name: "Couple Bracelet",
    description: "A matching bracelet set made to hold two stories close, wherever the day takes you.",
    price: 35000,
    images: ["/images/couple-bracelet.jpg"],
    alt: "Matching couple bracelets styled together",
    category: "Bracelets",
    collections: ["beaded", "gifts", "new"],
    featured: true,
    customisable: false,
    details: ["Matching bracelet pair", "Comfortable stretch fit", "One size", "Ready to ship"],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type CustomCharm = {
  id: string;
  name: string;
  meaning: string;
  price: number;
};

export const customCharms: readonly CustomCharm[] = [
  { id: "butterfly", name: "Butterfly", meaning: "for change", price: 400 },
  { id: "heart", name: "Heart", meaning: "for love", price: 350 },
  { id: "key", name: "Key", meaning: "for beginnings", price: 380 },
  { id: "star", name: "Star", meaning: "for dreams", price: 360 },
  { id: "moon", name: "Moon", meaning: "for intuition", price: 360 },
  { id: "flower", name: "Flower", meaning: "for growth", price: 420 },
  { id: "compass", name: "Compass", meaning: "for travel", price: 450 },
  { id: "initial", name: "Initial", meaning: "for you", price: 500 },
  { id: "infinity", name: "Infinity", meaning: "for forever", price: 410 },
  { id: "feather", name: "Feather", meaning: "for freedom", price: 390 },
];

export type Testimonial = { name: string; text: string; location: string };
export const testimonials: readonly Testimonial[] = [
  { name: "Ananya R.", text: "My bracelet arrived wrapped like a gift to myself. The charms feel weighty and real — not costume at all.", location: "Mumbai" },
  { name: "Priya M.", text: "I built a bracelet with charms from each city I've lived in. It's the most personal thing I own.", location: "Bengaluru" },
  { name: "Sara K.", text: "Ordered on WhatsApp and it was effortless. The handwritten note made me cry a little.", location: "Delhi" },
];

export type GiftCategory = { name: string; blurb: string; image: string; price: string };
export const giftCategories: readonly GiftCategory[] = [
  { name: "For Her", blurb: "The piece she'll wear every day.", image: "/images/gift-01.jpg", price: "from ₹1,650" },
  { name: "For a Friend", blurb: "A charm for your shared story.", image: "/images/gift-02.jpg", price: "from ₹1,800" },
  { name: "For You", blurb: "Because you earned it.", image: "/images/gift-03.jpg", price: "from ₹1,450" },
];

export type GalleryImage = { src: string; alt: string };
export const galleryImages: readonly GalleryImage[] = [
  { src: "/images/gallery-01.jpg", alt: "Charm bracelet styled on linen" },
  { src: "/images/gallery-02.jpg", alt: "Detail of gold heart charm" },
  { src: "/images/gallery-03.jpg", alt: "Stacked charm and beaded bracelets" },
  { src: "/images/gallery-04.jpg", alt: "Charm bracelet on wrist in warm light" },
  { src: "/images/gallery-05.jpg", alt: "Custom initial charm detail" },
  { src: "/images/gallery-06.jpg", alt: "Gift set with pouch and note" },
];

export function formatPrice(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;
}
