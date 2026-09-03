import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Stars } from "./Stars";
import { averageRating, ratingBreakdown, type Review } from "@/data/reviews";

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ReviewCard({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const long = review.body.length > 190;
  const text = open || !long ? review.body : `${review.body.slice(0, 190).trimEnd()}…`;

  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold">{review.author}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatDate(review.date)} · {review.service}
          </p>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="mt-3 text-sm font-medium">{review.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 text-sm font-medium text-brand hover:underline"
        >
          {open ? "Show less" : "Show more"}
        </button>
      )}
    </article>
  );
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const [sort, setSort] = useState("recent");
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const breakdown = useMemo(() => ratingBreakdown(reviews), [reviews]);
  const average = useMemo(() => averageRating(reviews), [reviews]);

  const filtered = useMemo(() => {
    const list = starFilter ? reviews.filter((r) => r.rating === starFilter) : reviews;
    const sorted = [...list];
    if (sort === "oldest") sorted.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    else if (sort === "highest") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "lowest") sorted.sort((a, b) => a.rating - b.rating);
    else sorted.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return sorted;
  }, [reviews, sort, starFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const setFilter = (star: number | null) => {
    setStarFilter(star);
    setPage(1);
  };

  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pages || Math.abs(p - current) <= 1,
  );

  return (
    <section id="reviews" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-semibold">
          Reviews <span className="text-muted-foreground">({reviews.length})</span>
        </h2>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            aria-label="Sort reviews"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground outline-none"
          >
            <option value="recent">Most recent</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </label>
      </div>


      <div className="mt-5 grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-[auto_1fr]">
        <div className="text-center sm:text-left">
          <div className="font-display text-4xl font-semibold">{average.toFixed(1)}</div>
          <div className="mt-1 flex justify-center sm:justify-start">
            <Stars rating={average} />
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{reviews.length} reviews</div>
        </div>
        <div className="space-y-1.5">
          {breakdown.map((b) => (
            <button
              key={b.star}
              type="button"
              onClick={() => setFilter(starFilter === b.star ? null : b.star)}
              aria-pressed={starFilter === b.star}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-xs transition-colors hover:bg-card ${
                starFilter === b.star ? "bg-card" : ""
              }`}
            >
              <span className="w-10 shrink-0 text-left text-muted-foreground">{b.star} star</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{ width: `${b.pct}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right text-muted-foreground">{b.count}</span>
            </button>
          ))}
        </div>
      </div>

      {starFilter && (
        <button
          type="button"
          onClick={() => setFilter(null)}
          className="mt-4 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear {starFilter}-star filter ✕
        </button>
      )}

      <div className="mt-5 space-y-4">
        {slice.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <MessageSquare className="size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">No reviews match this filter</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different rating or clear the filter.
            </p>
          </div>
        ) : (
          slice.map((r) => <ReviewCard key={r.id} review={r} />)
        )}
      </div>

      {pages > 1 && (
        <nav
          aria-label="Reviews pagination"
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm disabled:opacity-40"
          >
            <ChevronLeft className="size-4" /> Prev
          </button>
          {pageNumbers.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              {i > 0 && p - pageNumbers[i - 1]! > 1 && (
                <span className="text-sm text-muted-foreground">…</span>
              )}
              <button
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === current ? "page" : undefined}
                className={`min-w-9 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  p === current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === pages}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </nav>
      )}
    </section>
  );
}
