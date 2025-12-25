// Portfolio update - 2024
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// BlurText animation component for stunning text reveal
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(195, 228, 29, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(195, 228, 29, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Radial glow behind name area */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(195, 228, 29, 0.15) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Floating Navigation Arrows - Left */}
      <motion.button
        className="hidden lg:flex absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center text-neutral-600 hover:text-[#C3E41D] transition-colors duration-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => scrollToSection('#contact')}
        aria-label="Previous section"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </motion.button>

      {/* Floating Navigation Arrows - Right */}
      <motion.button
        className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center text-neutral-600 hover:text-[#C3E41D] transition-colors duration-300"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => scrollToSection('#about')}
        aria-label="Next section"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,6 15,12 9,18" />
        </svg>
      </motion.button>

      {/* Hero Section - Main Content */}
      <main className="relative min-h-screen flex flex-col pt-24">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            {/* GEBIN */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <BlurText
                text="GEBIN"
                delay={70}
                animateBy="letters"
                direction="top"
                className="font-black text-[70px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[220px] 2xl:text-[260px] leading-[0.85] tracking-[-0.04em] uppercase justify-center whitespace-nowrap select-none"
                style={{
                  color: "#C3E41D",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textShadow: '0 0 100px rgba(195, 228, 29, 0.25), 0 0 200px rgba(195, 228, 29, 0.1)'
                }}
              />
            </motion.div>

            {/* GEORGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <BlurText
                text="GEORGE"
                delay={70}
                animateBy="letters"
                direction="top"
                className="font-black text-[70px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[220px] 2xl:text-[260px] leading-[0.85] tracking-[-0.04em] uppercase justify-center whitespace-nowrap select-none"
                style={{
                  color: "#C3E41D",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textShadow: '0 0 100px rgba(195, 228, 29, 0.25), 0 0 200px rgba(195, 228, 29, 0.1)'
                }}
              />
            </motion.div>

            {/* Profile Picture - Centered on the text intersection */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="w-[60px] h-[100px] sm:w-[85px] sm:h-[145px] md:w-[110px] md:h-[185px] lg:w-[140px] lg:h-[235px] xl:w-[160px] xl:h-[270px] 2xl:w-[180px] 2xl:h-[305px] rounded-full overflow-hidden cursor-pointer relative group"
                style={{
                  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 0 3px rgba(195, 228, 29, 0.1)'
                }}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    boxShadow: '0 0 60px rgba(195, 228, 29, 0.4), inset 0 0 30px rgba(195, 228, 29, 0.1)'
                  }}
                />

                <Image
                  src="/dp.png"
                  alt="Gebin George"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full relative z-10"
                  priority
                />

                {/* Subtle border overlay */}
                <div
                  className="absolute inset-0 rounded-full z-20 pointer-events-none"
                  style={{
                    border: '2px solid rgba(195, 228, 29, 0.15)'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tagline - Below Hero */}
        <motion.div
          className="absolute bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-36 xl:bottom-40 left-1/2 -translate-x-1/2 w-full px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex justify-center">
            <BlurText
              text="Building tools, exploring AI, and breaking into security labs."
              delay={80}
              animateBy="words"
              direction="top"
              className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] text-center text-neutral-500 hover:text-neutral-300 transition-colors duration-500 cursor-default"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                letterSpacing: '0.02em'
              }}
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 transition-all duration-300 group"
          aria-label="Scroll down"
          onClick={() => scrollToSection('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <ChevronDown className="w-5 h-5 md:w-7 md:h-7 text-neutral-600 group-hover:text-[#C3E41D] transition-colors duration-300" />
          </motion.div>
        </motion.button>
      </main>
    </section>
  );
}