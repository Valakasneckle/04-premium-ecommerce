import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "sale" | "featured" | "bestseller" | "default" | "outline" | "success";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-indigo-500 text-white",
  sale: "bg-rose-500 text-white",
  featured: "bg-amber-500 text-white",
  bestseller: "bg-emerald-500 text-white",
  default: "bg-[var(--color-primary)] text-white",
  outline: "border border-[var(--color-border)] text-[var(--color-muted-foreground)] bg-transparent",
  success: "bg-emerald-100 text-emerald-700",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
