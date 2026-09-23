'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COLORS = ['#ff6b6b', '#f7e74c', '#6bcf6b', '#6b9cf7', '#a76bf7'];
const PARTICLE_COUNT = 100;

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 5 + 1,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1.5,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let animationFrame = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(window.innerWidth, window.innerHeight)
      );
    };

    const animate = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size -= 0.1;

        context.fillStyle = particle.color;
        context.globalAlpha = Math.max(particle.size / 5, 0);
        context.beginPath();
        context.arc(particle.x, particle.y, Math.max(particle.size, 0), 0, Math.PI * 2);
        context.fill();

        if (particle.size <= 0.2) {
          particles[index] = createParticle(window.innerWidth, window.innerHeight);
        }
      });

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" aria-hidden="true" />;
}
