import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CheckoutButton() {
  return (
    <Link href="/checkout">
      <Button variant="accent" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
        Proceed to Checkout
      </Button>
    </Link>
  );
}
