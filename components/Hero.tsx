"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function Hero() {
  const [showIntroAnimation, setShowIntroAnimation] = useState(true);
  const [showSmokeDispersion, setShowSmokeDispersion] = useState(false);
  const [showZoomTransition, setShowZoomTransition] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Check if user has seen the intro animation before
    const hasSeenIntro = sessionStorage.getItem('hasSeenHeroIntro');
    if (hasSeenIntro) {
      setShowIntroAnimation(false);
      setShowMainContent(true);
    } else {
      sessionStorage.setItem('hasSeenHeroIntro', 'true');
      
      // Animation sequence
      setTimeout(() => {
        setShowSmokeDispersion(true);
      }, 3000);
      
      setTimeout(() => {
        setShowIntroAnimation(false);
        setShowZoomTransition(true);
      }, 4000);
      
      setTimeout(() => {
        setShowZoomTransition(false);
        setShowMainContent(true);
      }, 5500);
    }
  }, []);

  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/G381N/",
      label: "GitHub",
      color: "hover:text-blue-400"
    },
    {
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/gebin-george-aa4b40317/?original_referer=https%3A%2F%2Fwww.gebin.net%2F",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: FiInstagram,
      href: "https://www.gebin.net/bikeswithgebin.html",
      label: "Instagram",
      color: "hover:text-blue-400"
    },
    {
      icon: FiYoutube,
      href: "https://www.gebin.net/hitpixels.html",
      label: "YouTube",
      color: "hover:text-blue-400"
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/G38iNGeorge",
      label: "X (Twitter)",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
      {/* Intro Animation */}
      {showIntroAnimation && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-center relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showSmokeDispersion ? [1, 1, 0] : [0, 1, 1],
                scale: showSmokeDispersion ? [1, 1.1, 0.9] : [0.8, 1, 1],
              }}
              transition={{ 
                duration: showSmokeDispersion ? 1 : 2,
                times: showSmokeDispersion ? [0, 0.5, 1] : [0, 0.3, 1],
                ease: "easeInOut"
              }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Gebin
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                George
              </span>
            </motion.h1>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-600/30 rounded-full blur-3xl"
              animate={{
                opacity: showSmokeDispersion ? [0.8, 1, 0] : [0, 0.8, 0.8],
                scale: showSmokeDispersion ? [1.2, 1.5, 2] : [0.8, 1.2, 1.2]
              }}
              transition={{
                duration: showSmokeDispersion ? 1 : 2,
                times: showSmokeDispersion ? [0, 0.5, 1] : [0, 0.3, 1],
                ease: "easeInOut"
              }}
            />
            
            {/* Smoke dispersion particles */}
            {showSmokeDispersion && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0.8,
                      scale: 1
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{ 
                      duration: 1,
                      ease: "easeOut",
                      delay: Math.random() * 0.3
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Zoom Transition */}
      {showZoomTransition && (
        <motion.div
          className="fixed inset-0 z-40 bg-black"
          initial={{ scale: 1 }}
          animate={{ scale: 20 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black" />
        </motion.div>
      )}

      {/* Enhanced Background with More Visible Grid */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-black" />
        
        {/* More visible animated grid */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }} 
        />

        {/* Constellation paths */}
        <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#constellation)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M200,400 Q400,300 600,400 T1000,400"
            stroke="url(#constellation)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Enhanced Floating Particles with More Motion */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 300 - 150],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Blinking nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-2 h-2 bg-blue-500/80 rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Larger glowing orbs with shimmer */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-3 h-3 bg-blue-500/60 rounded-full blur-sm"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            
            {/* Centered Main content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                
                {/* Name with hover animation */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-white group-hover:to-blue-200 transition-all duration-500">
                    Gebin
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-blue-500 transition-all duration-500">
                    George
                  </span>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-600/0 rounded-full blur-2xl group-hover:from-blue-400/30 group-hover:to-blue-600/30 transition-all duration-500 -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.h1>

                {/* Introduction */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
                >
                  Currently pursuing my Master's in Computer Applications, I enjoy building tools, 
                  exploring AI, and breaking into security labs one exploit at a time.
                </motion.p>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-3 mb-8"
                >
                  {/* Location */}
                  <div className="flex items-center justify-center text-gray-300">
                    <FiMapPin className="mr-3 text-blue-400" size={18} />
                    <span>Bangalore, Karnataka, India</span>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-center justify-center text-gray-300">
                    <FiPhone className="mr-3 text-blue-400" size={18} />
                    <a 
                      href="tel:+919741301245" 
                      className="hover:text-blue-400 transition-colors"
                    >
                      +91-9741301245
                    </a>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center justify-center text-gray-300">
                    <FiMail className="mr-3 text-blue-400" size={18} />
                    <a 
                      href="mailto:gebin.official@gmail.com" 
                      className="hover:text-blue-400 transition-colors"
                    >
                      gebin.official@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* Social Media Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full border border-gray-700 text-gray-400 ${social.color} transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/30 group relative overflow-hidden`}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: showMainContent ? 1 : 0, y: showMainContent ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                      >
                        <Icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-blue-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
                          initial={false}
                        />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showMainContent ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-blue-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 