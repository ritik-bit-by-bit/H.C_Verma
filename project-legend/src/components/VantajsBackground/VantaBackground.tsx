"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Vanta's types are not shipped; treat the factory as `any` locally
    let vantaEffect: any;

    if (vantaRef.current) {
      vantaEffect = (GLOBE as any)({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xde7650,
        color2: 0xac4545,
        backgroundColor: 0xf9f9f9,
      });
    }

    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0  -z-10"
    />
  );
}
