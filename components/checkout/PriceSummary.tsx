import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Truck } from "lucide-react";

interface PriceSummaryProps {
  className?: string;
  compact?: boolean;
}

export function PriceSummary({ className, compact = false }: PriceSummaryProps) {
  const { subtotal, tax, shipping, total } = useCartStore();
  const sub = subtotal();
  const taxAmt = tax();
  const ship = shipping();
  const tot = total();

  return (
    <div className={cn("space-y-2", className)}>
      {!compact && (
        <h3 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-3">
          Order Summary
        </h3>
      )}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-[var(--color-secondary)]">
          <span>Subtotal</span>
          <span className="font-medium text-[var(--color-foreground)] tabular">{formatPrice(sub)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-secondary)]">
          <span>Tax (8%)</span>
          <span className="font-medium text-[var(--color-foreground)] tabular">{formatPrice(taxAmt)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-secondary)]">
          <span>Shipping</span>
          {ship === 0 ? (
            <span className="font-medium text-[var(--color-success)] flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              Free
            </span>
          ) : (
            <span className="font-medium text-[var(--color-foreground)] tabular">{formatPrice(ship)}</span>
          )}
        </div>
        {sub > 0 && sub < 100 && (
          <p className="text-xs text-[var(--color-muted-foreground)] flex items-center gap-1">
            <Truck className="w-3 h-3" />
            Add {formatPrice(100 - sub)} more for free shipping
          </p>
        )}
      </div>
      <div className="border-t border-[var(--color-border)] pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[var(--color-foreground)]">Total</span>
          <span className="text-xl font-bold text-[var(--color-foreground)] tabular">{formatPrice(tot)}</span>
        </div>
      </div>
    </div>
  );
}
