"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { ProductGradient } from "@/components/product/ProductGradient";
import { formatPrice } from "@/lib/format";
import { QuantitySelector } from "@/components/product/QuantitySelector";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-4 sm:p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <Link href={`/products/${item.product.slug}`} className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden">
        <ProductGradient gradient={item.product.gradient} name={item.product.name} size="full" />
      </Link>
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
            onClick={() => onRemove(item.product.id)}
            className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-red-50 text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] transition-colors cursor-pointer"
            aria-label={`Remove ${item.product.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <QuantitySelector
            value={item.quantity}
            max={item.product.stockCount}
            onChange={(qty) => onUpdateQuantity(item.product.id, qty)}
          />
          <div className="text-right">
            <p className="font-bold text-[var(--color-foreground)] tabular">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
