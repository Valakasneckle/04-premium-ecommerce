import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingStarsProps) {
  const sizeMap = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  const textMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label={`Rating: ${rating} out of 5 stars${reviewCount !== undefined ? `, ${reviewCount} reviews` : ""}`}
      role="img"
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star <= Math.ceil(rating);
          const fillPercent = partial ? Math.round((rating % 1) * 100) : filled ? 100 : 0;

          return (
            <span key={star} className="relative inline-block" style={{ width: sizeMap[size].split(" ")[0].replace("w-", "") + "px" }}>
              {partial ? (
                <span className="relative">
                  <Star
                    className={cn(sizeMap[size], "text-[var(--color-border)]")}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${fillPercent}%` }}
                  >
                    <Star
                      className={cn(sizeMap[size], "text-amber-400")}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </span>
                </span>
              ) : (
                <Star
                  className={cn(
                    sizeMap[size],
                    filled ? "text-amber-400" : "text-[var(--color-border)]"
                  )}
                  fill="currentColor"
                  strokeWidth={0}
                />
              )}
            </span>
          );
        })}
      </div>
      <span className={cn("font-semibold text-[var(--color-foreground)] tabular", textMap[size])}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn("text-[var(--color-muted-foreground)]", textMap[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
