// Portfolio update - 2024
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Github, Youtube, Instagram, Mail, ExternalLink } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Navigation items - organized by category
  const mainNavItems = [
    { label: "HOME", href: "#home", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

  const externalLinks = [
    { label: "Resume", href: "/resume.pdf", icon: Download, type: "download" },
    { label: "GitHub", href: "https://github.com/G381N/", icon: Github, type: "external" },
    { label: "YouTube", href: "https://www.gebin.net/hitpixels", icon: Youtube, type: "external" },
    { label: "Instagram", href: "https://www.gebin.net/bikeswithgebin", icon: Instagram, type: "external" },
  ];

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
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

  // Close menu when pressing escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled
          ? "py-4 bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/50"
          : "py-6 bg-transparent"
        }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(195, 228, 29, 0.1)' : '1px solid transparent',
      }}
    >
      <div className="container mx-auto px-6">
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
                    <X className="w-7 h-7" strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-7 h-7" strokeWidth={2} />
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
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute top-full left-0 w-[280px] md:w-[320px] border border-neutral-800/80 shadow-2xl shadow-black/70 mt-4 rounded-2xl z-[100] bg-black/98 backdrop-blur-2xl overflow-hidden"
                >
                  {/* Main Navigation */}
                  <div className="p-4 pb-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-3 px-3">Navigation</p>
                    {mainNavItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="flex items-center text-base md:text-lg font-bold tracking-tight py-2.5 px-3 cursor-pointer transition-all duration-300 rounded-xl"
                        style={{
                          color: item.highlight ? "#C3E41D" : "rgb(229 229 229)",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#C3E41D";
                          e.currentTarget.style.backgroundColor = "rgba(195, 228, 29, 0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = item.highlight ? "#C3E41D" : "rgb(229 229 229)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-neutral-800/60 mx-4" />

                  {/* External Links */}
                  <div className="p-4 pt-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-3 px-3">Links</p>
                    {externalLinks.map((item, index) => {
                      const Icon = item.icon;
                      return item.type === 'download' ? (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          download
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (mainNavItems.length + index) * 0.04 }}
                          className="flex items-center gap-3 text-sm font-medium py-2.5 px-3 text-neutral-400 hover:text-[#C3E41D] hover:bg-[rgba(195,228,29,0.08)] cursor-pointer transition-all duration-300 rounded-xl"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </motion.a>
                      ) : (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (mainNavItems.length + index) * 0.04 }}
                          className="flex items-center gap-3 text-sm font-medium py-2.5 px-3 text-neutral-400 hover:text-[#C3E41D] hover:bg-[rgba(195,228,29,0.08)] cursor-pointer transition-all duration-300 rounded-xl group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                          <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Signature/Logo - Centered */}
          <Link href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}>
            <motion.div
              className="text-4xl md:text-5xl cursor-pointer hover:scale-110 transition-transform duration-300"
              style={{
                color: "white",
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive"
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                textShadow: '0 0 30px rgba(195, 228, 29, 0.5)'
              }}
            >
              G
            </motion.div>
          </Link>

          {/* Right side - Contact/CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 hover:text-[#C3E41D] transition-colors duration-300 rounded-full hover:bg-[rgba(195,228,29,0.08)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Contact</span>
          </motion.a>
        </nav>
      </div>
    </header>
  );
}