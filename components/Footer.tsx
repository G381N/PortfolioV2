"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHome, FiUser, FiCode, FiSend, FiInstagram, FiYoutube } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/G381N", icon: FiGithub, hoverColor: "hover:text-blue-400" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/gebin-george-aa4b40317", icon: FiLinkedin, hoverColor: "hover:text-blue-400" },
    { name: "Instagram", href: "https://www.gebin.net/bikeswithgebin.html", icon: FiInstagram, hoverColor: "hover:text-blue-400" },
    { name: "YouTube", href: "https://www.gebin.net/hitpixels.html", icon: FiYoutube, hoverColor: "hover:text-blue-400" },
    { name: "Email", href: "mailto:gebin.official@gmail.com", icon: FiMail, hoverColor: "hover:text-blue-400" },
  ];

  const navigationItems = [
    { name: "Home", href: "#hero", icon: FiHome },
    { name: "About", href: "#about", icon: FiUser },
    { name: "Projects", href: "#projects", icon: FiCode },
    { name: "Contact", href: "mailto:gebin.official@gmail.com", icon: FiSend },
  ];

  const contactInfo = [
    { label: "Email", value: "gebin.official@gmail.com", href: "mailto:gebin.official@gmail.com" },
    { label: "Phone", value: "+91-9741301245", href: "tel:+919741301245" },
    { label: "Location", value: "Bangalore, Karnataka, India" },
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Mobile-first improved layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <div className="mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Gebin
                </span>{" "}
                George
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tech Explorer & AI Enthusiast crafting innovative solutions with modern technologies.
              </p>
            </div>
            
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link
                  href="mailto:gebin.official@gmail.com"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <FiSend className="mr-2" size={14} />
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation - Better mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1"
          >
            <h4 className="text-white font-semibold mb-3 md:mb-4">Navigation</h4>
            <ul className="space-y-2 md:space-y-3">
              {navigationItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm group"
                  >
                    <item.icon className="mr-2 group-hover:scale-110 transition-transform" size={14} />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Better mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <h4 className="text-white font-semibold mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 md:space-y-3">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      <span className="font-medium text-gray-300">{item.label}:</span>
                      <br />
                      <span className="break-all">{item.value}</span>
                    </a>
                  ) : (
                    <span className="block text-gray-400 text-sm">
                      <span className="font-medium text-gray-300">{item.label}:</span>
                      <br />
                      <span className="break-all">{item.value}</span>
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links - Better mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <h4 className="text-white font-semibold mb-3 md:mb-4">Connect</h4>
            <div className="space-y-2 md:space-y-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center text-gray-400 ${social.hoverColor} transition-colors text-sm group`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="mr-3"
                    >
                      <social.icon size={16} />
                    </motion.div>
                    {social.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Properly centered social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Gebin George. All rights reserved.
              </p>
            </div>
            
            {/* Properly centered social icons */}
            <div className="flex justify-center space-x-4 order-1 md:order-2 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              {socialLinks.slice(0, 4).map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 