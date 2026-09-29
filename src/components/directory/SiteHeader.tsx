import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ChevronDown, ChevronRight, MapPin, Menu, X } from "lucide-react";
import countries from "country-list/data.json";
import { SERVICE_GROUPS, directoryFilterUrl } from "@/lib/directory-navigation";
import { Button } from "@/components/ui/button";

type MenuName = "browse" | "services" | "locations" | null;
const popularCountries = ["United States", "Canada", "India", "United Kingdom", "Australia", "Germany", "France", "Italy"];
const allCountries = [...new Set(countries.map((country) => country.name.replace(/ \(the\)$/, "")))].sort();

export function SiteHeader() {
  const [open, setOpen] = useState<MenuName>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [allLocations, setAllLocations] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (name: Exclude<MenuName, null>) => {
    setOpen(open === name ? null : name);
    setGroup(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="container-page flex min-h-18 items-center gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Shopify Partner Directory home">
          <span className="grid size-9 place-items-center rounded-sm bg-primary font-display text-xs font-bold text-primary-foreground">PD</span>
          <span className="max-w-35 font-display text-sm font-semibold leading-tight sm:max-w-none sm:text-base">Shopify Partner Directory</span>
        </Link>
        <form action="/" method="get" className="hidden h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-card px-3.5 shadow-sm sm:flex lg:ml-6 lg:max-w-xl">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input name="q" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search partners, services or locations" aria-label="Search directory" />
        </form>
        <Link to="/experts/$slug" params={{ slug: "brainboxworld" }} className="ml-auto hidden shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 lg:block">Featured partner</Link>
        <Button variant="ghost" size="icon" className="ml-auto sm:ml-0 lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</Button>
      </div>
      <div className="container-page pb-3 sm:hidden">
        <form action="/" method="get" className="flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3">
          <Search className="size-4 text-muted-foreground" /><input name="q" aria-label="Search directory" placeholder="Search partners" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        </form>
      </div>
      <nav aria-label="Directory navigation" className={`${mobileOpen ? "block" : "hidden"} border-t border-border sm:block`}>
        <div className="container-page relative flex flex-wrap items-center gap-1 py-1.5 sm:gap-5">
          {(["browse", "services", "locations"] as const).map((name) => (
            <Button key={name} variant="ghost" aria-expanded={open === name} aria-controls="directory-menu" onClick={() => toggle(name)} className={`h-9 gap-1 rounded-sm px-3 text-sm capitalize ${open === name ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
              {name} <ChevronDown className={`size-3 transition-transform ${open === name ? "rotate-180" : ""}`} />
            </Button>
          ))}
          <a href="/#industries" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Industries</a>
          {open && (
            <div id="directory-menu" className="absolute left-5 top-full z-50 mt-1 max-h-[min(72vh,38rem)] w-[min(90vw,26rem)] overflow-y-auto rounded-md border border-border bg-card p-2 shadow-xl sm:left-4">
              {open === "browse" && <div className="p-1">
                <a href="/#experts" className="block rounded-sm px-4 py-3 hover:bg-surface"><strong className="block text-sm font-medium">Service partners</strong><span className="text-xs text-muted-foreground">Find a professional for your store</span></a>
                <a href={directoryFilterUrl("service", "Custom apps")} className="block rounded-sm px-4 py-3 hover:bg-surface"><strong className="block text-sm font-medium">Technology solutions</strong><span className="text-xs text-muted-foreground">Explore app and development specialists</span></a>
              </div>}
              {open === "services" && <div className="p-1">
                {SERVICE_GROUPS.map((item) => <div key={item.name}>
                  <Button variant="ghost" aria-expanded={group === item.name} className="flex h-auto min-h-12 w-full justify-between whitespace-normal rounded-sm px-4 py-2 text-left font-normal" onClick={() => setGroup(group === item.name ? null : item.name)}>{item.name}<ChevronRight className={`size-4 ${group === item.name ? "rotate-90" : ""}`} /></Button>
                  {group === item.name && <div className="mb-2 grid gap-0.5 border-l border-border pl-3">{item.services.map((service) => <a key={service} href={directoryFilterUrl("service", service)} className="rounded-sm px-4 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground">{service}</a>)}</div>}
                </div>)}
              </div>}
              {open === "locations" && <div className="p-1">
                <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-muted-foreground"><MapPin className="size-3" /> {allLocations ? "All locations" : "Popular locations"}</div>
                {(allLocations ? allCountries : popularCountries).map((country) => <a key={country} href={directoryFilterUrl("country", country)} className="block rounded-sm px-4 py-2.5 text-sm hover:bg-surface">{country}</a>)}
                <Button variant="ghost" className="mt-1 w-full justify-start px-4 text-sm text-primary" onClick={() => setAllLocations(!allLocations)}>{allLocations ? "Show popular locations" : "View all partner locations"}</Button>
              </div>}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}