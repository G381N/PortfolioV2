// Portfolio update - 2024
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiDownload, FiGithub, FiYoutube, FiInstagram, FiMail } from "react-icons/fi";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navigation = [
    { name: 'Home', href: '#hero', type: 'internal' },
    { name: 'About', href: '#about', type: 'internal' },
    { name: 'Projects', href: '#projects', type: 'internal' },
    { name: 'Experience', href: '#experience', type: 'internal' },
    { name: 'Resume', href: '/resume.pdf', type: 'download' },
    { name: 'GitHub', href: 'https://github.com/G381N/', type: 'external' },
    { name: 'YouTube', href: 'https://www.gebin.net/hitpixels', type: 'external' },
    { name: 'Instagram', href: 'https://www.gebin.net/bikeswithgebin', type: 'external' },
    { name: 'Contact', href: '#contact', type: 'internal' }
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'GitHub':
        return <FiGithub className="mr-2" size={16} />;
      case 'YouTube':
        return <FiYoutube className="mr-2" size={16} />;
      case 'Instagram':
        return <FiInstagram className="mr-2" size={16} />;
      case 'Resume':
        return <FiDownload className="mr-2" size={16} />;
      case 'Contact':
        return <FiMail className="mr-2" size={16} />;
      default:
        return null;
    }
  };

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "py-3 bg-black/98 backdrop-blur-lg shadow-2xl shadow-black/50"
          : "py-4 bg-black/20 backdrop-blur-sm"
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(55, 65, 81, 0.3)' : '1px solid transparent',
      }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="#" 
            className="relative z-10 flex items-center"
            onClick={handleLinkClick}
          >
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Gebin</span>
              <span> George</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {navigation.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {item.type === 'download' ? (
                    <motion.a
                      href={item.href}
                      download
                      className="relative px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 group flex items-center"
                      onClick={handleLinkClick}
                      whileHover={{ y: -1 }}
                    >
                      {/* Soft glow effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-blue-400/5 rounded-lg blur-md"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-lg"></div>
                      </div>
                      
                      <motion.div
                        className="relative z-10 flex items-center group-hover:text-blue-300 transition-colors duration-300"
                        whileHover={{ x: 2 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {getIcon(item.name)}
                        </motion.div>
                        <motion.span
                          whileHover={{ letterSpacing: "0.05em" }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      </motion.div>
                      
                      {/* Elegant underline */}
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                    </motion.a>
                  ) : item.type === 'external' ? (
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 group flex items-center"
                      onClick={handleLinkClick}
                      whileHover={{ y: -1 }}
                    >
                      {/* Soft glow effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-blue-400/5 rounded-lg blur-md"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-lg"></div>
                      </div>
                      
                      <motion.div
                        className="relative z-10 flex items-center group-hover:text-blue-300 transition-colors duration-300"
                        whileHover={{ x: 2 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {getIcon(item.name)}
                        </motion.div>
                        <motion.span
                          whileHover={{ letterSpacing: "0.05em" }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      </motion.div>
                      
                      {/* Elegant underline */}
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                    </motion.a>
                  ) : (
                    <motion.div
                      whileHover={{ y: -1 }}
                    >
                      <Link
                        href={item.href}
                        className="relative px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 group flex items-center"
                        onClick={handleLinkClick}
                      >
                        {/* Soft glow effect */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-blue-400/5 rounded-lg blur-md"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-lg"></div>
                        </div>
                        
                        <motion.div
                          className="relative z-10 flex items-center group-hover:text-blue-300 transition-colors duration-300"
                          whileHover={{ x: 2 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {getIcon(item.name)}
                          </motion.div>
                          <motion.span
                            whileHover={{ letterSpacing: "0.05em" }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </motion.div>
                        
                        {/* Elegant underline */}
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
                      </Link>
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={`p-1.5 rounded-full transition-colors ${
                scrolled
                  ? "bg-gray-800/80 text-white hover:bg-gray-700/80"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/98 backdrop-blur-lg overflow-hidden shadow-lg"
            style={{
              borderBottom: '1px solid rgba(55, 65, 81, 0.3)',
            }}
          >
            <div className="container mx-auto px-4 py-3">
              <ul className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    {item.type === 'download' ? (
                      <motion.a
                        href={item.href}
                        download
                        className="relative flex items-center py-3 px-4 text-gray-300 font-medium transition-all duration-300 group"
                        onClick={handleLinkClick}
                        whileHover={{ x: 4 }}
                      >
                        {/* Subtle glow */}
                        <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        
                        {/* Minimal side indicator */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-r"></div>
                        
                        <motion.div
                          className="relative z-10 flex items-center group-hover:text-blue-300 transition-colors duration-300"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {getIcon(item.name)}
                          </motion.div>
                          <motion.span
                            whileHover={{ letterSpacing: "0.02em" }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </motion.div>
                      </motion.a>
                    ) : item.type === 'external' ? (
                      <motion.a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center py-3 px-4 text-gray-300 font-medium transition-all duration-300 group"
                        onClick={handleLinkClick}
                        whileHover={{ x: 4 }}
                      >
                        {/* Subtle glow */}
                        <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        
                        {/* Minimal side indicator */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-r"></div>
                        
                        <motion.div
                          className="relative z-10 flex items-center group-hover:text-blue-300 transition-colors duration-300"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {getIcon(item.name)}
                          </motion.div>
                          <motion.span
                            whileHover={{ letterSpacing: "0.02em" }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </motion.div>
                      </motion.a>
                    ) : (
                      <motion.div
                        whileHover={{ x: 4 }}
                      >
                        <Link
                          href={item.href}
                          className="relative flex items-center py-3 px-4 text-gray-300 font-medium transition-all duration-300 group"
                          onClick={handleLinkClick}
                        >
                          {/* Subtle glow */}
                          <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                          
                          {/* Minimal side indicator */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-r"></div>
                          
                          <motion.div
                            className="relative z-10 flex items-center group-hover:text-blue-300 transition-colors duration-300"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              {getIcon(item.name)}
                            </motion.div>
                            <motion.span
                              whileHover={{ letterSpacing: "0.02em" }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.name}
                            </motion.span>
                          </motion.div>
                        </Link>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}