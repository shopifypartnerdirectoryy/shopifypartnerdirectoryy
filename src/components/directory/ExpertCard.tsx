import { Link } from "@tanstack/react-router";
import type { Expert } from "@/data/experts";
import { Stars } from "./Stars";
import { ExpertLogo } from "./ExpertLogo";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link
      to="/experts/$slug"
      params={{ slug: expert.slug }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl font-display text-base font-bold text-primary-foreground"
          style={{ backgroundColor: expert.accent }}
        >
          {expert.initials}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold">{expert.name}</h3>
            {expert.featured && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                Featured
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{expert.location}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{expert.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {expert.services.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
        {expert.services.length > 3 && (
          <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
            +{expert.services.length - 3}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
        <Stars rating={expert.rating} reviews={expert.reviews} />
        <span className="font-medium text-foreground">{expert.startingPrice}</span>
      </div>
    </Link>
  );
}
