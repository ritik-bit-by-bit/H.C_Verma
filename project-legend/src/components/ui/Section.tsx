"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

export function Section({
  children,
  className = "",
  id,
  title,
  subtitle,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 relative ${className}`}
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col items-center text-center"
          >
            {title && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight flex items-center gap-4">
                <span className="h-px w-8 bg-accent/50 hidden md:block"></span>
                {title}
                <span className="h-px w-8 bg-accent/50 hidden md:block"></span>
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
