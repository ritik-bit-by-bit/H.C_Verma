"use client";

import Link from "next/link";
import { useContent } from "@/lib/useContent";
import { motion } from "framer-motion";

const defaultFooter = {
  siteName: "H.C. Verma",
  tagline: "Making Physics Accessible",
  links: [
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/contact", label: "Contact" },
    { href: "/resources", label: "Resources" },
  ],
  copyrightName: "H.C. Verma",
};

export function Footer() {
  const footer = useContent("footer", defaultFooter);
  const currentYear = new Date().getFullYear();
  const links = Array.isArray(footer?.links) ? footer.links : defaultFooter.links;
  const siteName = footer?.siteName ?? defaultFooter.siteName;
  const tagline = footer?.tagline ?? defaultFooter.tagline;
  const copyrightName = footer?.copyrightName ?? defaultFooter.copyrightName;

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-20 relative z-10"
    >
      <div className="border-t border-white/60 bg-white/30 backdrop-blur-xl shadow-[0_-8px_32px_rgba(14,165,233,0.02)]">
        <div className="container mx-auto px-6 max-w-6xl py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <Link
                href="/"
                className="font-heading text-2xl font-bold tracking-tight text-foreground transition-all hover:text-accent hover:scale-[1.02] inline-block"
              >
                {siteName}
              </Link>
              <p className="text-sm font-medium text-foreground/50 mt-2 tracking-wide uppercase">{tagline}</p>
            </div>

            <nav className="flex flex-wrap justify-center gap-8">
              {links.map((link: { href: string; label: string }) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-12 pt-8 border-t border-white/40 text-center">
            <p className="text-xs font-semibold text-foreground/40 tracking-wider">
              © {currentYear} {copyrightName}. ENGINEERED FOR THE FUTURE.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
