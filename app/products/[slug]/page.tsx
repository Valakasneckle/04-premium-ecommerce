"use client";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { cn, formatDiscount, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Minus, Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Truck
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";

type Tab = "description" | "specs" | "reviews";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<Tab>("description");
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    if (added) return;
    addItem(product, qty);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  const discount = product.originalPrice
    ? formatDiscount(product.originalPrice, product.price)
    : null;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)] mb-8">
          <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-[var(--color-foreground)] transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/products?category=${product.category}`} className="hover:text-[var(--color-foreground)] transition-colors capitalize">
            {product.category.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--color-foreground)] font-medium truncate max-w-48">{product.name}</span>
        </nav>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Category + Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[var(--color-muted-foreground)] capitalize">
                {product.category.replace(/-/g, " ")}
              </span>
              {product.badge && (
                <Badge variant={product.badge}>
                  {product.badge === "new" && "New"}
                  {product.badge === "sale" && discount ? `-${discount}% off` : product.badge === "sale" ? "Sale" : ""}
                  {product.badge === "featured" && "Featured"}
                  {product.badge === "bestseller" && "Bestseller"}
                </Badge>
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-[var(--color-muted-foreground)] mt-2">{product.tagline}</p>
            </div>

            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[var(--color-foreground)] tabular">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[var(--color-muted-foreground)] line-through tabular">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="sale">{discount}% off</Badge>
                </>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-2">
              {product.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Quantity + Add to cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-[var(--color-border)] overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold tabular text-[var(--color-foreground)]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stockCount, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                    disabled={qty >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {product.stockCount < 10 ? (
                    <span className="text-amber-600 font-medium">
                      Only {product.stockCount} left!
                    </span>
                  ) : (
                    `${product.stockCount} in stock`
                  )}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                disabled={!product.inStock}
                className={cn(
                  "w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer",
                  added
                    ? "bg-[var(--color-success)] text-white"
                    : product.inStock
                      ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                      : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] cursor-not-allowed"
                )}
                aria-label={`Add ${product.name} to cart`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart — {formatPrice(product.price * qty)}
                  </>
                )}
              </motion.button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-[var(--color-border)]">
              {[
                { icon: Truck, text: "Free shipping over $100" },
                { icon: Shield, text: "2-year warranty" },
                { icon: RotateCcw, text: "30-day returns" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]">
                  <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-[var(--color-border)] gap-1 overflow-x-auto scrollbar-none">
            {(["description", "specs", "reviews"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors cursor-pointer border-b-2 -mb-px",
                  tab === t
                    ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                )}
              >
                {t}
                {t === "reviews" && ` (${product.reviews.length})`}
              </button>
            ))}
          </div>

          <div className="py-8">
            {tab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl space-y-4"
              >
                <p className="text-[var(--color-secondary)] leading-relaxed">{product.description}</p>
                <ul className="grid sm:grid-cols-2 gap-2 mt-6">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
                      <Check className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {tab === "specs" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={cn(
                          "border-b border-[var(--color-border)]",
                          i === 0 && "border-t"
                        )}
                      >
                        <td className="py-3 pr-4 text-sm font-medium text-[var(--color-muted-foreground)] w-1/3">
                          {spec.label}
                        </td>
                        <td className="py-3 text-sm text-[var(--color-foreground)]">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {tab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                {/* Summary */}
                <div className="flex items-center gap-6 p-5 bg-[var(--color-muted)] rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-[var(--color-foreground)] tabular">{product.rating}</div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("w-4 h-4", s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-[var(--color-border)]")} />
                      ))}
                    </div>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                      {product.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                </div>

                {/* Reviews */}
                {product.reviews.map((review) => (
                  <article key={review.id} className="space-y-2 pb-6 border-b border-[var(--color-border)] last:border-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[var(--color-foreground)] text-sm">{review.author}</span>
                          {review.verified && (
                            <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                        <RatingStars rating={review.rating} showCount={false} size="sm" className="mt-0.5" />
                      </div>
                      <time className="text-xs text-[var(--color-muted-foreground)] flex-shrink-0">
                        {new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </time>
                    </div>
                    <h4 className="font-semibold text-[var(--color-foreground)] text-sm">{review.title}</h4>
                    <p className="text-sm text-[var(--color-secondary)] leading-relaxed">{review.body}</p>
                  </article>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">You may also like</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
