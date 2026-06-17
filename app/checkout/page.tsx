"use client";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PriceSummary } from "@/components/checkout/PriceSummary";
import { ProductGradient } from "@/components/product/ProductGradient";
import { Button } from "@/components/ui/Button";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { CheckoutFormData } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [confirmed, setConfirmed] = useState(false);
  const [orderId] = useState(() => generateOrderId());
  const [orderData, setOrderData] = useState<CheckoutFormData | null>(null);
  const orderTotal = total();

  const handleComplete = (data: CheckoutFormData) => {
    setOrderData(data);
    setConfirmed(true);
    clearCart();
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-muted)] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7 text-[var(--color-muted-foreground)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">Your cart is empty</h2>
          <p className="text-[var(--color-muted-foreground)]">Add some products before checking out.</p>
          <Link href="/products">
            <Button variant="accent" size="md">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-lg w-full mx-4 bg-[var(--color-card)] rounded-3xl border border-[var(--color-border)] p-8 sm:p-10 text-center space-y-6"
          style={{ boxShadow: "var(--shadow-glass)" }}
        >
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
            className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-[var(--color-success)]" />
          </motion.div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Order Confirmed!</h1>
            <p className="text-[var(--color-muted-foreground)] mt-1">
              Thanks{orderData?.firstName ? `, ${orderData.firstName}` : ""}! Your order is on its way.
            </p>
          </div>

          <div className="bg-[var(--color-muted)] rounded-xl p-4 text-left space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-muted-foreground)]">Order ID</span>
              <span className="font-mono font-semibold text-[var(--color-foreground)]">{orderId}</span>
            </div>
            {orderData?.email && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted-foreground)]">Confirmation sent to</span>
                <span className="font-medium text-[var(--color-foreground)]">{orderData.email}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-muted-foreground)]">Total charged</span>
              <span className="font-bold text-[var(--color-foreground)] tabular">{formatPrice(orderTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-muted-foreground)]">Estimated delivery</span>
              <span className="font-medium text-[var(--color-foreground)]">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                {" – "}
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-sm text-indigo-700">
            <Package className="w-4 h-4 flex-shrink-0" />
            We&apos;ll send you a tracking link once your order ships.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/account" className="flex-1">
              <Button variant="outline" size="md" fullWidth>
                View Orders
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button variant="accent" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                Shop More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-6 sm:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <CheckoutForm onComplete={handleComplete} />
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-6 sticky top-24 space-y-5"
              style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="font-semibold text-[var(--color-foreground)]">Your Items</h2>
              <ul className="space-y-3 divide-y divide-[var(--color-border)]">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3 pt-3 first:pt-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <ProductGradient gradient={item.product.gradient} name={item.product.name} size="full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-foreground)] line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-[var(--color-muted-foreground)]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-foreground)] tabular flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[var(--color-border)] pt-4">
                <PriceSummary compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
