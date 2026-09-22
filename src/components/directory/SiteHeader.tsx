import { Link } from "@tanstack/react-router";
import { Search, ChevronDown } from "lucide-react";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-40 bg-surface">
      <header className="border-b border-border bg-surface/95 backdrop-blur">
        <div className="container-page flex h-14 items-center gap-4 md:gap-8">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid size-7 place-items-center rounded-sm bg-primary font-display text-xs font-bold text-primary-foreground">
              PD
            </span>
            <span className="hidden font-display text-base font-semibold sm:inline">
              Partner Directory
            </span>
          </Link>
          <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 shadow-sm md:max-w-2xl">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search by keyword, service, partner name, or country" aria-label="Search directory" />
          </label>
          <Link to="/experts/$slug" params={{ slug: "brainboxworld" }} className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground sm:block">
            Featured partner
          </Link>
        </div>
        <nav className="container-page hidden h-11 items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#experts" className="flex items-center gap-1 hover:text-foreground">Browse <ChevronDown className="size-3" /></a>
          <a href="/#services" className="flex items-center gap-1 hover:text-foreground">Services <ChevronDown className="size-3" /></a>
          <a href="/#industries" className="flex items-center gap-1 hover:text-foreground">Industries <ChevronDown className="size-3" /></a>
        </nav>
      </header>
    </div>
  );
}
