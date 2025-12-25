// Portfolio update - 2024
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// BlurText animation component
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

export default function PortfolioHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    { label: "HOME", href: "#home", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div id="home" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Background Grid Animation */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute inset-0" 
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(195, 228, 29, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(195, 228, 29, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl shadow-black/50' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <motion.button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-400 hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-8 h-8" strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-8 h-8" strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 w-[220px] md:w-[260px] border border-neutral-800 shadow-2xl shadow-black/50 mt-3 p-4 rounded-xl z-[100] bg-black/95 backdrop-blur-xl"
                >
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block text-lg md:text-xl font-bold tracking-tight py-2 px-3 cursor-pointer transition-all duration-300 rounded-lg"
                      style={{
                        color: item.highlight ? "#C3E41D" : "rgb(229 229 229)",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#C3E41D";
                        e.currentTarget.style.backgroundColor = "rgba(195, 228, 29, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = item.highlight ? "#C3E41D" : "rgb(229 229 229)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Signature/Logo - Centered */}
          <motion.div 
            className="text-5xl md:text-6xl"
            style={{ 
              color: "white", 
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive" 
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            G
          </motion.div>

          {/* Right side placeholder for balance */}
          <div className="w-12" />
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
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
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-black text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[240px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ 
                  color: "#C3E41D", 
                  fontFamily: "'Inter', 'Fira Code', monospace",
                  textShadow: '0 0 80px rgba(195, 228, 29, 0.3)'
                }}
              />
            </motion.div>
            
            {/* GEORGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <BlurText
                text="GEORGE"
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-black text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[240px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ 
                  color: "#C3E41D", 
                  fontFamily: "'Inter', 'Fira Code', monospace",
                  textShadow: '0 0 80px rgba(195, 228, 29, 0.3)'
                }}
              />
            </motion.div>

            {/* Profile Picture - Centered on the text */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            >
              <motion.div 
                className="w-[70px] h-[120px] sm:w-[100px] sm:h-[170px] md:w-[130px] md:h-[220px] lg:w-[150px] lg:h-[255px] xl:w-[170px] xl:h-[290px] rounded-full overflow-hidden shadow-2xl cursor-pointer relative"
                style={{
                  boxShadow: '0 0 60px rgba(0, 0, 0, 0.8), 0 0 100px rgba(195, 228, 29, 0.2)'
                }}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: '0 0 80px rgba(0, 0, 0, 0.9), 0 0 120px rgba(195, 228, 29, 0.4)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Image
                  src="/dp.png"
                  alt="Gebin George"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tagline */}
        <motion.div 
          className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex justify-center">
            <BlurText
              text="Building tools, exploring AI, and breaking into security labs."
              delay={100}
              animateBy="words"
              direction="top"
              className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-center text-neutral-400 hover:text-neutral-200 transition-colors duration-300"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
          onClick={() => scrollToSection('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-neutral-500 hover:text-white transition-colors duration-300" />
          </motion.div>
        </motion.button>
      </main>
    </div>
  );
}
