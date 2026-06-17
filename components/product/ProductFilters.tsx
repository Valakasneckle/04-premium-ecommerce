"use client";

import { categories, PRICE_MAX, PRICE_MIN } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { SlidersHorizontal, Star, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ProductFiltersProps {
  selectedCategories: Category[];
  priceMin: number;
  priceMax: number;
  minRating: number;
  onClose?: () => void;
  className?: string;
}

export function ProductFilters({
  selectedCategories,
  priceMin,
  priceMax,
  minRating,
  onClose,
  className,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        params.delete(key);
        if (value === null) continue;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleCategory = (cat: Category) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    updateParams({ category: next.length > 0 ? next : null });
  };

  const clearAll = () => {
    router.push("/products", { scroll: false });
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    priceMin > PRICE_MIN ||
    priceMax < PRICE_MAX ||
    minRating > 0;

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-semibold text-[var(--color-foreground)]">Filters</h2>
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-[var(--color-accent)] hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--color-muted)] text-[var(--color-muted-foreground)] cursor-pointer"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat.id as Category);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-[var(--color-muted)] cursor-pointer group"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded flex items-center justify-center border transition-colors",
                    active
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                      : "border-[var(--color-border)] group-hover:border-[var(--color-accent)]"
                  )}
                >
                  {active && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => toggleCategory(cat.id as Category)}
                  aria-label={cat.label}
                />
                <span className={cn("text-sm", active ? "font-medium text-[var(--color-foreground)]" : "text-[var(--color-secondary)]")}>
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-3">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-[var(--color-muted-foreground)] mb-1 block">Min</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[var(--color-muted-foreground)]">$</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={priceMax}
                  value={priceMin}
                  onChange={(e) => updateParams({ priceMin: e.target.value })}
                  className="w-full h-9 pl-6 pr-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-[var(--color-muted-foreground)] mb-1 block">Max</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[var(--color-muted-foreground)]">$</span>
                <input
                  type="number"
                  min={priceMin}
                  max={PRICE_MAX}
                  value={priceMax}
                  onChange={(e) => updateParams({ priceMax: e.target.value })}
                  className="w-full h-9 pl-6 pr-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <h3 className="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-3">
          Minimum Rating
        </h3>
        <div className="space-y-1">
          {[4.5, 4, 3.5, 0].map((rating) => {
            const label = rating === 0 ? "Any rating" : `${rating}+ stars`;
            const active = minRating === rating;
            return (
              <button
                key={rating}
                onClick={() => updateParams({ minRating: rating > 0 ? String(rating) : null })}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors cursor-pointer",
                  active
                    ? "bg-[var(--color-muted)] font-medium text-[var(--color-foreground)]"
                    : "text-[var(--color-secondary)] hover:bg-[var(--color-muted)]"
                )}
                aria-pressed={active}
              >
                {rating > 0 ? (
                  <>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {label}
                  </>
                ) : (
                  label
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
