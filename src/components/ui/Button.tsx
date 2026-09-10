import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary shadow-[0_4px_20px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-px",
  secondary:
    "bg-surface-container-low text-on-surface hover:bg-surface-container",
};

/**
 * Standard pill-shaped button used across every Logos screen.
 * Use `variant="primary"` for the single main action on a screen
 * (e.g. "Continue with Google", "Add Sermon") and `secondary` for
 * everything else.
 */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
