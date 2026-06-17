import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Section } from "@/components/ui/Section";

export function Categories() {
  return (
    <Section className="bg-[var(--color-muted)]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Shop by Category</h2>
        <Link href="/products" className="text-sm font-medium text-[var(--color-accent)] hover:underline flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className="flex-shrink-0 px-4 py-2.5 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-150 whitespace-nowrap"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
