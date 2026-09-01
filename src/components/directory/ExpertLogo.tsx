import type { Expert } from "@/data/experts";

export function ExpertLogo({
  expert,
  className = "size-12 rounded-xl text-base",
}: {
  expert: Expert;
  className?: string;
}) {
  if (expert.logo) {
    return (
      <img
        src={expert.logo}
        alt={`${expert.name} logo`}
        loading="lazy"
        className={`shrink-0 border border-border bg-card object-contain p-1 ${className}`}
      />
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center font-display font-bold text-primary-foreground ${className}`}
      style={{ backgroundColor: expert.accent }}
    >
      {expert.initials}
    </span>
  );
}
