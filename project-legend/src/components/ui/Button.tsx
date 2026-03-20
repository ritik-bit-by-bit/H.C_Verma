import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-glow hover:bg-accent-muted focus:ring-accent/50",
  secondary:
    "bg-white/40 text-foreground backdrop-blur-md border border-white/60 hover:bg-white/60 focus:ring-accent/50",
  ghost:
    "bg-transparent text-foreground hover:bg-white/40 hover:backdrop-blur-md focus:ring-accent/20",
  outline:
    "border-2 border-accent/70 text-accent bg-accent/5 hover:bg-accent/10 focus:ring-accent/50",
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
    { variant = "primary", size = "md", className = "", children, href, type = "button", onClick, disabled, ...rest },
    ref
  ) {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedClassName} ref={ref as React.Ref<HTMLAnchorElement>}>
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
