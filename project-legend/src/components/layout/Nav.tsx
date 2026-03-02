"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useContent } from "@/lib/useContent";

const defaultNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/concepts", label: "Concepts" },
  { href: "/lectures", label: "Lectures" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = useContent("navLinks", defaultNavLinks);
  const links = Array.isArray(navLinks) ? navLinks : defaultNavLinks;

  return (
    <>
      <nav className="hidden md:flex items-center gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.href
                ? "text-amber-500 bg-amber-500/10"
                : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 rounded-lg text-foreground/80 hover:bg-foreground/10"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 rounded-xl border border-slate-700/50 dark:border-slate-600 bg-background shadow-xl md:hidden z-50 overflow-hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium border-b border-slate-200 dark:border-slate-700/50 last:border-0 ${
                pathname === link.href
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-foreground/80 hover:bg-foreground/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
