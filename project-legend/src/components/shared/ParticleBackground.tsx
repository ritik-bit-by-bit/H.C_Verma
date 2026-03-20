"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_COLOR = "rgba(14, 165, 233, 0.6)";
    const MAX_PARTICLES = 100; // Slightly fewer if bigger
    const MAX_DISTANCE = 160;
    const BASE_RADIUS = 3.5;

    let width = window.innerWidth;
    let height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * BASE_RADIUS + 0.5;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = DOT_COLOR;
        context.fill();
      }
    }

    let particles: Particle[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(new Particle());
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(new Particle());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles and connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity scales with distance
            const opacity = 1 - dist / MAX_DISTANCE;
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.35})`;
            ctx.lineWidth = 2.0;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw();
      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 mix-blend-multiply"
        aria-hidden
      />
      {/* Soft gradient overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-bp from-white/30 to-background/90 mix-blend-overlay" />
    </motion.div>
  );
}
