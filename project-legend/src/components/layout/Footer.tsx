"use client";

import Link from "next/link";
import { useContent } from "@/lib/useContent";

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
    <footer className="border-t border-slate-200/50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-heading text-lg font-bold text-foreground hover:text-amber-500 transition-colors"
            >
              {siteName}
            </Link>
            <p className="text-sm text-foreground/60 mt-1">{tagline}</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link: { href: string; label: string }) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-amber-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800 text-center">
          <p className="text-sm text-foreground/50">
            © {currentYear} {copyrightName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
