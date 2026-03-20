"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { RocketSVG } from "./RocketSVG";

export function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(false);
  
  // Custom Phases:
  // 3, 2, 1 = Countdown
  // 0 = Ignition (shake, huge floor smoke, huge flame)
  // -1 = Liftoff (rocket slowly moves up, ground moves down, sky gets brighter)
  // -2 = Ascent (fast clouds shoot down vertically, rocket fixed in center)
  // -3 = Space (sky goes black, stars appear, rocket shoots off top, text reveals)
  const [phase, setPhase] = useState(0); // Start directly at Ignition

  useEffect(() => {
    // Play on every refresh for now to make testing and viewing extremely reliable.
    setShowIntro(true);
    
    const timeouts = [
      setTimeout(() => setPhase(-1), 1200),     // Liftoff! Slow rise
      setTimeout(() => setPhase(-2), 2500),     // Ascent! Fast clouds
      setTimeout(() => setPhase(-3), 4000),     // Space! Rocket leaves, text in
      setTimeout(() => setShowIntro(false), 7000), // Complete at 7s
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          // Animate background colors per phase smoothly
          animate={{
            opacity: 1, // Enforce opacity 1 during the entire animation so it never fades early
            backgroundColor: 
              phase >= 0 ? "#020617" :    // Pitch black night on pad 
              phase === -1 ? "#030712" :  // Deep high-altitude night
              phase === -2 ? "#000000" :  // Orbit edge
              "#000000"                   // Deep space black
          }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* --- STARS BACKGROUND --- Visible initially, and in space */}
          <motion.div
            animate={{ opacity: phase >= 0 || phase <= -3 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-80"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `pulse ${Math.random() * 2 + 1}s infinite alternate`,
                }}
              />
            ))}
          </motion.div>

          {/* --- CLOUDS FAST PASS (Phase -2 Ascent) --- */}
          <AnimatePresence>
            {phase === -2 && (
              <motion.div
                initial={{ y: "-100vh", opacity: 0 }}
                animate={{ y: ["-50vh", "150vh"], opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 1.2, ease: "linear", repeat: 1 }}
                className="absolute inset-0 z-10 flex items-center justify-around pointer-events-none"
              >
                <div className="w-64 h-32 bg-slate-400/10 blur-xl rounded-full -translate-x-32" />
                <div className="w-96 h-48 bg-slate-400/10 blur-2xl rounded-full translate-x-40 translate-y-40" />
                <div className="w-48 h-24 bg-slate-400/10 blur-lg rounded-full -translate-x-10 -translate-y-40" />
              </motion.div>
            )}
          </AnimatePresence>

            {/* --- LAUNCH PAD BASE (Phase >= -1) --- */}
          <AnimatePresence>
            {phase >= -1 && (
              <motion.div
                initial={{ y: "0vh" }}
                animate={{ y: phase <= -1 ? "100vh" : "0vh" }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="absolute bottom-0 w-full h-[30vh] z-10 flex flex-col items-center"
              >
                {/* Ground plane */}
                <div className="absolute bottom-0 w-full h-[30vh] bg-slate-900 border-t border-slate-700" />
                
                {/* Raised Concrete Pad Structure */}
                <div className="absolute top-0 w-64 md:w-80 h-6 bg-slate-600 rounded-t-sm border-t border-slate-400" />
                <div className="absolute top-[6px] w-[280px] md:w-[350px] h-4 bg-slate-700" />
                <div className="absolute top-[10px] w-[300px] md:w-[380px] h-full bg-slate-800" />
                
                {/* Detailed SVG Strongback/Umbilical Tower */}
                <div className="absolute bottom-[30vh] ml-28 md:ml-40 w-12 md:w-16 h-[50vh] -mb-1">
                  <svg viewBox="0 0 60 250" className="w-full h-full fill-slate-800 drop-shadow-md">
                     {/* Vertical Pillars */}
                     <rect x="10" y="0" width="8" height="250" />
                     <rect x="42" y="0" width="8" height="250" />
                     {/* Cross-bracing trusses (repeating pattern) */}
                     {Array.from({ length: 10 }).map((_, i) => (
                       <g key={i}>
                         <path d={`M 18 ${i * 25} L 42 ${(i + 1) * 25} L 42 ${(i + 1) * 25 + 5} L 18 ${i * 25 + 5} Z`} className="fill-slate-700" />
                         <path d={`M 42 ${i * 25} L 18 ${(i + 1) * 25} L 18 ${(i + 1) * 25 + 5} L 42 ${i * 25 + 5} Z`} className="fill-slate-600" />
                         <rect x="18" y={i * 25 + 10} width="24" height="4" className="fill-slate-900" />
                       </g>
                     ))}
                     {/* Umbilical Arms connecting to the rocket */}
                     <rect x="-20" y="30" width="30" height="4" className="fill-slate-500" />
                     <rect x="-30" y="90" width="40" height="4" className="fill-slate-500" />
                     <rect x="-20" y="150" width="30" height="4" className="fill-slate-500" />
                     <rect x="-35" y="210" width="45" height="6" className="fill-slate-500" />
                     
                     {/* Lightning Mast on top */}
                     <rect x="28" y="-30" width="4" height="30" className="fill-slate-400" />
                  </svg>
                </div>

                {/* --- BACKGROUND GROUND PROPS --- */}
                {/* Extreme Left Corner: Radar / Observation Array */}
                <div className="absolute bottom-[30vh] left-[2vw] w-20 md:w-32 h-10 md:h-16 bg-slate-700 rounded-t-lg border-t-4 border-slate-500" />
                <div className="absolute bottom-[30vh] left-[6vw] mb-10 md:mb-16 w-12 h-12 rounded-full border-t-[6px] border-l-[6px] border-slate-400 rotate-[-25deg]" />
                <div className="absolute bottom-[30vh] left-[6vw] mb-10 md:mb-16 w-2 h-12 bg-slate-500" />

                {/* Mid-Left: Fuel Spheres (LOX / LH2 Storage) */}
                <div className="absolute bottom-[30vh] left-[18vw] w-16 md:w-24 h-16 md:h-24 bg-slate-300 rounded-full border-b-[8px] border-slate-400" />
                <div className="absolute bottom-[30vh] left-[27vw] w-12 md:w-16 h-12 md:h-16 bg-slate-300 rounded-full border-b-[6px] border-slate-400" />
                {/* Ground Piping & Connectors */}
                <div className="absolute bottom-[30vh] left-[20vw] w-32 md:w-48 h-2 bg-slate-500 z-0" />
                
                {/* Mid-Right: Control Bunkers / Support Buildings */}
                <div className="absolute bottom-[30vh] right-[25vw] w-24 md:w-40 h-10 md:h-12 bg-slate-700 border-t-[4px] border-slate-500 rounded-sm" />
                <div className="absolute bottom-[30vh] right-[20vw] w-12 md:w-16 h-16 md:h-24 bg-slate-600 rounded-sm" />
                {/* Communication Dish */}
                <div className="absolute bottom-[30vh] right-[22vw] mb-16 md:mb-24 w-8 h-8 rounded-full border-l-[6px] border-t-[6px] border-slate-400 rotate-[-45deg]" />
                <div className="absolute bottom-[30vh] right-[22vw] mb-12 md:mb-20 w-2 h-8 bg-slate-500" />

                {/* Extreme Right Corner: Vehicle Assembly Building (VAB) */}
                <div className="absolute bottom-[30vh] right-[2vw] w-32 md:w-48 h-32 md:h-48 bg-slate-800 border-t-8 border-slate-600 shadow-2xl" />
                <div className="absolute bottom-[30vh] right-[5vw] w-16 md:w-24 h-32 md:h-48 bg-slate-900 border-x border-slate-700" />
                {/* Large VAB door */}
                <div className="absolute bottom-[30vh] right-[6vw] w-12 md:w-16 h-24 md:h-32 bg-slate-950 border-t-4 border-slate-600" />

                {/* Left & Right Floodlight Masts with God Rays */}
                <div className="absolute bottom-[30vh] left-[15vw] w-1 h-32 md:h-48 bg-slate-600" />
                <div className="absolute bottom-[30vh] left-[15vw] mb-32 md:mb-48 w-6 h-6 rounded-full bg-yellow-100 blur-[4px] shadow-[0_0_30px_rgba(253,224,71,1)]" />
                
                <div className="absolute bottom-[30vh] right-[15vw] w-1 h-32 md:h-48 bg-slate-600" />
                <div className="absolute bottom-[30vh] right-[15vw] mb-32 md:mb-48 w-6 h-6 rounded-full bg-yellow-100 blur-[4px] shadow-[0_0_30px_rgba(253,224,71,1)]" />

              </motion.div>
            )}
          </AnimatePresence>

          {/* --- ROCKET & EXHAUST --- */}
          <motion.div
            animate={{
              bottom: phase >= 0 ? "30vh" : phase >= -2 ? "50vh" : "150vh",
              scale: phase <= -1 ? 1.4 : 1,
              x: phase === 0 ? [-5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, 0] : 0,
            }}
            transition={{
              bottom: { duration: phase === -1 ? 1.3 : phase === -3 ? 1.5 : 0, ease: phase === -1 ? "easeIn" : "easeOut" },
              scale: { duration: 1.5 },
              x: { duration: 1.2, ease: "linear" }, // Quick shake
            }}
            className="absolute z-20 flex flex-col items-center"
          >
            {/* The rocket sits exactly on the 30vh line */}
            <RocketSVG className="w-32 h-32 md:w-48 md:h-48 relative z-10" showFlames={phase <= 0} />

            {/* Massive Thrust Flame during Ignition & Lift Off */}
            <AnimatePresence>
              {phase <= 0 && phase >= -1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: phase === 0 ? 1 : 2 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-[80%] md:top-[90%] w-32 h-48 md:w-48 md:h-64 bg-gradient-to-b from-yellow-100 via-amber-500 to-transparent blur-2xl rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Ground Smoke Billowing outwards heavily during Ignition & Liftoff! */}
            <AnimatePresence>
              {phase <= 0 && phase >= -1 && (
                <motion.div
                   className="absolute bottom-0 flex items-end justify-center w-full z-30 pointer-events-none overflow-hidden"
                >
                   {/* Left expanding smoke plume */}
                   <motion.div
                     initial={{ opacity: 0, x: 0, scale: 0.8 }}
                     animate={{ opacity: [0, 0.7, 0.4, 0], x: ["-5vw", "-20vw", "-35vw"], scale: [0.8, 1, 1.2] }}
                     exit={{ opacity: 0, transition: { duration: 0.5 } }}
                     transition={{ duration: 3.5, ease: "easeOut" }}
                     className="absolute bottom-[-5vh] w-64 md:w-80 h-16 md:h-24 bg-slate-300/60 blur-lg rounded-[100%]"
                   />
                   
                   {/* Right expanding smoke plume */}
                   <motion.div
                     initial={{ opacity: 0, x: 0, scale: 0.8 }}
                     animate={{ opacity: [0, 0.7, 0.4, 0], x: ["5vw", "20vw", "35vw"], scale: [0.8, 1, 1.2] }}
                     exit={{ opacity: 0, transition: { duration: 0.5 } }}
                     transition={{ duration: 3.5, ease: "easeOut" }}
                     className="absolute bottom-[-5vh] w-64 md:w-80 h-16 md:h-24 bg-slate-300/60 blur-lg rounded-[100%]"
                   />

                   {/* Central churning ignition puff */}
                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: [0, 0.8, 0.5, 0], scale: [0.8, 1.2, 1.4], y: ["0vh", "0vh", "0vh"] }}
                     exit={{ opacity: 0, transition: { duration: 0.5 } }}
                     transition={{ duration: 3, ease: "easeOut", delay: 0.1 }}
                     className="absolute bottom-[-5vh] w-80 md:w-96 h-20 md:h-28 bg-slate-200/70 blur-xl rounded-[100%]"
                   />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* --- CINEMATIC TEXT ANIMATIONS --- */}
          <div className="absolute top-[15vh] w-full z-30 flex flex-col items-center justify-start pointer-events-none">
            
            {/* FINAL SPACE TEXT */}
            <AnimatePresence>
              {phase <= -3 && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute flex flex-col items-center top-[25vh]"
                >
                  <h1 className="font-heading text-4xl md:text-6xl lg:text-[5.5rem] font-black text-white drop-shadow-[0_0_30px_rgba(14,165,233,0.8)] text-center tracking-tight leading-tight px-4">
                    Here We Go Aspirants
                  </h1>
                  <p className="text-sky-300 font-sans mt-4 md:mt-6 text-xs md:text-xl tracking-[0.3em] lg:tracking-[0.4em] uppercase font-bold text-center">
                    Entering the Physics Realm
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
