import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Globe,
  Phone,
  Mail,
  MapPin,
  Languages,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { getExpert, experts, whatsappLink, telLink } from "@/data/experts";
import { generateReviews } from "@/data/reviews";
import { Stars } from "@/components/directory/Stars";
import { ExpertCard } from "@/components/directory/ExpertCard";
import { ExpertLogo } from "@/components/directory/ExpertLogo";
import { ReviewsSection } from "@/components/directory/ReviewsSection";
import { SiteHeader } from "@/components/directory/SiteHeader";
import { SiteFooter } from "@/components/directory/SiteFooter";

export const Route = createFileRoute("/experts/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const expert = getExpert(params.slug);
    if (!expert) throw notFound();
    return expert;
  },
  component: ExpertPage,
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Partner";
    const desc = loaderData?.tagline ?? "Commerce partner profile";
    const url = loaderData ? `https://shopifypartnerdirectoryy.lovable.app/experts/${loaderData.slug}` : "";
    return {
      meta: [
        { title: `${name} — Shopify Partner Directory` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Partner profile` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
        ...(url ? [{ property: "og:url", content: url }] : [{ name: "robots", content: "noindex" }]),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
      scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "ProfessionalService", name: loaderData.name,
        description: loaderData.tagline, url: loaderData.website, telephone: loaderData.phone,
        email: loaderData.email, areaServed: loaderData.location, serviceType: loaderData.services,
        mainEntityOfPage: url,
        ...(loaderData.address ? { address: { "@type": "PostalAddress", streetAddress: loaderData.address } } : {}),
      }) }] : [],
    };
  },
});

function ExpertPage() {
  const expert = Route.useLoaderData();
  const related = experts.filter((e) => e.slug !== expert.slug).slice(0, 3);
  const reviews = useMemo(
    () => generateReviews(expert.slug, expert.reviews),
    [expert.slug, expert.reviews],
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="border-b border-border bg-surface">
        <div className="container-page py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to directory
          </Link>

        </div>
      </div>

      <div className="container-page grid items-start gap-10 py-10 lg:grid-cols-[18rem_1fr]">
        <div className="order-2 min-w-0">
          <h2 className="text-xl font-semibold">About</h2>
          <h3 className="mt-5 text-sm font-semibold">Business description</h3>
          <p className="mt-3 text-muted-foreground">{expert.about}</p>

          <h2 className="mt-10 text-xl font-semibold">Specialized services</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {expert.services.map((s) => (
              <li
                key={s}
                className="flex items-center justify-between py-4 text-sm font-medium"
              >
                {s} <span className="grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">+</span>
              </li>
            ))}
          </ul>

          {expert.expertise && expert.expertise.length > 0 && (
            <>
              <h2 className="mt-10 text-xl font-semibold">Expertise</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {expert.expertise.map((x) => (
                  <li
                    key={x}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
                  >
                    <Sparkles className="size-4 shrink-0 text-brand" /> {x}
                  </li>
                ))}
              </ul>
            </>
          )}

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

          <section id="contact" className="mt-12 scroll-mt-24 rounded-md border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold">Contact {expert.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Reach the team directly by email, phone or WhatsApp.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`mailto:${expert.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="size-4" /> {expert.email}
              </a>
              <a
                href={telLink(expert.phone)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40"
              >
                <Phone className="size-4" /> {expert.phone}
              </a>
              {expert.whatsapp && (
                <a
                  href={whatsappLink(expert.whatsapp, `Hi ${expert.name}, I found you on the directory.`)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40"
                >
                  <MessageCircle className="size-4" /> Chat on WhatsApp
                </a>
              )}
            </div>
            {expert.address && (
              <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" /> {expert.address}
              </p>
            )}
          </section>

          <div className="mt-12">
            <ReviewsSection reviews={reviews} />
          </div>
        </div>

        <aside className="order-1 h-fit rounded-md border border-border bg-card p-5 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3">
            <ExpertLogo expert={expert} className="size-18 text-lg" />
            <span className="inline-flex items-center gap-1 rounded-sm bg-accent px-2 py-1 text-[11px] font-medium text-accent-foreground"><CheckCircle2 className="size-3" /> Verified</span>
          </div>
          <h1 className="mt-5 text-2xl font-medium">{expert.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{expert.tagline}</p>
          <div className="mt-3"><Stars rating={expert.rating} reviews={expert.reviews} /></div>

          <a href="#contact" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"><Mail className="size-4" /> Contact</a>

          <div className="mt-6 text-sm font-semibold text-muted-foreground">Price range for selected services</div>
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
              <dt className="text-muted-foreground">Rating</dt>
              <dd className="font-medium">{expert.rating.toFixed(1)} / 5</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Region</dt>
              <dd className="font-medium">{expert.region}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0" /> {expert.location}</div>
            <div className="flex items-start gap-2 text-muted-foreground"><Languages className="mt-0.5 size-4 shrink-0" /> {expert.languages.join(", ")}</div>
            {expert.memberSince && <div className="flex items-start gap-2 text-muted-foreground"><CalendarDays className="mt-0.5 size-4 shrink-0" /> Listed since {expert.memberSince}</div>}
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              href={telLink(expert.phone)}
            >
              <Phone className="size-4" /> {expert.phone}
            </a>
            <a
              className="flex items-center gap-2 break-all text-muted-foreground hover:text-foreground"
              href={`mailto:${expert.email}`}
            >
              <Mail className="size-4 shrink-0" /> {expert.email}
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
