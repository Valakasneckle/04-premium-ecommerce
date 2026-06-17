import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full h-11 px-3 rounded-xl border text-sm text-[var(--color-foreground)] bg-[var(--color-card)]",
        "transition-colors duration-150 outline-none placeholder:text-[var(--color-muted-foreground)]",
        "focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20",
        error ? "border-[var(--color-destructive)]" : "border-[var(--color-border)]",
        className
      )}
      {...props}
    />
  );
}
