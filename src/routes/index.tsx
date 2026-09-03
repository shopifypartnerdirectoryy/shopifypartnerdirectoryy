import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, ShieldCheck, Handshake, Rocket } from "lucide-react";
import { experts, SERVICES, REGIONS, INDUSTRIES } from "@/data/experts";
import { ExpertCard } from "@/components/directory/ExpertCard";
import { SiteHeader } from "@/components/directory/SiteHeader";
import { SiteFooter } from "@/components/directory/SiteFooter";

export const Route = createFileRoute("/")({
  component: DirectoryPage,
  head: () => ({
    meta: [
      { title: "Shopify Partner Directory — Assignment Demo" },
      {
        name: "description",
        content:
          "Browse vetted commerce agencies, designers and developers by service, region and industry. Compare ratings, pricing and contact partners directly.",
      },
      { property: "og:title", content: "Shopify Partner Directory — Assignment Demo" },
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
        <div className="container-page py-16 md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-brand" /> Every partner is reviewed before listing
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            Hire a commerce expert who has done it before
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Search agencies and freelancers for store builds, migrations, design, marketing and
            custom development — then reach out to them directly.
          </p>

          <div className="mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
            <Search className="ml-3 size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, service or industry"
              aria-label="Search experts"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <a
              href="#experts"
              className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Search
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            {[
              ["1,200+", "Vetted partners"],
              ["48", "Countries covered"],
              ["4.9", "Average rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-semibold">{v}</dt>
                <dd className="text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="services" className="container-page py-12">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Filter by service
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <Chip key={s} active={service === s} onClick={() => setService(service === s ? null : s)}>
              {s}
            </Chip>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Region
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <Chip key={r} active={region === r} onClick={() => setRegion(region === r ? null : r)}>
                  {r}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Industry
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {INDUSTRIES.map((i) => (
                <Chip
                  key={i}
                  active={industry === i}
                  onClick={() => setIndustry(industry === i ? null : i)}
                >
                  {i}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experts" className="container-page pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{results.length}</span> partners match your
            filters
            {(service || region || industry || query) && (
              <button onClick={clear} className="ml-3 underline underline-offset-4 hover:text-foreground">
                Clear all
              </button>
            )}
          </p>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest rated</option>
              <option value="reviews">Most reviews</option>
              <option value="projects">Most projects</option>
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((e) => (
            <ExpertCard key={e.slug} expert={e} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
            <MapPin className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No partners match those filters yet. Try widening your search.
            </p>
          </div>
        )}
      </section>

      <section id="how" className="border-t border-border bg-surface">
        <div className="container-page py-16">
          <h2 className="text-3xl font-semibold md:text-4xl">How hiring works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Shortlist",
                body: "Filter by service, region and industry, then compare ratings and pricing.",
              },
              {
                icon: Handshake,
                title: "Reach out",
                body: "Contact partners directly by phone, email or their website — no middleman.",
              },
              {
                icon: Rocket,
                title: "Get to work",
                body: "Agree scope and timeline with the partner and start your project.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="size-5 text-brand" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
