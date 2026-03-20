import { forwardRef } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className = "", as: Component = "div", hover = true },
  ref
) {
  return (
    <Component
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl p-6 transition-all duration-300 shadow-glass ${
        hover
          ? "hover:border-accent/40 hover:shadow-glass-hover hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      <div className="absolute inset-0 bg-glass-gradient opacity-50 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
});
