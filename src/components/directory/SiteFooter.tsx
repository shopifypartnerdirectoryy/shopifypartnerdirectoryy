export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-lg font-semibold">Partner Directory</div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            An independent directory of vetted commerce agencies, designers and developers.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">Merchants</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#experts">Browse experts</a></li>
            <li><a className="hover:text-foreground" href="#services">Services</a></li>
            <li><a className="hover:text-foreground" href="#how">How it works</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Partners</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#experts">Get listed</a></li>
            <li><a className="hover:text-foreground" href="#how">Listing guidelines</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Support</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#experts">Contact</a></li>
            <li><a className="hover:text-foreground" href="#how">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Partner Directory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
