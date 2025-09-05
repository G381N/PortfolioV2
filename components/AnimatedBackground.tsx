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
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100); // More particles
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1, // Slightly larger particles
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.3, // More visible particles
          color: `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.2})`, // More visible
          pulseSpeed: Math.random() * 0.015 + 0.008, // Slightly faster pulse
          baseOpacity: Math.random() * 0.4 + 0.2, // Higher base opacity
        });
      }
    };

    const drawGrid = (time: number) => {
      const gridSize = 50;
      const offsetX = (time * 0.01) % gridSize; // Slowed down from 0.02
      const offsetY = (time * 0.008) % gridSize; // Slowed down from 0.015
      
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 + Math.sin(time * 0.0005) * 0.02})`; // Made more visible
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

    const drawDotGrid = (time: number) => {
      // Add the smooth dot grid animation like in GitHub component
      const dotSize = 40;
      const offsetX = (time * 0.015) % dotSize; // Smooth movement
      const offsetY = (time * 0.012) % dotSize;
      
      ctx.fillStyle = `rgba(59, 130, 246, ${0.06 + Math.sin(time * 0.0008) * 0.02})`; // Made more visible
      
      for (let x = -offsetX; x < canvas.width + dotSize; x += dotSize) {
        for (let y = -offsetY; y < canvas.height + dotSize; y += dotSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2); // Slightly larger dots
          ctx.fill();
        }
      }
    };

    const drawParticles = (time: number) => {
      particlesRef.current.forEach((particle, index) => {
        // Update position (slowed down)
        particle.x += particle.speedX * 0.3; // Reduced speed
        particle.y += particle.speedY * 0.3; // Reduced speed

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update opacity with pulse effect (slower pulse)
        particle.opacity = particle.baseOpacity + Math.sin(time * particle.pulseSpeed * 0.3) * 0.15; // Slower and more subtle

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
      const radius = Math.min(canvas.width, canvas.height) * 0.6; // Increased radius
      
      // Create radial gradient for spotlight effect (slower movement)
      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.0003) * 30, // Slower and smaller movement
        centerY + Math.cos(time * 0.0002) * 20, // Slower and smaller movement
        0,
        centerX,
        centerY,
        radius
      );
      
      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.04 + Math.sin(time * 0.0005) * 0.01})`); // More visible
      gradient.addColorStop(0.3, `rgba(59, 130, 246, ${0.025})`);
      gradient.addColorStop(0.6, `rgba(59, 130, 246, ${0.015})`);
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      drawGrid(time);
      drawDotGrid(time);
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
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -10,
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      }}
    />
  );
} 