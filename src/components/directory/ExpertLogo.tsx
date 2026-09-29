import type { Expert } from "@/data/experts";

export function ExpertLogo({
  expert,
  className = "size-12 text-base",
}: {
  expert: Expert;
  className?: string;
}) {
  if (expert.logo) {
    return (
      <>
      <img
        src={expert.logo}
        alt={`${expert.name} logo`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.hidden = true;
          event.currentTarget.nextElementSibling?.removeAttribute("hidden");
        }}
        className={`aspect-square shrink-0 rounded-full border border-border bg-card object-contain p-1.5 ${className}`}
      />
      <span hidden className={`grid aspect-square shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground ${className}`}>
        {expert.initials}
      </span>
      </>
    );
  }
  return (
    <span
      className={`grid aspect-square shrink-0 place-items-center rounded-full font-display font-bold text-primary-foreground ${className}`}
      style={{ backgroundColor: expert.accent }}
    >
      {expert.initials}
    </span>
  );
}
