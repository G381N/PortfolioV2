"use client";

import { useEffect } from 'react';

export default function CursorSpotlight() {
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    // Only enable on desktop
    if (window.innerWidth >= 768) {
      document.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return null;
} 