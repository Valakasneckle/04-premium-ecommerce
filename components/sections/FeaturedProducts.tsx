import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <Section>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Featured Products</h2>
          <p className="text-[var(--color-muted-foreground)] mt-1">Hand-picked for quality and performance.</p>
        </div>
        <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline">
          See all products <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <ProductGrid products={featuredProducts} />
      <div className="flex justify-center mt-10 sm:hidden">
        <Link href="/products">
          <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View all products
          </Button>
        </Link>
      </div>
    </Section>
  );
}
