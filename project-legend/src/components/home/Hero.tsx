"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useContent } from "@/lib/useContent";

const defaultHero = {
  headline: "Making Physics Accessible",
  subheadline:
    "Renowned physicist and author of Concepts of Physics. Empowering students to understand the beauty and logic of the physical world.",
  primaryCtaText: "Explore Books",
  primaryCtaHref: "/books",
  secondaryCtaText: "Physics Concepts",
  secondaryCtaHref: "/concepts",
};

export function Hero() {
  const hero = useContent("hero", defaultHero);

  // Animation variants
  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item: any = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  const textContainer: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const letterAnim: any = {
    hidden: { opacity: 0, y: 40, rotateX: -90, scale: 0.8 },
    show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 200 } },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16">
      <div className="absolute inset-0 z-[-1] pointer-events-none rounded-full blur-[120px] bg-accent/10 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent shadow-[0_0_15px_rgba(14,165,233,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Official Portal for HC Verma
        </motion.div>

        <motion.div variants={item}>
          <motion.h1
            variants={textContainer}
            initial="hidden"
            animate="show"
            className="font-heading text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-foreground mb-6 flex flex-wrap justify-center perspective-[1000px]"
          >
            {hero.headline?.split(" ").map((word: string, wordIdx: number) => {
              const isSpecial = /accessible/i.test(word);
              return (
                <span key={wordIdx} className="mr-3 md:mr-5 flex overflow-hidden pb-4">
                  {word.split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={letterAnim}
                      className={`inline-block ${
                        isSpecial
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-muted drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                          : ""
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </motion.h1>
        </motion.div>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl font-light leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto"
        >
          <Button href={hero.primaryCtaHref || "/books"} variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4 shadow-glow hover:scale-105 transition-transform">
            {hero.primaryCtaText || "Explore Books"}
          </Button>
          <Button href={hero.secondaryCtaHref || "/concepts"} variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 bg-white/40 backdrop-blur-md border border-white/60 hover:bg-white/60 transition-all text-foreground hover:scale-105">
            {hero.secondaryCtaText || "Physics Concepts"}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
