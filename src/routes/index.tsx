import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { experts, SERVICES, REGIONS, INDUSTRIES } from "@/data/experts";
import { ExpertCard } from "@/components/directory/ExpertCard";
import { SiteHeader } from "@/components/directory/SiteHeader";
import { SiteFooter } from "@/components/directory/SiteFooter";

export const Route = createFileRoute("/")({
  component: DirectoryPage,
  head: () => ({
    meta: [
      { title: "Shopify Partner Directory — Hire Vetted Commerce Experts" },
      {
        name: "description",
        content:
          "Browse vetted commerce agencies, designers and developers by service, region and industry. Compare ratings, pricing and contact partners directly.",
      },
      { property: "og:title", content: "Shopify Partner Directory — Hire Vetted Commerce Experts" },
      {
        property: "og:description",
        content:
          "Browse vetted commerce agencies, designers and developers by service, region and industry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = experts.filter((e) => {
      const matchesQuery =
        !q ||
        [e.name, e.tagline, e.location, ...e.services, ...e.industries]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return (
        matchesQuery &&
        (!service || e.services.includes(service)) &&
        (!region || e.region === region) &&
        (!industry || e.industries.includes(industry))
      );
    });

    return [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "reviews") return b.reviews - a.reviews;
      if (sort === "projects") return b.projects - a.projects;
      return Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating;
    });
  }, [query, service, region, industry, sort]);

  const clear = () => {
    setService(null);
    setRegion(null);
    setIndustry(null);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-10 py-12 md:grid-cols-[1fr_22rem] md:py-16">
          <div>
            <h1 className="max-w-xl text-4xl font-medium leading-tight md:text-5xl">Find service partners</h1>
            <p className="mt-3 max-w-lg text-base text-muted-foreground">
              Browse by price, location, services, and more to find a partner that meets your needs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICES.slice(0, 6).map((s) => (
                <Chip key={s} active={service === s} onClick={() => setService(service === s ? null : s)}>{s}</Chip>
              ))}
            </div>
          </div>
          <div className="hidden grid-cols-2 gap-3 md:grid" aria-hidden="true">
            <div className="aspect-[3/4] rounded-md bg-primary/15 p-4"><div className="h-full rounded-sm border border-primary/20 bg-card" /></div>
            <div className="mt-8 aspect-[3/4] rounded-md bg-accent p-4"><div className="h-full rounded-sm border border-primary/15 bg-surface" /></div>
          </div>
        </div>
      </section>

      <section id="experts" className="container-page grid gap-8 py-10 md:grid-cols-[15rem_1fr]">
        <aside id="services" className="h-fit border-b border-border pb-8 md:sticky md:top-28 md:border-b-0 md:pb-0">
          <div className="flex items-center gap-2 border-b border-border pb-3 text-xl font-medium"><SlidersHorizontal className="size-5" /> Filter</div>
          <label className="mt-5 block text-sm font-semibold">Price range (USD)</label>
          <div className="mt-2 grid grid-cols-2 gap-2"><input className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm" placeholder="Min" /><input className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm" placeholder="Max" /></div>
          <FilterSelect label="Service" value={service ?? ""} onChange={(v) => setService(v || null)} options={SERVICES} placeholder="Select a service" />
          <FilterSelect label="Location" value={region ?? ""} onChange={(v) => setRegion(v || null)} options={REGIONS} placeholder="Select a location" />
          <div id="industries"><FilterSelect label="Industry" value={industry ?? ""} onChange={(v) => setIndustry(v || null)} options={INDUSTRIES} placeholder="Select an industry" /></div>
          {(service || region || industry || query) && <button type="button" onClick={clear} className="mt-5 text-sm font-medium underline underline-offset-4">Clear all filters</button>}
        </aside>

        <div>
          <div className="mb-5 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 md:hidden">
            <Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Search partners" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1–{results.length}</span> of {experts.length} partners
          </p>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-sm border border-border bg-card px-3 py-2 text-sm text-foreground outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest rated</option>
              <option value="reviews">Most reviews</option>
              <option value="projects">Most projects</option>
            </select>
          </label>
        </div>

          </div>
        <div className="mt-5 space-y-3">
          {results.map((e) => (
            <ExpertCard key={e.slug} expert={e} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-10 rounded-md border border-dashed border-border p-12 text-center">
            <MapPin className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No partners match those filters yet. Try widening your search.
            </p>
          </div>
        )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[]; placeholder: string }) {
  return <label className="mt-5 block text-sm font-semibold">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-sm border border-border bg-card px-3 py-2 text-sm font-normal text-foreground"><option value="">{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
