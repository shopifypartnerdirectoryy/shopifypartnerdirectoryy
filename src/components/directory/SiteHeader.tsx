import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-40">
      <div className="bg-primary px-4 py-1.5 text-center text-[11px] font-medium text-primary-foreground">
        Educational prototype — an independent student assignment. Not affiliated with or endorsed
        by any real directory or business.
      </div>
      <header className="border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold">
              PD
            </span>
            <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
              Shopify Partner Directory
              <span className="ml-1.5 hidden text-xs font-normal text-muted-foreground sm:inline">
                Assignment Demo
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="/#experts" className="transition-colors hover:text-foreground">
              Browse experts
            </a>
            <a href="/#services" className="transition-colors hover:text-foreground">
              Services
            </a>
            <a href="/#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
          </nav>
          <Link
            to="/experts/$slug"
            params={{ slug: "brainboxworld" }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Featured partner
          </Link>
        </div>
      </header>
    </div>
  );
}
