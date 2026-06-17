"use client";

import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatDiscount, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProductGradient } from "./ProductGradient";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? formatDiscount(product.originalPrice, product.price)
    : null;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-[var(--color-card)] rounded-2xl overflow-hidden border border-[var(--color-border)] flex flex-col"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <ProductGradient
            gradient={product.gradient}
            name={product.name}
            size="full"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={product.badge}>
              {product.badge === "new" && "New"}
              {product.badge === "sale" && discount ? `-${discount}%` : product.badge === "sale" ? "Sale" : ""}
              {product.badge === "featured" && "Featured"}
              {product.badge === "bestseller" && "Bestseller"}
            </Badge>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          <p className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider font-medium mb-1">
            {product.category.replace(/-/g, " ")}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-[var(--color-foreground)] text-sm leading-snug line-clamp-2 hover:text-[var(--color-accent)] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[var(--color-foreground)] tabular">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--color-muted-foreground)] line-through tabular">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              transition-all duration-200 cursor-pointer
              ${added
                ? "bg-[var(--color-success)] text-white"
                : product.inStock
                  ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                  : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] cursor-not-allowed"
              }
            `}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
