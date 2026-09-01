/**
 * Sample/demo review data generated for an educational assignment prototype.
 * All reviewer names, dates and review text are fictional and produced
 * deterministically from a seeded generator — no real reviews are used.
 */

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string; // ISO
  service: string;
  title: string;
  body: string;
};

const FIRST = [
  "Ada", "Marcus", "Priya", "Jonas", "Lena", "Tomas", "Chidi", "Sofia", "Ravi", "Hannah",
  "Diego", "Mei", "Noah", "Zara", "Elias", "Farah", "Kofi", "Ingrid", "Luca", "Nadia",
  "Omar", "Beatriz", "Yuki", "Sam", "Talia", "Victor", "Amara", "Peter", "Nina", "Hugo",
];

const LAST = [
  "Okafor", "Nilsson", "Raman", "Weber", "Costa", "Kim", "Duarte", "Novak", "Haddad", "Bright",
  "Moreau", "Silva", "Tanaka", "Iqbal", "Berg", "Lawson", "Mensah", "Rossi", "Vargas", "Doyle",
];

const SHOPS = [
  "Studio", "Collective", "Supply Co.", "Goods", "Atelier", "Labs", "Trading Co.", "House",
  "& Co.", "Works",
];

const SERVICES = [
  "Store setup",
  "Store migration",
  "Custom theme design",
  "Theme customization",
  "Custom apps",
  "Conversion rate optimization",
  "SEO",
  "Troubleshooting",
];

const TITLES = [
  "Delivered exactly what we scoped",
  "Fast, clear and well organised",
  "Great communication throughout",
  "Our storefront finally feels like our brand",
  "Solved a problem two other teams couldn't",
  "Smooth migration, zero downtime",
  "Measurable lift after launch",
  "Would happily work with them again",
  "Thorough and detail oriented",
  "Strong technical depth",
  "Practical advice, no fluff",
  "Handled a tight deadline well",
];

const OPENERS = [
  "We came in with a rough brief and left with a plan we actually understood.",
  "The kickoff call set clear expectations and the project never drifted from them.",
  "Onboarding was quick — we had a shared roadmap within the first week.",
  "They audited our existing setup before proposing anything, which we appreciated.",
  "Scoping was honest: they told us which items would not move the needle.",
];

const MIDDLES = [
  "Weekly updates meant we always knew what was in progress and what was blocked.",
  "Design revisions came back quickly and each round was clearly better than the last.",
  "The technical work was documented, so our internal developer could pick it up later.",
  "They flagged risks early instead of surfacing them after the deadline.",
  "Testing was thorough across mobile, tablet and desktop before anything shipped.",
  "Performance was treated as a requirement rather than an afterthought.",
  "Analytics were configured properly so we could actually measure the outcome.",
];

const CLOSERS = [
  "We have already scoped a second phase with them.",
  "Recommended for teams that want a partner rather than a vendor.",
  "Support after launch was just as responsive as during the build.",
  "Good value for the level of craft delivered.",
  "The handover documentation alone was worth it.",
  "Happy to be a reference for anyone considering them.",
];

const LOW_NOTES = [
  "A couple of milestones slipped by a few days, though everything was communicated.",
  "Timezone overlap was limited at first, but we settled into a rhythm.",
  "The scope needed one reset partway through, which cost us a week.",
];

/** Small deterministic PRNG so the demo dataset is stable between renders/builds. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function generateReviews(seedKey: string, count: number): Review[] {
  const rnd = mulberry32(hash(seedKey));
  const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)]!;
  const out: Review[] = [];
  const end = Date.UTC(2026, 7, 1);
  const start = Date.UTC(2016, 0, 1);

  for (let i = 0; i < count; i++) {
    const r = rnd();
    const rating = r > 0.12 ? 5 : r > 0.05 ? 4 : r > 0.02 ? 3 : r > 0.008 ? 2 : 1;
    const author =
      rnd() > 0.45
        ? `${pick(FIRST)} ${pick(LAST)}`
        : `${pick(LAST)} ${pick(SHOPS)}`;
    const date = new Date(start + rnd() * (end - start));
    const parts = [pick(OPENERS), pick(MIDDLES)];
    if (rnd() > 0.5) parts.push(pick(MIDDLES));
    if (rating <= 4) parts.push(pick(LOW_NOTES));
    parts.push(pick(CLOSERS));

    out.push({
      id: `${seedKey}-r${i + 1}`,
      author,
      rating,
      date: date.toISOString(),
      service: pick(SERVICES),
      title: pick(TITLES),
      body: parts.join(" "),
    });
  }

  return out.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function ratingBreakdown(reviews: Review[]) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length || 1;
  return counts.map((c) => ({ ...c, pct: Math.round((c.count / total) * 100) }));
}

export function averageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}
