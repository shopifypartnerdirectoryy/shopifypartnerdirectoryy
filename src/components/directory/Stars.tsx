import { Star } from "lucide-react";

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="flex items-center gap-0.5 text-brand">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-3.5"
            fill={i < Math.round(rating) ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </span>
  );
}
