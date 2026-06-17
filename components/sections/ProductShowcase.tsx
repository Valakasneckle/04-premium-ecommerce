import Link from "next/link";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const showcaseProducts = products.slice(0, 4);

export function ProductShowcase() {
  return (
    <Section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-foreground)]">Workspace Essentials</h2>
          <p className="text-[var(--color-muted-foreground)] mt-1">
            Curated products for a cleaner, smarter, more productive setup.
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" size="md">Browse Catalog</Button>
        </Link>
      </div>
      <ProductGrid products={showcaseProducts} />
    </Section>
  );
}
