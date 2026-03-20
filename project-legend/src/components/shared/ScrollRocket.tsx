"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { RocketSVG } from "./RocketSVG";

export function ScrollRocket() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth out the scroll progress to give a floating/flying effect
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // CRITICAL FIX: The rocket starts OFF-SCREEN (-24vh) and ONLY scrolls down when the user scrolls!
  // This prevents the rocket animation from overlaying or blocking the Home page headline on load!
  const y = useTransform(smoothProgress, [0, 0.15, 0.4, 0.7, 1], ["-24vh", "15vh", "45vh", "75vh", "120vh"]);
  const x = useTransform(smoothProgress, [0, 0.15, 0.4, 0.7, 1], ["0vw", "15vw", "5vw", "35vw", "80vw"]);
  
  // Notice the rotation changes depending on how the scroll curve bends!
  // It angles right and down as you scroll.
  const rotate = useTransform(smoothProgress, [0, 0.15, 0.4, 0.7, 1], [110, 135, 160, 120, 90]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 hidden md:block overflow-hidden">
      <motion.div
        style={{ x, y, rotate }}
        className="absolute top-0 left-0 w-24 h-24 origin-center drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]"
      >
        {/* We use the custom RocketSVG without the giant liftoff thrust underneath */}
        <RocketSVG className="w-full h-full" />
      </motion.div>
    </div>
  );
}
