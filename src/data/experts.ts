import brainboxLogo from "@/assets/brainboxworld-logo.png.asset.json";
import gillcoLogo from "@/assets/gillco-logo.jpg.asset.json";
import heroesLogo from "@/assets/heroes-agency-logo.png.asset.json";
import deepeaceLogo from "@/assets/deepeace-logo.jpg.asset.json";
import lowkeyLogo from "@/assets/lowkey-logo.png.asset.json";
import blaqachrafLogo from "@/assets/blaqachraf-logo.png.asset.json";

export type Expert = {
  slug: string;
  name: string;
  tagline: string;
  about: string;
  /** Optional logo image URL. When absent the card/profile falls back to initials. */
  logo?: string;
  location: string;
  address?: string;
  region: string;
  languages: string[];
  services: string[];
  expertise?: string[];
  industries: string[];
  rating: number;
  reviews: number;
  projects: number;
  startingPrice: string;
  website: string;
  phone: string;
  whatsapp?: string;
  email: string;
  initials: string;
  accent: string;
  featured?: boolean;
  memberSince?: string;
};

export const SERVICES = [
  "Store setup",
  "Store migration",
  "Custom theme design",
  "Theme customization",
  "Headless commerce",
  "Conversion rate optimization",
  "SEO",
  "Paid media",
  "Email & SMS marketing",
  "Custom apps",
  "Analytics & tracking",
  "Troubleshooting",
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
  "Jewelry & accessories",
];

