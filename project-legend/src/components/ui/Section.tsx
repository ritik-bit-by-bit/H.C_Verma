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
      className={`py-16 md:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
