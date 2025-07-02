"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInstagram, FiArrowLeft, FiUsers, FiImage, FiExternalLink, FiGithub, FiLinkedin, FiYoutube, FiMapPin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { TbMotorbike } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  opacity: number;
}

// Simplified floating particles system
const useParticleSystem = (count: number) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();

  const createParticle = useCallback((index: number): Particle => {
    return {
      id: index,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      life: 1,
      maxLife: Math.random() * 200 + 100,
      color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`, // Blue/cyan range
      opacity: Math.random() * 0.3 + 0.1
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setParticles(Array.from({ length: count }, (_, i) => createParticle(i)));

    const animate = () => {
      setParticles(prev => prev.map(particle => {
        const newParticle = {
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.5
        };

        // Wrap around screen edges
        if (newParticle.x < 0) newParticle.x = window.innerWidth;
        if (newParticle.x > window.innerWidth) newParticle.x = 0;
        if (newParticle.y < 0) newParticle.y = window.innerHeight;
        if (newParticle.y > window.innerHeight) newParticle.y = 0;

        if (newParticle.life <= 0) {
          return createParticle(particle.id);
        }

        return newParticle;
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, createParticle]);

  return particles;
};

export default function BikesWithGebinPage() {
  const [showMenu, setShowMenu] = useState(false);
  const particles = useParticleSystem(8); // Reduced particle count

  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/G381N/",
      label: "GitHub",
      color: "from-gray-400 to-gray-600"
    },
    {
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/gebin-george-aa4b40317/",
      label: "LinkedIn", 
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: FiInstagram,
      href: "https://www.instagram.com/bikeswithgebin/",
      label: "Instagram",
      color: "from-cyan-400 to-blue-600"
    },
    {
      icon: FiYoutube,
      href: "https://www.youtube.com/channel/UCJWCQkIes8obeWnSYMJWoJg/",
      label: "YouTube",
      color: "from-red-400 to-red-600"
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/G38iNGeorge",
      label: "X (Twitter)",
      color: "from-gray-800 to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Simplified Particle System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          {particles.map(particle => (
            <circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={particle.color}
              opacity={particle.opacity}
            />
          ))}
        </svg>

        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <motion.div
                  className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300"
                  whileHover={{ rotate: -5 }}
                >
                  <FiArrowLeft size={20} />
                </motion.div>
                <span className="font-medium">Portfolio</span>
              </Link>
            </motion.div>
            
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            
            <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
              <div className="relative">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <TbMotorbike size={24} className="text-white" />
                </motion.div>
              </div>
              
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  <span className="text-cyan-400">Bikes</span>
                  <span className="text-white">WithGebin</span>
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Profile", href: "#profile" },
              { label: "About", href: "#about" },
              { label: "YouTube", href: "/hitpixels" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                >
                  {item.label}
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-400 group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
            
            <motion.a
              href="https://www.instagram.com/bikeswithgebin/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiInstagram size={18} />
              <span>Follow</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-3 rounded-xl bg-white/5 text-white"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span 
                className="w-full h-0.5 bg-white block mb-1.5 rounded-full"
                animate={showMenu ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white block mb-1.5 rounded-full"
                animate={showMenu ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white block rounded-full"
                animate={showMenu ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="md:hidden backdrop-blur-xl bg-slate-900/90 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                {[
                  { label: "Profile", href: "#profile" },
                  { label: "About", href: "#about" },
                  { label: "YouTube", href: "/hitpixels" }
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors py-2 font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.a
                  href="https://www.instagram.com/bikeswithgebin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <FiInstagram size={20} />
                  Follow on Instagram
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-16 px-6 min-h-screen flex items-center justify-center">
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-6"
            >
              <p className="text-lg md:text-xl font-light text-gray-400 mb-4">
                Two Wheels, Endless Adventures
              </p>
            </motion.div>

            <div className="relative mb-10">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <span className="text-cyan-400 font-black">Bikes</span>
                <br />
                <span className="text-white font-black">With</span>{" "}
                <span className="text-blue-400 font-black">Gebin</span>
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
                Join me on{" "}
                <span className="text-cyan-400 font-medium">two-wheeled adventures</span>{" "}
                as I explore roads less traveled, share{" "}
                <span className="text-blue-400 font-medium">riding tips</span>, 
                and showcase the beauty of motorcycling.
              </p>
              
              <p className="text-md text-gray-400">
                From weekend rides to maintenance hacks! 🏍️
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="https://www.instagram.com/bikeswithgebin/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiInstagram size={24} />
                <span>Follow on Instagram</span>
              </motion.a>

              <motion.a
                href="#profile"
                className="group relative overflow-hidden backdrop-blur-xl bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 border border-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Profile</span>
                <FiUsers size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-semibold text-md mb-4 tracking-wide uppercase">
              Instagram Profile
            </p>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-cyan-400">@bikes</span>
              <span className="text-white">withgebin</span>
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Documenting every twist, turn, and open road adventure
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
            >
              <motion.div 
                className="relative w-48 h-48 mx-auto mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-cyan-500 to-blue-600 p-1"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    <Image
                      src="/dp.png"
                      alt="Gebin George - Bikes With Gebin"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-4">@bikeswithgebin</h3>

              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">14</div>
                  <div className="text-sm text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">51</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">37</div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
              </div>

              <div className="space-y-3 text-gray-300 leading-relaxed mb-6">
                <p className="flex items-center justify-center gap-2">
                  <TbMotorbike className="text-cyan-400" />
                  Chasing horizons on two wheels
                </p>
                <p>Stories from the road less traveled</p>
                <p className="flex items-center justify-center gap-2">
                  <FiMapPin className="text-blue-400" />
                  Based in Bangalore, India 🇮🇳
                </p>
              </div>

              <motion.a
                href="https://www.instagram.com/bikeswithgebin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink size={20} />
                <span>Visit Instagram</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="relative w-80 h-80 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/20"
                  style={{
                    background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)"
                  }}
                >
                  <Image
                    src="/dp.png"
                    alt="Gebin George - Motorcycle Enthusiast"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div>
                <p className="text-cyan-400 font-semibold text-md mb-4 tracking-wide uppercase">
                  About the Rider
                </p>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  <span className="text-cyan-400">Meet</span>{" "}
                  <span className="text-white">Gebin</span>
                </h2>
              </motion.div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {[
                  "Welcome to my world of two-wheeled adventures! 🏍️ I'm on a mission to ride them all—bikes, that is. Just like in Pokémon, where you gotta catch 'em all, I'm all about experiencing as many motorcycles as possible.",
                  "From thrilling bike trips to sharing tips and experiences, my Instagram is where I document every twist, turn, and open road. Based in Bangalore, India, I live for the freedom of the ride! 🇮🇳",
                  "Join me on this journey, where every ride tells a story. Whether it's weekend adventures, maintenance tips, or discovering new machines—it's all about the experience and the community we build.",
                  "Let's ride together! 🚀"
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    className={`text-md leading-relaxed ${index === 3 ? 'text-cyan-400 font-semibold' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
              
              <motion.div className="pt-6">
                <p className="text-gray-400 mb-4">Connect with me</p>
                
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 