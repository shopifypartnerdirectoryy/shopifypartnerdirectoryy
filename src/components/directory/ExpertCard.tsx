import { Link } from "@tanstack/react-router";
import type { Expert } from "@/data/experts";
import { Stars } from "./Stars";
import { ExpertLogo } from "./ExpertLogo";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link
      to="/experts/$slug"
      params={{ slug: expert.slug }}
      className="group block rounded-md border border-border bg-card px-5 py-5 transition-colors hover:border-primary/30 hover:bg-surface/40 hover:shadow-sm md:px-6"
    >
      <div className="flex items-start gap-4 md:gap-6">
        <ExpertLogo expert={expert} className="size-16 text-base md:size-18" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold group-hover:underline">{expert.name}</h3>
            {expert.featured && (
              <span className="rounded-sm bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                Featured partner
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            <Stars rating={expert.rating} reviews={expert.reviews} />
            <span aria-hidden="true">·</span>
            <span>{expert.location}</span>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Price range for services <span className="font-medium text-foreground">{expert.startingPrice}</span>
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Services: </span>
            {expert.services.slice(0, 4).join(", ")}
            {expert.services.length > 4 ? ` + ${expert.services.length - 4} more` : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
