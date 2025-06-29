"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

export default function ScrollAnimation({
  children,
  delay = 0,
  duration = 0.3,
  className = "",
  direction = "up",
  distance = 30,
  once = true,
}: ScrollAnimationProps) {
  // Set initial animation properties based on direction
  let initial: { opacity: number; y?: number; x?: number } = { opacity: 0 };
  
  if (direction === "up") {
    initial = { ...initial, y: distance };
  } else if (direction === "down") {
    initial = { ...initial, y: -distance };
  } else if (direction === "left") {
    initial = { ...initial, x: distance };
  } else if (direction === "right") {
    initial = { ...initial, x: -distance };
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{
        duration,
        delay: delay * 0.5,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 