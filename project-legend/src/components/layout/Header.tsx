"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Nav } from "./Nav";
import { useContent } from "@/lib/useContent";

const defaultHero = { siteName: "H.C. Verma" };

export function Header() {
  const hero = useContent("hero", defaultHero);
  const siteName = hero?.siteName || "H.C. Verma";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-slate-800 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex h-16 items-center justify-between relative">
          <Link
            href="/"
            className="font-heading text-xl font-bold text-foreground hover:text-amber-500 transition-colors"
          >
            {siteName}
          </Link>

          <div className="flex items-center gap-2">
            <Nav />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
