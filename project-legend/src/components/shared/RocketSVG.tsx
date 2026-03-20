"use client";

import { motion } from "framer-motion";

export function RocketSVG({ className = "", showFlames = true }: { className?: string, showFlames?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {/* 
        This is a highly-detailed, realistic multi-stage rocket.
        It features side-boosters, a central core, engine bells, and panel lines.
      */}
      <svg viewBox="0 0 100 250" className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(14,165,233,0.3)]">
        
        {/* =========================================
            ENGINE FLAMES (Rendered conditionally) 
            ========================================= */}
        {showFlames && (
          <g>
            {/* Main Central Core Flame */}
            <motion.path
              d="M 45,210 Q 50,260 55,210 Z"
              animate={{ 
                d: [
                  "M 45,210 Q 50,260 55,210 Z", 
                  "M 45,210 Q 50,280 55,210 Z", 
                  "M 45,210 Q 50,250 55,210 Z"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 0.15, ease: "easeInOut" }}
              className="fill-amber-500"
            />
            {/* Center Inner Hot Flame */}
            <motion.path
              d="M 48,210 Q 50,230 52,210 Z"
              animate={{ 
                d: [
                  "M 48,210 Q 50,230 52,210 Z", 
                  "M 48,210 Q 50,240 52,210 Z", 
                  "M 48,210 Q 50,225 52,210 Z"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 0.1, ease: "easeInOut" }}
              className="fill-yellow-100"
            />

            {/* Left Booster Flame */}
            <motion.path
              d="M 27,200 Q 32,240 37,200 Z"
              animate={{ 
                d: [
                  "M 27,200 Q 32,240 37,200 Z", 
                  "M 27,200 Q 32,255 37,200 Z", 
                  "M 27,200 Q 32,235 37,200 Z"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 0.12, ease: "easeInOut" }}
              className="fill-amber-500"
            />
            <motion.path
              d="M 30,200 Q 32,220 34,200 Z"
              className="fill-yellow-100"
            />

            {/* Right Booster Flame */}
            <motion.path
              d="M 63,200 Q 68,240 73,200 Z"
              animate={{ 
                d: [
                  "M 63,200 Q 68,240 73,200 Z", 
                  "M 63,200 Q 68,255 73,200 Z", 
                  "M 63,200 Q 68,235 73,200 Z"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 0.14, ease: "easeInOut" }}
              className="fill-amber-500"
            />
            <motion.path
              d="M 66,200 Q 68,220 70,200 Z"
              className="fill-yellow-100"
            />
          </g>
        )}

        {/* =========================================
            ROCKET STRUCTURAL HULL
            ========================================= */}
            
        {/* --- Engine Bells --- */}
        <path d="M 46,200 L 44,210 L 56,210 L 54,200 Z" fill="#334155" /> {/* Center */}
        <path d="M 28,190 L 26,200 L 38,200 L 36,190 Z" fill="#334155" /> {/* Left */}
        <path d="M 64,190 L 62,200 L 74,200 L 72,190 Z" fill="#334155" /> {/* Right */}

        {/* --- Central Core --- */}
        <rect x="42" y="60" width="16" height="142" fill="#f8fafc" />
        {/* Core Shading for Depth */}
        <rect x="54" y="60" width="4" height="142" fill="#e2e8f0" />
        
        {/* Central Core Panel Lines */}
        <line x1="42" y1="180" x2="58" y2="180" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="42" y1="140" x2="58" y2="140" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="42" y1="100" x2="58" y2="100" stroke="#cbd5e1" strokeWidth="1" />
        {/* Orange Interstage Band */}
        <rect x="42" y="90" width="16" height="4" fill="#f97316" />

        {/* --- Payload Fairing (Nose Cone) --- */}
        <path d="M 42,60 C 42,30, 50,15, 50,15 C 50,15, 58,30, 58,60 Z" fill="#f8fafc" />
        <path d="M 50,15 C 50,15, 58,30, 58,60 L 54,60 C 54,30, 50,15, 50,15 Z" fill="#e2e8f0" /> {/* Shading */}
        
        {/* Flag / Details on Fairing */}
        <circle cx="50" cy="50" r="3" fill="#0ea5e9" opacity="0.8" />
        
        {/* --- Left Booster --- */}
        <rect x="28" y="100" width="10" height="92" fill="#f8fafc" rx="1" />
        <rect x="36" y="100" width="2" height="92" fill="#e2e8f0" rx="1" /> {/* Booster Shading */}
        {/* Left Nose Cone */}
        <path d="M 28,100 C 28,80, 33,65, 33,65 C 33,65, 38,80, 38,100 Z" fill="#f8fafc" />
        <path d="M 33,65 C 33,65, 38,80, 38,100 L 36,100 C 36,80, 33,65, 33,65 Z" fill="#e2e8f0" />
        {/* Left Booster Strut */}
        <line x1="38" y1="120" x2="42" y2="120" stroke="#64748b" strokeWidth="2" />
        <line x1="38" y1="170" x2="42" y2="170" stroke="#64748b" strokeWidth="2" />

        {/* --- Right Booster --- */}
        <rect x="62" y="100" width="10" height="92" fill="#f8fafc" rx="1" />
        <rect x="70" y="100" width="2" height="92" fill="#e2e8f0" rx="1" /> {/* Booster Shading */}
        {/* Right Nose Cone */}
        <path d="M 62,100 C 62,80, 67,65, 67,65 C 67,65, 72,80, 72,100 Z" fill="#f8fafc" />
        <path d="M 67,65 C 67,65, 72,80, 72,100 L 70,100 C 70,80, 67,65, 67,65 Z" fill="#e2e8f0" />
        {/* Right Booster Strut */}
        <line x1="58" y1="120" x2="62" y2="120" stroke="#64748b" strokeWidth="2" />
        <line x1="58" y1="170" x2="62" y2="170" stroke="#64748b" strokeWidth="2" />
        
        {/* --- Aerodynamic Base Fins --- */}
        <path d="M 42,180 L 38,195 L 42,192 Z" fill="#f8fafc" />
        <path d="M 58,180 L 62,195 L 58,192 Z" fill="#e2e8f0" />

      </svg>
    </div>
  );
}
