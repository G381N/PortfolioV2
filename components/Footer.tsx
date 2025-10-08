// Portfolio update - 2024
"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHome, FiUser, FiCode, FiSend, FiInstagram, FiYoutube } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/G381N", icon: FiGithub },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/gebin-george-aa4b40317", icon: FiLinkedin },
    { name: "Instagram", href: "https://www.gebin.net/bikeswithgebin.html", icon: FiInstagram },
    { name: "YouTube", href: "/hitpixels", icon: FiYoutube },
    { name: "Email", href: "mailto:gebin.official@gmail.com", icon: FiMail },
  ];

  const navigationItems = [
    { name: "Home", href: "#home", icon: FiHome },
    { name: "Projects", href: "#projects", icon: FiCode },
    { name: "About", href: "#about", icon: FiUser },
    { name: "Contact", href: "#contact", icon: FiSend },
  ];

  const contactInfo = [
    { label: "Email", value: "gebin.official@gmail.com", href: "mailto:gebin.official@gmail.com" },
    { label: "Phone", value: "+91-9741301245", href: "tel:+919741301245" },
    { label: "Location", value: "Bangalore, Karnataka, India" },
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold text-white mb-2">
              <span className="text-blue-400">Gebin</span> George
            </h3>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              Tech Explorer & AI Enthusiast crafting innovative solutions with modern technologies.
            </p>
            <Link href="#contact">
              <motion.button
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend className="mr-2" size={14} />
                Get in Touch
              </motion.button>
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm group">
                    <item.icon className="mr-3 text-gray-500 group-hover:text-blue-400 transition-colors" size={16} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-200">{item.label}:</span>
                    <br />
                    {item.href ? (
                      <a href={item.href} className="hover:text-blue-400 transition-colors break-words">
                        {item.value}
                      </a>
                    ) : (
                      <span className="break-words">{item.value}</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Connect */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a href={social.href} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm group">
                    <social.icon className="mr-3 text-gray-500 group-hover:text-blue-400 transition-colors" size={16} />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm order-2 md:order-1">
              © {new Date().getFullYear()} Gebin George. All rights reserved.
            </p>
            <div className="flex items-center gap-4 order-1 md:order-2">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} aria-label={social.name} className="p-2.5 rounded-full bg-gray-800/50 text-gray-400 hover:bg-blue-900/50 hover:text-blue-400 transition-all">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 