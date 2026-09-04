import { Link } from "@tanstack/react-router";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Directory",
    links: [
      { label: "Browse experts", href: "/#experts" },
      { label: "Services", href: "/#services" },
      { label: "Industries", href: "/#industries" },
      { label: "Regions", href: "/#services" },
      { label: "How it works", href: "/#how" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Store setup", href: "/#services" },
      { label: "Store migration", href: "/#services" },
      { label: "Custom theme design", href: "/#services" },
      { label: "Headless commerce", href: "/#services" },
      { label: "Custom apps", href: "/#services" },
    ],
  },
  {
    title: "Marketing",
    links: [
      { label: "Conversion rate optimization", href: "/#services" },
      { label: "SEO", href: "/#services" },
      { label: "Paid media", href: "/#services" },
      { label: "Email & SMS marketing", href: "/#services" },
      { label: "Analytics & tracking", href: "/#services" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Get listed", href: "/#experts" },
      { label: "Listing guidelines", href: "/#how" },
      { label: "Featured partners", href: "/#experts" },
      { label: "Contact", href: "/#experts" },
      { label: "FAQ", href: "/#how" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-5">
        <div>
          <Link to="/" className="font-display text-lg font-semibold">
            Shopify Partner Directory
          </Link>
          <p className="mt-3 max-w-xs text-sm text-footer-muted">
            Find and hire vetted commerce agencies, designers and developers — filter by service,
            region and industry, then contact partners directly.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold">{col.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-footer-muted">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a className="transition-colors hover:text-footer-foreground" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-footer-foreground/10">
        <div className="container-page py-5 text-xs text-footer-muted">
          © {new Date().getFullYear()} Shopify Partner Directory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
