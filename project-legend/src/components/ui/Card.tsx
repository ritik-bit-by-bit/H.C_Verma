import { forwardRef } from "react";

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
      className={`rounded-xl border border-slate-300 dark:border-slate-700/50 bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-sm p-6 transition-all duration-300 ${
        hover
          ? "hover:border-amber-500/50 dark:hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
          : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
});
