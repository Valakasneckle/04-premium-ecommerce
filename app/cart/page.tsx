"use client";

import { PriceSummary } from "@/components/checkout/PriceSummary";
import { ProductGradient } from "@/components/product/ProductGradient";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-6 text-center max-w-sm px-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-[var(--color-muted-foreground)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Your cart is empty</h1>
            <p className="text-[var(--color-muted-foreground)]">
              Looks like you haven&apos;t added anything yet. Let&apos;s change that.
            </p>
          </div>
          <Link href="/products">
            <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Shopping Cart</h1>
            <p className="text-[var(--color-muted-foreground)] mt-0.5">
              {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/products" className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-4 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-4 sm:p-5"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden"
                  >
                    <ProductGradient
                      gradient={item.product.gradient}
                      name={item.product.name}
                      size="full"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider mb-0.5">
                          {item.product.category.replace(/-/g, " ")}
                        </p>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-red-50 text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] transition-colors cursor-pointer"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity */}
                      <div className="flex items-center rounded-full border border-[var(--color-border)] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-semibold tabular text-[var(--color-foreground)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-[var(--color-foreground)] tabular">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-[var(--color-muted-foreground)] tabular">
                            {formatPrice(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-6 sticky top-24"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <PriceSummary />
              <div className="mt-6 space-y-3">
                <Link href="/checkout">
                  <Button variant="accent" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Proceed to Checkout
                  </Button>
                </Link>
                <div className="flex items-center gap-3 justify-center">
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                  <span className="text-xs text-[var(--color-muted-foreground)]">or</span>
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                </div>
                <Link href="/products">
                  <Button variant="outline" size="md" fullWidth>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
