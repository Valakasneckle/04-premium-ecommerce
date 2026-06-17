"use client";

import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function ProductGrid({
  products,
  loading = false,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
          <Package className="w-7 h-7 text-[var(--color-muted-foreground)]" />
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--color-foreground)] mb-1">
            {emptyMessage}
          </p>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Try adjusting your filters or{" "}
            <Link href="/products" className="text-[var(--color-accent)] hover:underline">
              browse all products
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
