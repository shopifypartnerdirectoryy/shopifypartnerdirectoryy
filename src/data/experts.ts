export type Expert = {
  slug: string;
  name: string;
  tagline: string;
  about: string;
  location: string;
  region: string;
  languages: string[];
  services: string[];
  industries: string[];
  rating: number;
  reviews: number;
  projects: number;
  startingPrice: string;
  website: string;
  phone: string;
  email: string;
  initials: string;
  accent: string;
  featured?: boolean;
};

export const SERVICES = [
  "Store setup",
  "Store migration",
  "Custom theme design",
  "Headless commerce",
  "Conversion rate optimization",
  "SEO",
  "Paid media",
  "Email & SMS marketing",
  "Custom apps",
  "Analytics & tracking",
];

export const REGIONS = [
  "North America",
  "Europe",
  "Africa",
  "Asia Pacific",
  "Latin America",
];

export const INDUSTRIES = [
  "Fashion & apparel",
  "Beauty",
  "Food & beverage",
  "Home & garden",
  "Electronics",
  "Health & wellness",
  "B2B & wholesale",
];

export const experts: Expert[] = [
  {
    slug: "gillco-digital",
    name: "Gillco Digital",
    tagline: "Full-service commerce partner for growth-stage merchants",
    about:
      "Gillco Digital builds and scales online stores end to end — from storefront design and migration to conversion optimization and paid acquisition. The team works with growth-stage brands that need a single partner across design, development and performance marketing.",
    location: "Toronto, Canada",
    region: "North America",
    languages: ["English", "French"],
    services: [
      "Store setup",
      "Store migration",
      "Custom theme design",
      "Conversion rate optimization",
      "Paid media",
      "SEO",
    ],
    industries: ["Fashion & apparel", "Beauty", "Home & garden"],
    rating: 5.0,
    reviews: 118,
    projects: 240,
    startingPrice: "From $1,500",
    website: "https://gillcodigital.com",
    phone: "+1 (581) 781-4936",
    email: "hello@gillcodigital.com",
    initials: "GD",
    accent: "var(--brand)",
    featured: true,
  },
  {
    slug: "c2-digital",
    name: "C2 Digital",
    tagline: "Performance marketing and CRO for direct-to-consumer brands",
    about:
      "C2 Digital pairs creative production with rigorous experimentation. The team runs paid media, lifecycle marketing and on-site testing programs designed to move revenue per session, not just traffic.",
    location: "Barrie, Canada",
    region: "North America",
    languages: ["English"],
    services: [
      "Conversion rate optimization",
      "Paid media",
      "Email & SMS marketing",
      "Analytics & tracking",
    ],
    industries: ["Health & wellness", "Food & beverage", "Electronics"],
    rating: 4.9,
    reviews: 86,
    projects: 173,
    startingPrice: "From $2,000",
    website: "https://c2digital.com",
    phone: "+1 (249) 486-7212",
    email: "hello@c2digital.com",
    initials: "C2",
    accent: "var(--brand-2)",
    featured: true,
  },
  {
    slug: "northbeam-studio",
    name: "Northbeam Studio",
    tagline: "Custom theme design with a strong editorial eye",
    about:
      "A small design-led studio focused on bespoke storefronts for apparel and lifestyle brands. Every build ships with a documented component library.",
    location: "Berlin, Germany",
    region: "Europe",
    languages: ["English", "German"],
    services: ["Custom theme design", "Store setup", "SEO"],
    industries: ["Fashion & apparel", "Home & garden"],
    rating: 4.8,
    reviews: 54,
    projects: 92,
    startingPrice: "From $3,000",
    website: "https://northbeamstudio.example.com",
    phone: "+49 30 1234 5678",
    email: "studio@northbeam.example.com",
    initials: "NS",
    accent: "var(--brand-3)",
  },
  {
    slug: "lagos-commerce-lab",
    name: "Lagos Commerce Lab",
    tagline: "Launch partner for African merchants going online",
    about:
      "Store setup, local payment configuration and logistics integrations for merchants across West Africa, plus hands-on merchant training after launch.",
    location: "Lagos, Nigeria",
    region: "Africa",
    languages: ["English", "Yoruba"],
    services: ["Store setup", "Store migration", "Analytics & tracking"],
    industries: ["Fashion & apparel", "Food & beverage", "B2B & wholesale"],
    rating: 4.9,
    reviews: 61,
    projects: 130,
    startingPrice: "From $900",
    website: "https://lagoscommercelab.example.com",
    phone: "+234 1 234 5678",
    email: "team@lagoscommercelab.example.com",
    initials: "LC",
    accent: "var(--brand-4)",
  },
  {
    slug: "meridian-headless",
    name: "Meridian Headless",
    tagline: "Composable storefronts for high-traffic catalogs",
    about:
      "Engineering-heavy partner specializing in headless builds, custom apps and integrations with ERP and PIM systems.",
    location: "Austin, United States",
    region: "North America",
    languages: ["English", "Spanish"],
    services: ["Headless commerce", "Custom apps", "Analytics & tracking"],
    industries: ["Electronics", "B2B & wholesale"],
    rating: 4.7,
    reviews: 44,
    projects: 68,
    startingPrice: "From $8,000",
    website: "https://meridianheadless.example.com",
    phone: "+1 (512) 555-0148",
    email: "hi@meridianheadless.example.com",
    initials: "MH",
    accent: "var(--brand-2)",
  },
  {
    slug: "kite-and-co",
    name: "Kite & Co.",
    tagline: "Lifecycle marketing for beauty and wellness brands",
    about:
      "Email and SMS programs built around retention math: flows, segmentation, and a quarterly testing roadmap.",
    location: "Melbourne, Australia",
    region: "Asia Pacific",
    languages: ["English"],
    services: ["Email & SMS marketing", "Conversion rate optimization"],
    industries: ["Beauty", "Health & wellness"],
    rating: 4.8,
    reviews: 39,
    projects: 77,
    startingPrice: "From $1,200",
    website: "https://kiteandco.example.com",
    phone: "+61 3 9000 1234",
    email: "hello@kiteandco.example.com",
    initials: "KC",
    accent: "var(--brand-3)",
  },
  {
    slug: "andes-commerce",
    name: "Andes Commerce",
    tagline: "Bilingual store builds across Latin America",
    about:
      "Migrations, localization and multi-currency setups for brands expanding into Spanish and Portuguese speaking markets.",
    location: "Bogotá, Colombia",
    region: "Latin America",
    languages: ["Spanish", "Portuguese", "English"],
    services: ["Store migration", "Store setup", "SEO"],
    industries: ["Fashion & apparel", "Food & beverage"],
    rating: 4.6,
    reviews: 28,
    projects: 51,
    startingPrice: "From $1,000",
    website: "https://andescommerce.example.com",
    phone: "+57 1 555 0132",
    email: "contacto@andescommerce.example.com",
    initials: "AC",
    accent: "var(--brand-4)",
  },
  {
    slug: "orbit-growth",
    name: "Orbit Growth",
    tagline: "Search and paid acquisition, measured properly",
    about:
      "Technical SEO, server-side tracking and paid search management for catalogs with thousands of SKUs.",
    location: "Manchester, United Kingdom",
    region: "Europe",
    languages: ["English"],
    services: ["SEO", "Paid media", "Analytics & tracking"],
    industries: ["Electronics", "Home & garden", "B2B & wholesale"],
    rating: 4.7,
    reviews: 72,
    projects: 148,
    startingPrice: "From $2,400",
    website: "https://orbitgrowth.example.com",
    phone: "+44 161 555 0117",
    email: "hello@orbitgrowth.example.com",
    initials: "OG",
    accent: "var(--brand)",
  },
];

export function getExpert(slug: string) {
  return experts.find((e) => e.slug === slug);
}