export const experts: Expert[] = [
  {
    slug: "brainboxworld",
    name: "Brainboxworld",
    tagline: "Storefront design, development and growth for ambitious online brands",
    about:
      "Brainboxworld is a full-stack commerce studio that designs, builds and optimises online stores. The team pairs product-minded designers with senior developers, so a project moves from wireframe to live storefront without hand-off friction. Typical engagements include new store builds, replatforming from legacy carts, bespoke theme work, custom app development and ongoing conversion programmes. Every build ships with performance budgets, analytics instrumentation and documentation the in-house team can actually use.",
    logo: brainboxLogo.url,
    location: "Torrance, United States",
    address: "444 Alaska Avenue Suite #CPT875, Torrance, CA 90503, USA",
    region: "North America",
    languages: ["English"],
    services: [
      "Store setup",
      "Store migration",
      "Custom theme design",
      "Theme customization",
      "Custom apps",
      "Conversion rate optimization",
      "SEO",
      "Troubleshooting",
    ],
    expertise: [
      "Replatforming & data migration",
      "Design systems & component libraries",
      "Core Web Vitals and page-speed work",
      "Checkout and cart optimisation",
      "Subscription and B2B workflows",
      "Third-party API & ERP integrations",
      "Server-side analytics and tracking",
      "Accessibility remediation",
    ],
    industries: [
      "Fashion & apparel",
      "Beauty",
      "Health & wellness",
      "Electronics",
      "Jewelry & accessories",
      "B2B & wholesale",
    ],
    rating: 5.0,
    reviews: 512,
    projects: 640,
    startingPrice: "From $1,500",
    website: "https://brainboxworld.com",
    phone: "+1 (331) 278-2900",
    whatsapp: "+1 (331) 278-2900",
    email: "info@brainboxworld.com",
    initials: "BB",
    accent: "var(--brand)",
    featured: true,
    memberSince: "September 2015",
  },
  {
    slug: "gillco-digital",
    name: "Gillco Digital",
    tagline: "Full-service commerce partner for growth-stage merchants",
    about:
      "Gillco Digital builds and scales online stores end to end — from storefront design and migration to conversion optimization and paid acquisition. The team works with growth-stage brands that need a single partner across design, development and performance marketing.",
    logo: gillcoLogo.url,
    location: "Toronto, Canada",
    address: "Toronto, Ontario, Canada",
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
    expertise: [
      "Storefront redesigns",
      "Migration from legacy platforms",
      "Landing page experimentation",
      "Paid search and social",
    ],
    industries: ["Fashion & apparel", "Beauty", "Home & garden"],
    rating: 5.0,
    reviews: 118,
    projects: 240,
    startingPrice: "From $1,500",
    website: "https://gillcodigital.com",
    phone: "+1 (581) 781-4936",
    whatsapp: "+1 (581) 781-4936",
    email: "hello@gillcodigital.com",
    initials: "GD",
    accent: "var(--brand-2)",
    featured: true,
    memberSince: "March 2017",
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
    expertise: ["A/B testing programmes", "Lifecycle automation", "Server-side tracking"],
    industries: ["Health & wellness", "Food & beverage", "Electronics"],
    rating: 4.9,
    reviews: 86,
    projects: 173,
    startingPrice: "From $2,000",
    website: "https://c2digital.com",
    phone: "+1 (249) 486-7212",
    whatsapp: "+1 (249) 486-7212",
    email: "hello@c2digital.com",
    initials: "C2",
    accent: "var(--brand-3)",
    featured: true,
    memberSince: "June 2018",
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
    expertise: ["Editorial art direction", "Design systems"],
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
    expertise: ["Local payment gateways", "Logistics integrations", "Merchant training"],
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
    expertise: ["Composable architecture", "ERP/PIM integrations", "Edge caching"],
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
    expertise: ["Retention flows", "Segmentation", "Creative testing"],
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
    expertise: ["Localization", "Multi-currency", "Cross-border logistics"],
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
    expertise: ["Technical SEO", "Feed management", "Server-side tracking"],
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
  {
    slug: "the-heroes-agency",
    name: "The Heroes Agency",
    tagline: "Brand-led storefronts and campaigns for modern commerce teams",
    about:
      "The Heroes Agency partners with founders and marketing teams to build storefronts that look sharp and sell hard. The team covers brand direction, storefront design and build, and the campaign work that follows launch — creative production, paid media and lifecycle marketing — so the store and the demand behind it move together.",
    logo: heroesLogo.url,
    location: "Remote — global",
    region: "Europe",
    languages: ["English"],
    services: [
      "Custom theme design",
      "Store setup",
      "Conversion rate optimization",
      "Paid media",
      "Email & SMS marketing",
      "SEO",
    ],
    expertise: [
      "Brand identity and art direction",
      "Storefront design systems",
      "Campaign creative production",
      "Paid social and search",
      "Lifecycle and retention",
    ],
    industries: ["Fashion & apparel", "Beauty", "Health & wellness"],
    rating: 4.9,
    reviews: 96,
    projects: 180,
    startingPrice: "From $1,800",
    website: "https://www.theheroesagency.org",
    phone: "+1 (331) 278-2900",
    email: "info@heheroesagency.org",
    initials: "HA",
    accent: "var(--brand-2)",
    featured: true,
    memberSince: "January 2023",
  },
  {
    slug: "deepeace-agency",
    name: "DeePeace Agency",
    tagline: "Digital growth, automation and storefront builds",
    about:
      "DeePeace Agency helps merchants launch, migrate and grow online stores. Work spans storefront setup and theme customisation, marketing automation, analytics instrumentation and ongoing optimisation — delivered with clear reporting and hands-on training for the in-house team.",
    logo: deepeaceLogo.url,
    location: "Remote — global",
    region: "Africa",
    languages: ["English"],
    services: [
      "Store setup",
      "Store migration",
      "Theme customization",
      "Email & SMS marketing",
      "Analytics & tracking",
      "SEO",
    ],
    expertise: [
      "Marketing automation",
      "Storefront migrations",
      "Analytics and reporting",
      "Merchant training",
    ],
    industries: ["Fashion & apparel", "Food & beverage", "B2B & wholesale"],
    rating: 4.9,
    reviews: 74,
    projects: 142,
    startingPrice: "From $1,200",
    website: "https://www.deepeaceagency.com",
    phone: "+1 (331) 278-2900",
    email: "contact@deepeaceagency.com",
    initials: "DP",
    accent: "var(--brand-3)",
    featured: true,
    memberSince: "May 2021",
  },
  {
    slug: "lowkey",
    name: "Lowkey",
    tagline: "Quietly effective product and storefront design",
    about:
      "Lowkey is a small design and build team focused on clean, fast storefronts. The work is deliberately restrained: strong typography, tight information architecture and pages that load quickly on the devices customers actually use.",
    logo: lowkeyLogo.url,
    location: "Remote — global",
    region: "Europe",
    languages: ["English"],
    services: ["Custom theme design", "Theme customization", "Store setup", "Conversion rate optimization"],
    expertise: ["Minimal storefront design", "Page-speed optimisation", "Landing pages"],
    industries: ["Fashion & apparel", "Home & garden", "Electronics"],
    rating: 4.8,
    reviews: 47,
    projects: 88,
    startingPrice: "From $1,000",
    website: "https://www.uselowkey.online",
    phone: "+1 (331) 278-2900",
    email: "hello@uselowkey.online",
    initials: "LK",
    accent: "var(--brand-4)",
    memberSince: "August 2022",
  },
  {
    slug: "blaqachraf",
    name: "Blaqachraf",
    tagline: "Creative development and content for growing stores",
    about:
      "Blaqachraf blends creative direction with hands-on development. Typical projects include storefront builds and refreshes, custom sections and product page work, plus the content and creative needed to keep a store looking current.",
    logo: blaqachrafLogo.url,
    location: "Remote — global",
    region: "Africa",
    languages: ["English", "French", "Arabic"],
    services: ["Custom theme design", "Theme customization", "Store setup", "SEO"],
    expertise: ["Custom sections and blocks", "Product page design", "Content and creative"],
    industries: ["Fashion & apparel", "Beauty", "Jewelry & accessories"],
    rating: 4.8,
    reviews: 36,
    projects: 64,
    startingPrice: "From $900",
    website: "https://www.blaqachraf.com",
    phone: "+1 (331) 278-2900",
    email: "info@blaqachraf.com",
    initials: "BA",
    accent: "var(--brand)",
    memberSince: "February 2023",
  },
  {
    slug: "samadant-expert",
    name: "Samadant Expert",
    tagline: "Store setup, troubleshooting and day-to-day storefront support",
    about:
      "Samadant Expert supports merchants with the practical work of running a store: setup, theme fixes, app configuration, and the small changes that pile up week to week. Engagements can be one-off tasks or an ongoing retainer.",
    location: "Remote — global",
    region: "Africa",
    languages: ["English"],
    services: ["Store setup", "Troubleshooting", "Theme customization", "Analytics & tracking"],
    expertise: ["Storefront maintenance", "App configuration", "Bug fixing and QA"],
    industries: ["Fashion & apparel", "Food & beverage", "Health & wellness"],
    rating: 4.7,
    reviews: 31,
    projects: 58,
    startingPrice: "From $600",
    website: "https://www.shopify.com/partners/directory",
    phone: "+1 (331) 278-2900",
    email: "info@brainboxworld.com",
    initials: "SE",
    accent: "var(--brand-2)",
    memberSince: "November 2023",
  },
];

export function getExpert(slug: string) {
  return experts.find((e) => e.slug === slug);
}

export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function telLink(number: string) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}
