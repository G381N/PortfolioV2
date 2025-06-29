"use client";

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
    pulseSpeed: number;
    baseOpacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          baseOpacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawGrid = (time: number) => {
      const gridSize = 50;
      const offsetX = (time * 0.02) % gridSize;
      const offsetY = (time * 0.015) % gridSize;
      
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 + Math.sin(time * 0.001) * 0.02})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      // Vertical lines
      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Horizontal lines
      for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
    };

    const drawParticles = (time: number) => {
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update opacity with pulse effect
        particle.opacity = particle.baseOpacity + Math.sin(time * particle.pulseSpeed) * 0.2;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const drawSpotlight = (time: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      // Create radial gradient for spotlight effect
      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.001) * 50,
        centerY + Math.cos(time * 0.0008) * 30,
        0,
        centerX,
        centerY,
        radius
      );
      
      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.03 + Math.sin(time * 0.002) * 0.01})`);
      gradient.addColorStop(0.3, `rgba(59, 130, 246, ${0.02})`);
      gradient.addColorStop(0.6, `rgba(59, 130, 246, ${0.01})`);
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      drawGrid(time);
      drawSpotlight(time);
      drawParticles(time);
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate(0);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      }}
    />
  );
} 