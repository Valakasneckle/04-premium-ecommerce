"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] active:scale-[0.97]",
  secondary:
    "bg-[var(--color-muted)] text-[var(--color-foreground)] hover:bg-[var(--color-border)] active:scale-[0.97]",
  outline:
    "border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)] active:scale-[0.97]",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)] active:scale-[0.97]",
  destructive:
    "bg-[var(--color-destructive)] text-white hover:bg-red-600 active:scale-[0.97]",
  accent:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:scale-[0.97]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full",
          "transition-all duration-150 ease-out cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
