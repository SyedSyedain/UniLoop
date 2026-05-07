"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

const PARTICLE_COUNT    = 65;
const CONNECTION_DIST   = 130;
const PARTICLE_SPEED    = 0.38;
const CONNECTION_ALPHA  = 0.11;

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x:      Math.random() * width,
    y:      Math.random() * height,
    vx:     (Math.random() - 0.5) * PARTICLE_SPEED,
    vy:     (Math.random() - 0.5) * PARTICLE_SPEED,
    radius: Math.random() * 1.4 + 0.4,
    alpha:  Math.random() * 0.35 + 0.08,
  }));
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const particles = createParticles(canvas.width, canvas.height);

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist >= CONNECTION_DIST) continue;

          const opacity = ((1 - dist / CONNECTION_DIST) * CONNECTION_ALPHA).toFixed(3);
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(212,168,67,${opacity})`;
          ctx!.lineWidth   = 0.5;
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particles[j].x, particles[j].y);
          ctx!.stroke();
        }
      }
    }

    function drawParticles() {
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(212,168,67,${p.alpha})`;
        ctx!.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas!.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height)  p.vy *= -1;
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      drawConnections();
      drawParticles();
      rafId = requestAnimationFrame(frame);
    }

    frame();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
