import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Globe, Phone, Mail, MapPin, Languages, ArrowLeft, CheckCircle2 } from "lucide-react";
import { getExpert, experts } from "@/data/experts";
import { Stars } from "@/components/directory/Stars";
import { ExpertCard } from "@/components/directory/ExpertCard";
import { SiteHeader } from "@/components/directory/SiteHeader";
import { SiteFooter } from "@/components/directory/SiteFooter";

export const Route = createFileRoute("/experts/$slug")({
  loader: ({ params }) => {
    const expert = getExpert(params.slug);
    if (!expert) throw notFound();
    return expert;
  },
  component: ExpertPage,
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Partner";
    const desc = loaderData?.tagline ?? "Commerce partner profile";
    return {
      meta: [
        { title: `${name} — Partner Directory` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Partner Directory` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function ExpertPage() {
  const expert = Route.useLoaderData();
  const related = experts.filter((e) => e.slug !== expert.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="border-b border-border bg-surface">
        <div className="container-page py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to directory
          </Link>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <span
                className="grid size-16 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold text-primary-foreground"
                style={{ backgroundColor: expert.accent }}
              >
                {expert.initials}
              </span>
              <div>
                <h1 className="text-3xl font-semibold md:text-4xl">{expert.name}</h1>
                <p className="mt-2 max-w-xl text-muted-foreground">{expert.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <Stars rating={expert.rating} reviews={expert.reviews} />
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" /> {expert.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Languages className="size-4" /> {expert.languages.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${expert.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Phone className="size-4" /> {expert.phone}
              </a>
              <a
                href={expert.website}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40"
              >
                <Globe className="size-4" /> Visit website
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-3 text-muted-foreground">{expert.about}</p>

          <h2 className="mt-10 text-xl font-semibold">Services offered</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {expert.services.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm"
              >
                <CheckCircle2 className="size-4 text-brand" /> {s}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">Industries</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {expert.industries.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground">Starting price</div>
          <div className="mt-1 font-display text-2xl font-semibold">{expert.startingPrice}</div>

          <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Projects delivered</dt>
              <dd className="font-medium">{expert.projects}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Reviews</dt>
              <dd className="font-medium">{expert.reviews}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Region</dt>
              <dd className="font-medium">{expert.region}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              href={`tel:${expert.phone.replace(/[^+\d]/g, "")}`}
            >
              <Phone className="size-4" /> {expert.phone}
            </a>
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              href={`mailto:${expert.email}`}
            >
              <Mail className="size-4" /> {expert.email}
            </a>
            <a
              className="flex items-center gap-2 break-all text-muted-foreground hover:text-foreground"
              href={expert.website}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Globe className="size-4 shrink-0" /> {expert.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </aside>
      </div>

      <section className="container-page pb-16">
        <h2 className="text-xl font-semibold">Other partners</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((e) => (
            <ExpertCard key={e.slug} expert={e} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
