import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-amber-500 text-slate-900 hover:bg-amber-400 focus:ring-amber-500/50",
  secondary:
    "bg-slate-700/50 text-foreground hover:bg-slate-600/50 focus:ring-slate-500/50 dark:bg-slate-600/30 dark:hover:bg-slate-500/40",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/10 focus:ring-foreground/20",
  outline:
    "border-2 border-amber-500/70 text-amber-500 hover:bg-amber-500/10 focus:ring-amber-500/50",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface ButtonProps extends ButtonBaseProps {
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      className = "",
      children,
      href,
      type = "button",
      onClick,
      disabled,
      ...rest
    },
    ref
  ) {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
