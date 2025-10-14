// Portfolio update - 2024
"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail, FiDownload } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import HeroArrow from "./HeroArrow";

export default function Hero() {
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
      href: "https://www.gebin.net/bikeswithgebin",
      label: "Instagram",
      color: "hover:text-blue-400"
    },
    {
      icon: FiYoutube,
      href: "/hitpixels",
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
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center pt-24">
      {/* Hero Arrow Animation */}
      <HeroArrow targetId="view-work-button" />
      
      {/* Enhanced Background with Smooth Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/8 to-transparent" />
        
        {/* Smoother animated grid */}
        <motion.div 
          className="absolute inset-0" 
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} 
        />

        {/* Smoother constellation paths */}
        <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#constellation)"
            strokeWidth="2"
            fill="none"
            animate={{
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M200,400 Q400,300 600,400 T1000,400"
            stroke="url(#constellation)"
            strokeWidth="2"
            fill="none"
            animate={{
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            
            {/* Main content card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-6xl"
            >
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Two-column layout inside the card */}
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  
                  {/* Left column - Content */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left">
                    {/* Name with hover animation */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                      
                      {/* Smooth hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-radial from-blue-400/10 via-blue-500/5 to-transparent rounded-full blur-3xl group-hover:from-blue-400/20 group-hover:via-blue-500/10 transition-all duration-700 ease-out -z-10"
                        animate={{
                          scale: [1, 1.02, 1],
                          opacity: [0.4, 0.6, 0.4]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.h1>

                    {/* Introduction */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
                    >
                      Currently pursuing my Master's in Computer Applications, I enjoy building tools, 
                      exploring AI, and breaking into security labs one exploit at a time.
                    </motion.p>

                    {/* Call to Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                    >
                      <motion.a
                        id="view-work-button"
                        href="#projects"
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          View My Work
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                      
                      <motion.a
                        href="/resume.pdf"
                        download
                        className="group relative px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:text-white hover:shadow-2xl hover:shadow-blue-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <FiDownload className="w-5 h-5" />
                          Download Resume
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-blue-500"
                          initial={{ y: '100%' }}
                          whileHover={{ y: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="space-y-3 mb-8 flex flex-col items-center lg:items-start"
                    >
                      {/* Location */}
                      <div className="flex items-center text-gray-300">
                        <FiMapPin className="mr-3 text-blue-400" size={18} />
                        <span>Bangalore, Karnataka, India</span>
                      </div>
                      
                      {/* Phone */}
                      <div className="flex items-center text-gray-300">
                        <FiPhone className="mr-3 text-blue-400" size={18} />
                        <a 
                          href="tel:+919741301245" 
                          className="hover:text-blue-400 transition-colors"
                        >
                          +91-9741301245
                        </a>
                      </div>
                      
                      {/* Email */}
                      <div className="flex items-center text-gray-300">
                        <FiMail className="mr-3 text-blue-400" size={18} />
                        <a 
                          href="mailto:gebin.official@gmail.com" 
                          className="hover:text-blue-400 transition-colors"
                        >
                          gebin.official@gmail.com
                        </a>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Right column - Profile Image and Social Links */}
                  <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                    {/* Profile Image with Animation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mb-8"
                    >
                      <div className="relative">
                        {/* Glow effect behind image */}
                        <motion.div 
                          className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.7, 0.5]
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Profile image with frame */}
                        <motion.div
                          className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-xl shadow-blue-500/30"
                          whileHover={{ scale: 1.05 }}
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
                          
                          {/* Animated border overlay */}
                          <motion.div 
                            className="absolute inset-0 rounded-full border-4 border-blue-400/0"
                            animate={{
                              boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0)', '0 0 0 8px rgba(59, 130, 246, 0.2)', '0 0 0 0px rgba(59, 130, 246, 0)'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Social Media Icons - Centered on right half */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="flex flex-wrap justify-center gap-4"
                    >
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <motion.a
                            key={index}
                            href={social.href}
                            rel="noopener noreferrer"
                            className={`p-3 rounded-full border border-gray-700 text-gray-400 ${social.color} transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/30 group relative overflow-hidden`}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
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