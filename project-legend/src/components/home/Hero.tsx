"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import VantaBackground from "@/components/VantajsBackground/VantaBackground";
import { useContent } from "@/lib/useContent";

const defaultHero = {
  siteName: "H.C. Verma",
  headline: "Making Physics Accessible",
  subheadline:
    "Renowned physicist and author of Concepts of Physics. Empowering students to understand the beauty and logic of the physical world.",
  heroImageUrl: "",
  primaryCtaText: "Explore Books",
  primaryCtaHref: "/books",
  secondaryCtaText: "Physics Concepts",
  secondaryCtaHref: "/concepts",
};

export function Hero() {
  const hero = useContent("hero", defaultHero);

  return (
    <section className="relative min-h-[85vh] flex flex-col-2 items-center justify-center text-center px-4">
      <VantaBackground />
      <section className="relative px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1">
          {/* <div className="flex">
            <img
              src={imageSrc}
              alt="HC Verma"
              className="h-[260px] md:h-[360px] object-contain"
            />
          </div> */}

          <div className="max-w-3xl text-center md:text-left">
            <motion.h1
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hero.headline?.split(/(\s+Accessible\s*)/i).map((part, i) =>
                /accessible/i.test(part.trim()) ? (
                  <span key={i} className="text-amber-500">{part.trim()}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground/70 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button href={hero.primaryCtaHref || "/books"} variant="primary" size="lg">
                {hero.primaryCtaText || "Explore Books"}
              </Button>
              <Button href={hero.secondaryCtaHref || "/concepts"} variant="outline" size="lg">
                {hero.secondaryCtaText || "Physics Concepts"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
}
