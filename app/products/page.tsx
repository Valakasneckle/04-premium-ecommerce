"use client";

import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { PRICE_MAX, PRICE_MIN, products } from "@/lib/products";
import { Category, SortOption } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [loading, setLoading] = useState(false);

  const selectedCategories = searchParams.getAll("category") as Category[];
  const priceMin = Number(searchParams.get("priceMin") ?? PRICE_MIN);
  const priceMax = Number(searchParams.get("priceMax") ?? PRICE_MAX);
  const minRating = Number(searchParams.get("minRating") ?? 0);
  const sort = (searchParams.get("sort") ?? "featured") as SortOption;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [searchParams.toString()]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      case "newest": return list.sort((a, b) => (a.badge === "new" ? -1 : b.badge === "new" ? 1 : 0));
      default: return list.sort((a, b) => (a.badge === "featured" || a.badge === "bestseller" ? -1 : 1) - (b.badge === "featured" || b.badge === "bestseller" ? -1 : 1));
    }
  }, [selectedCategories, priceMin, priceMax, minRating, sort, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) params.set("q", e.target.value);
    else params.delete("q");
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "featured") params.delete("sort");
    else params.set("sort", e.target.value);
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const hasFilters = selectedCategories.length > 0 || priceMin > PRICE_MIN || priceMax < PRICE_MAX || minRating > 0 || search.trim();

  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="bg-[var(--color-muted)] border-b border-[var(--color-border)] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-1">All Products</h1>
          <p className="text-[var(--color-muted-foreground)]">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {selectedCategories.length > 0 && ` in ${selectedCategories.join(", ")}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search products…"
              className="w-full h-10 pl-9 pr-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); const p = new URLSearchParams(searchParams.toString()); p.delete("q"); router.push(`/products?${p.toString()}`, { scroll: false }); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle (mobile) */}
          <Button
            variant="outline"
            size="md"
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            onClick={() => setFiltersOpen((v) => !v)}
            className="lg:hidden"
          >
            Filters {hasFilters ? <span className="ml-1 w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" /> : null}
          </Button>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sort}
              onChange={handleSort}
              className="h-10 pl-3 pr-8 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)] pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <ProductFilters
              selectedCategories={selectedCategories}
              priceMin={priceMin}
              priceMax={priceMax}
              minRating={minRating}
            />
          </aside>

          {/* Mobile filter panel */}
          <AnimatePresence>
            {filtersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                  onClick={() => setFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-[var(--color-card)] z-50 p-6 overflow-y-auto lg:hidden"
                >
                  <ProductFilters
                    selectedCategories={selectedCategories}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    minRating={minRating}
                    onClose={() => setFiltersOpen(false)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={filtered} loading={loading} emptyMessage="No products match your filters." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-muted-foreground)]">Loading catalog…</div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
