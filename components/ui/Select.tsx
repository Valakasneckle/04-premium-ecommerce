import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]",
        "text-sm text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
