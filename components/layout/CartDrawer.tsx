"use client";

import { PriceSummary } from "@/components/checkout/PriceSummary";
import { ProductGradient } from "@/components/product/ProductGradient";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-45"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--color-card)] shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--color-accent)]" />
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[var(--color-muted)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-[var(--color-muted-foreground)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-foreground)] mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      Add some products to get started
                    </p>
                  </div>
                  <Link href="/products" onClick={closeCart}>
                    <Button variant="accent" size="md">Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border)]" aria-label="Cart items">
                  {items.map((item) => (
                    <motion.li
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      className="flex gap-4 px-6 py-4"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <ProductGradient
                          gradient={item.product.gradient}
                          name={item.product.name}
                          size="sm"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm font-bold text-[var(--color-foreground)] mt-0.5 tabular">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>

                        {/* Quantity + remove */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center rounded-full border border-[var(--color-border)] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium tabular">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] hover:bg-red-50 transition-colors cursor-pointer"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[var(--color-border)] bg-[var(--color-muted)] space-y-4">
                <PriceSummary compact />
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="accent" size="lg" fullWidth>
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" size="md" fullWidth>
                    View Full Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
