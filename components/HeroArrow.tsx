"use client";

import { useEffect, useRef, useState } from 'react';

type Props = {
  targetId: string;
};

export default function HeroArrow({ targetId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let targetElement: HTMLElement | null = null;
    let heroSection: HTMLElement | null = null;
    
    // Try to get target element and hero section
    setTimeout(() => {
      targetElement = document.getElementById(targetId);
      heroSection = document.getElementById('home');
    }, 500);
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Handle window resize
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    // Mouse position
    let mouse = { x: null as number | null, y: null as number | null };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // Check scroll position
    const handleScroll = () => {
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom > 0);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // Draw arrow function
    const drawArrow = () => {
      if (!ctx || !targetElement || !isVisible) return;
      
      const x0 = mouse.x;
      const y0 = mouse.y;

      if (!x0 || !y0) return;

      // Get target center
      const rect = targetElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Add target size
      const a = Math.atan2(cy - y0, cx - x0);
      const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
      const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

      const midX = (x0 + x1) / 2;
      const midY = (y0 + y1) / 2;
      const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
      const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
      const controlX = midX;
      const controlY = midY + offset * t;
      
      const r = Math.sqrt((x1 - x0)**2 + (y1 - y0)**2);
      const opacity = Math.min(0.75, (r - Math.max(rect.width, rect.height) / 2) / 750);

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 1;

      // Draw curve
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(controlX, controlY, x1, y1);
      ctx.setLineDash([10, 4]);
      ctx.stroke();
      ctx.restore();

      // Draw arrowhead
      const angle = Math.atan2(y1 - controlY, x1 - controlX);
      const headLength = 10;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - headLength * Math.cos(angle - Math.PI / 6),
        y1 - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - headLength * Math.cos(angle + Math.PI / 6),
        y1 - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isVisible) {
        drawArrow();
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetId, isVisible]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
    />
  );
}