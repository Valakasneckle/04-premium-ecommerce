import { cn } from "@/lib/utils";

interface ProductGradientProps {
  gradient: string;
  name: string;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  children?: React.ReactNode;
}

export function ProductGradient({
  gradient,
  name,
  size = "md",
  className,
  children,
}: ProductGradientProps) {
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-full aspect-square",
    lg: "w-full aspect-[4/3]",
    full: "w-full h-full",
  };

  return (
    <div
      className={cn(
        `bg-gradient-to-br ${gradient}`,
        "flex items-center justify-center relative overflow-hidden",
        size !== "full" ? sizeMap[size] : "w-full h-full",
        className
      )}
      aria-label={`${name} product image`}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-4 w-32 h-32 rounded-full bg-black/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 blur-xl" />

      {children ?? (
        <span className="relative z-10 text-white/80 text-xs font-medium text-center px-2 select-none">
          {name}
        </span>
      )}
    </div>
  );
}
