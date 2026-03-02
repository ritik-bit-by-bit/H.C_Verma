"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        (!document.documentElement.classList.contains("light") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      const dotColor = isDark ? "rgba(251, 191, 36, 0.12)" : "rgba(180, 83, 9, 0.1)";
      const spacing = 48;
      const dotRadius = 1;

      ctx.fillStyle = dotColor;

      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          const offsetX = (x + y) % (spacing * 2) === 0 ? spacing / 2 : 0;
          const pulse = 0.7 + 0.3 * Math.sin(time * 0.002 + x * 0.02 + y * 0.02);
          ctx.globalAlpha = pulse;
          ctx.beginPath();
          ctx.arc(x + offsetX, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      time += 16;
    };

    const loop = () => {
      draw();
      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(loop);

    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    />
  );
}
