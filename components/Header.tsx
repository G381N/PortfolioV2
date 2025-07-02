"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX, FiYoutube, FiInstagram } from "react-icons/fi";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Education", href: "/#education" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

const specialPages = [
  { 
    name: "YouTube", 
    href: "/hitpixels", 
    icon: FiYoutube,
    color: "from-red-500 to-red-600",
    hoverColor: "hover:text-red-400"
  },
  { 
    name: "Instagram", 
    href: "/bikeswithgebin", 
    icon: FiInstagram,
    color: "from-pink-500 to-purple-600",
    hoverColor: "hover:text-pink-400"
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/80 dark:bg-dark-800/90 backdrop-blur-md shadow-md"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-primary-600 dark:text-primary-400"
        >
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Gebin
          </span>{" "}
          George
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          {/* Special Pages with Icons */}
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
            {specialPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (navItems.length + index) * 0.1 }}
                >
                  <Link
                    href={page.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${page.color} text-white text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                  >
                    <Icon size={16} />
                    <span>{page.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 p-2 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-dark-800 shadow-lg"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {/* Mobile Special Pages */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
                {specialPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <li key={page.name}>
                      <Link
                        href={page.href}
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg bg-gradient-to-r ${page.color} text-white font-medium transition-all duration-200`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={20} />
                        <span>{page.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </div>
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
} 