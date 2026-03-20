"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useContent } from "@/lib/useContent";
import { motion, AnimatePresence } from "framer-motion";

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
      <nav className="hidden md:flex items-center gap-1 relative">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-accent/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 rounded-full text-foreground/80 hover:bg-white/50 backdrop-blur-md transition-all"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="absolute top-full left-0 right-0 mt-4 mx-4 rounded-3xl border border-white/60 bg-white/80 shadow-glass backdrop-blur-2xl md:hidden z-50 overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-5 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "text-accent bg-accent/5 font-semibold"
                        : "text-foreground/70 hover:bg-white/50 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
