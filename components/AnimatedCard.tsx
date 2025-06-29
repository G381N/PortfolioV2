"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden p-6 ${className}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.3, delay: delay * 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base card background with fixed size */}
      <motion.div
        className="absolute inset-0 bg-gray-900/50 border border-gray-800 rounded-lg"
        animate={{
          borderColor: isHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(55, 65, 81, 1)",
          boxShadow: isHovered 
            ? "0 15px 30px rgba(59, 130, 246, 0.2)" 
            : "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-lg pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card lift effect */}
      <motion.div
        className="relative z-10"
        animate={{ 
          y: isHovered ? -5 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
} 