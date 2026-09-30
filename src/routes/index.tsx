import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { experts, SERVICES, REGIONS, INDUSTRIES } from "@/data/experts";
import { ExpertCard } from "@/components/directory/ExpertCard";
import { SiteHeader } from "@/components/directory/SiteHeader";
import { SiteFooter } from "@/components/directory/SiteFooter";
import { Button } from "@/components/ui/button";

const siteUrl = "https://shopifypartnerdirectoryy.lovable.app";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 150) : "",
    service: typeof search.service === "string" ? search.service : "",
    country: typeof search.country === "string" ? search.country : "",
  }),
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
      { property: "og:url", content: siteUrl },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "CollectionPage", name: "Shopify Partner Directory",
      description: "Browse commerce service partners by service, location and industry.", url: siteUrl,
      mainEntity: { "@type": "ItemList", itemListElement: experts.map((expert, index) => ({
        "@type": "ListItem", position: index + 1, name: expert.name, url: `${siteUrl}/experts/${expert.slug}`,
      })) },
    }) }],
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
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={`h-8 rounded-full border px-3.5 text-xs shadow-none transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </Button>
  );
}

function DirectoryPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q);
  const [service, setService] = useState<string | null>(search.service || null);
  const [region, setRegion] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [country, setCountry] = useState(search.country);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setQuery(search.q);
    setService(search.service || null);
    setCountry(search.country);
  }, [search.q, search.service, search.country]);

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
        (!industry || e.industries.includes(industry)) &&
        (!country || e.location.toLowerCase().includes(country.toLowerCase())) &&
        (!minPrice || Number(e.startingPrice.replace(/[^\d]/g, "")) >= Number(minPrice)) &&
        (!maxPrice || Number(e.startingPrice.replace(/[^\d]/g, "")) <= Number(maxPrice))
      );
    });

    return [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "reviews") return b.reviews - a.reviews;
      if (sort === "projects") return b.projects - a.projects;
      return Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating;
    });
  }, [query, service, region, industry, country, minPrice, maxPrice, sort]);

  const clear = () => {
    setService(null);
    setRegion(null);
    setIndustry(null);
    setCountry("");
    setMinPrice("");
    setMaxPrice("");
    setQuery("");
    if (typeof window !== "undefined") window.history.replaceState(window.history.state, "", "/#experts");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-11 md:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase text-primary">The partner directory <span className="mx-2 text-border">/</span> {experts.length} partners</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">Find the right partner for what’s next.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Explore commerce specialists by service, location and industry. Compare their work and connect directly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {SERVICES.slice(0, 6).map((s) => (
                <Chip key={s} active={service === s} onClick={() => setService(service === s ? null : s)}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experts" className="container-page grid scroll-mt-36 gap-8 py-10 md:grid-cols-[15rem_1fr]">
        <aside id="services" className="h-fit border-b border-border pb-8 md:sticky md:top-36 md:border-b-0 md:pb-0">
          <div className="flex items-center gap-2 border-b border-border pb-3 text-lg font-semibold"><SlidersHorizontal className="size-4" /> Filters</div>
          <label className="mt-5 block text-sm font-semibold">Price range (USD)</label>
          <div className="mt-2 grid grid-cols-2 gap-2"><input type="number" min="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} aria-label="Minimum starting price" className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm" placeholder="Min" /><input type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} aria-label="Maximum starting price" className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm" placeholder="Max" /></div>
          <FilterSelect label="Service" value={service ?? ""} onChange={(v) => setService(v || null)} options={SERVICES} placeholder="Select a service" />
          <FilterSelect label="Location" value={region ?? ""} onChange={(v) => setRegion(v || null)} options={REGIONS} placeholder="Select a location" />
          {country && <div className="mt-4 flex items-center justify-between rounded-sm bg-accent px-3 py-2 text-sm"><span>Country: {country}</span><Button variant="ghost" size="sm" onClick={() => setCountry("")} aria-label="Clear country filter" className="h-6 px-2">×</Button></div>}
          <div id="industries"><FilterSelect label="Industry" value={industry ?? ""} onChange={(v) => setIndustry(v || null)} options={INDUSTRIES} placeholder="Select an industry" /></div>
          {(service || region || industry || query || country || minPrice || maxPrice) && <Button type="button" variant="link" onClick={clear} className="mt-4 h-8 px-0 text-sm">Clear all filters</Button>}
        </aside>

        <div>
          <div className="mb-5 flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 md:hidden">
            <Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Search partners" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{results.length}</span> {results.length === 1 ? "partner" : "partners"} found
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

         <div className="mt-5 space-y-3">
          {results.map((e) => (
            <ExpertCard key={e.slug} expert={e} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-10 rounded-md border border-dashed border-border p-12 text-center">
            <MapPin className="mx-auto size-6 text-muted-foreground" />
             <p className="mt-3 text-sm text-muted-foreground">No partners match these filters yet.</p>
             <Button variant="link" onClick={clear} className="mt-2">Clear filters <ArrowUpRight className="size-4" /></Button>
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
