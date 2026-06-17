import { CreditCard } from "lucide-react";

export function PaymentMethod() {
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 flex items-center gap-2">
        <CreditCard className="w-4 h-4 flex-shrink-0" />
        Demo checkout only. No real payment is processed.
      </div>
      <p className="text-sm text-[var(--color-muted-foreground)]">
        Payment fields are handled inside the checkout form for a streamlined multi-step experience.
      </p>
    </div>
  );
}
