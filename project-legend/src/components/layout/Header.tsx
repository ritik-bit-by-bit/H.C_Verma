"use client";

import Link from "next/link";
import { Nav } from "./Nav";
import { useContent } from "@/lib/useContent";
import { motion } from "framer-motion";

const defaultHero = { siteName: "H.C. Verma" };

export function Header() {
  const hero = useContent("hero", defaultHero);
  const siteName = hero?.siteName || "H.C. Verma";

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-4 z-40 w-full mx-auto max-w-5xl px-4"
    >
      <div className="flex h-16 items-center justify-between rounded-full border border-white/60 bg-white/40 px-6 shadow-glass backdrop-blur-xl transition hover:shadow-glass-hover">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-foreground transition-all hover:text-accent hover:scale-[1.02]"
        >
          {siteName}
        </Link>
        <Nav />
      </div>
    </motion.header>
  );
}
