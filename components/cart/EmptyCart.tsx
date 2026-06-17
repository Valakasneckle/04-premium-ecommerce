import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-6 text-center max-w-sm px-6">
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
    </div>
  );
}
