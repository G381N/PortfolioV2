"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiCalendar } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import ScrollAnimation from "./ScrollAnimation";
import { featuredProjects, regularProjects } from "../data/projects";

// Animation constants for consistent animations
const TRANSITION_DURATION = 0.2;
const FLIP_TRANSITION = { 
  duration: 0.4, 
  type: "tween",
  ease: "easeInOut"
};
const IMAGE_TRANSITION = {
  duration: TRANSITION_DURATION
};

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<Record<string, boolean>>({});

  // Automatic image cycling with useEffect
  useEffect(() => {
    // Create timers for each flipped card
    const timers: NodeJS.Timeout[] = [];
    
    flippedCards.forEach(projectTitle => {
      if (autoPlayEnabled[projectTitle]) {
        const timer = setInterval(() => {
          const project = [...featuredProjects, ...regularProjects].find(p => p.title === projectTitle);
          if (project && project.images) {
            setImageIndices(prev => ({
              ...prev,
              [projectTitle]: ((prev[projectTitle] || 0) + 1) % project.images.length
            }));
          }
        }, 3000); // Change image every 3 seconds
        
        timers.push(timer);
      }
    });
    
    // Clean up timers when component unmounts or flipped cards change
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [flippedCards, imageIndices, autoPlayEnabled]);
  
  const displayedRegularProjects = showAllProjects ? regularProjects : regularProjects.slice(0, 6);

  const toggleCardFlip = (projectTitle: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectTitle)) {
        newSet.delete(projectTitle);
        
        // Disable autoplay when flipping back
        setAutoPlayEnabled(prev => ({
          ...prev,
          [projectTitle]: false
        }));
      } else {
        newSet.add(projectTitle);
        
        // Enable autoplay when card is flipped to image view
        setAutoPlayEnabled(prev => ({
          ...prev,
          [projectTitle]: true
        }));
      }
      return newSet;
    });
    
    // Reset image index when flipping back to content
    if (!flippedCards.has(projectTitle)) {
      setImageIndices(prev => ({
        ...prev,
        [projectTitle]: 0
      }));
    }
  };
  
  const cycleImage = (event: React.MouseEvent, projectTitle: string, direction: 'next' | 'prev', imagesLength: number) => {
    event.stopPropagation();
    
    // Temporarily pause autoplay when manually navigating
    setAutoPlayEnabled(prev => ({
      ...prev,
      [projectTitle]: false
    }));
    
    setImageIndices(prev => {
      const currentIndex = prev[projectTitle] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % imagesLength;
      } else {
        newIndex = (currentIndex - 1 + imagesLength) % imagesLength;
      }
      
      return {
        ...prev,
        [projectTitle]: newIndex
      };
    });
    
    // Resume autoplay after a short delay (5 seconds)
    setTimeout(() => {
      setAutoPlayEnabled(prev => ({
        ...prev,
        [projectTitle]: true
      }));
    }, 5000);
  };

  const openWhatsApp = (number: string, projectName: string) => {
    let message = "";
    
    if (projectName === "Elcita WhatsApp Bot") {
      message = encodeURIComponent("Hi");
    } else if (projectName === "Christ Wellness") {
      message = encodeURIComponent(`Hi! I'm interested in the ${projectName} project. Could you tell me more about it?`);
    } else {
      message = encodeURIComponent(`Hi! I'm interested in the ${projectName} project. Could you tell me more about it?`);
    }
    
    const whatsappUrl = `https://wa.me/${number.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="projects" className="py-16 md:py-20 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 40, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Featured Projects
          </h2>
        </ScrollAnimation>
        
        <ScrollAnimation delay={0.1} direction="up">
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 md:mb-16">
            Showcasing innovative solutions across web development, IoT systems, and cutting-edge technologies
          </p>
        </ScrollAnimation>

        {/* Featured Projects - Large Cards */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div 
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 relative overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
                onClick={() => project.images?.length > 0 && project.live && project.live !== "#" && toggleCardFlip(project.title)}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                {/* Status Badge - Only show in content mode */}
                {!flippedCards.has(project.title) && (
                  <div className="absolute top-6 right-6 z-30 hidden md:block">
                    <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      Completed in {project.year}
                    </span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!flippedCards.has(project.title) ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={FLIP_TRANSITION}
                      className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                      {/* Project Info */}
                      <div className="lg:col-span-2">
                        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors mb-4">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {project.story}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.stack.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (index * 0.2) + (techIndex * 0.05) }}
                              className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="lg:col-span-1 flex flex-col justify-center">
                        <div className="flex flex-col gap-4">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiGithub size={16} />
                              <span>Code</span>
                            </motion.a>
                          )}
                          
                          {project.live && project.live !== "#" && (
                            <motion.a
                              href={project.live}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white transition-all duration-300 text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiExternalLink size={16} />
                              <span>Demo</span>
                            </motion.a>
                          )}
                          
                          {project.whatsapp && (
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                openWhatsApp(project.whatsapp!, project.title);
                              }}
                              className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium group/btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <SiWhatsapp className="mr-3 group-hover/btn:scale-110 transition-transform" size={18} />
                              Contact
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : project.images?.length > 0 && (
                      <motion.div
                        key="image"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={FLIP_TRANSITION}
                        className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-8"
                        style={{ minHeight: "100%" }}
                      >
                        
                        <div className="lg:col-span-2 flex justify-center items-center">
                          <motion.div 
                            className="w-full h-full flex items-center justify-center"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={`main-${project.title}-${imageIndices[project.title] || 0}`}
                            transition={{ duration: 0.4 }}
                          >
                            <motion.img
                              src={project.images[imageIndices[project.title] || 0]}
                              alt={`${project.title} UI Screenshot ${(imageIndices[project.title] || 0) + 1}`}
                              className="w-full max-w-[800px] max-h-[450px] object-contain rounded-lg border border-gray-700 shadow-lg"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ 
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/api/placeholder/800/450';
                              }}
                            />
                          </motion.div>
                        </div>
                        
                        <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center relative">
                          {/* Next image preview - repositioned to center */}
                          <div className="relative w-full flex justify-center items-center mb-8">
                            <motion.div 
                              className="relative"
                              style={{ 
                                perspective: "1000px", 
                                transformStyle: "preserve-3d"
                              }}
                            >
                              <motion.div
                                className="relative w-56 h-32"
                                style={{
                                  rotateY: "-15deg",
                                  rotateX: "8deg",
                                  transformStyle: "preserve-3d",
                                }}
                                whileHover={{ scale: 1.05, rotateY: "-12deg" }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 25
                                }}
                                onClick={(e) => cycleImage(e, project.title, 'next', project.images.length)}
                              >
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-lg transform -translate-z-10 blur-sm" />
                                <img
                                  src={project.images[(imageIndices[project.title] + 1) % project.images.length || 0]}
                                  alt={`${project.title} Next Screenshot`}
                                  className="w-full h-full object-cover rounded-lg border border-blue-500/40 shadow-xl shadow-blue-500/20 cursor-pointer"
                                  style={{ 
                                    filter: "brightness(0.85) contrast(1.15)",
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/api/placeholder/224/128';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-2 rounded-lg">
                                  <span className="text-xs text-white/90 font-medium">Coming Next</span>
                                </div>
                              </motion.div>
                            </motion.div>
                          </div>
                          
                          <div className="text-center bg-black/20 p-4 rounded-lg backdrop-blur-sm border border-gray-800/50">
                            <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                            
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regular Projects Section */}
        <ScrollAnimation>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            More Projects
          </h2>
        </ScrollAnimation>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {displayedRegularProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 h-full hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer relative overflow-hidden"
                onClick={() => project.images?.length > 0 && project.live && project.live !== "#" && toggleCardFlip(project.title)}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                <AnimatePresence mode="wait" initial={false}>
                  {!flippedCards.has(project.title) ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={FLIP_TRANSITION}
                      className="relative z-20 h-full flex flex-col"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-3">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.stack.slice(0, 3).map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (index * 0.1) + (techIndex * 0.03) }}
                              className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-700/50 text-gray-400 rounded border border-gray-600/20">
                              +{project.stack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 rounded text-gray-300 hover:text-white transition-all duration-300 text-sm w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub size={14} />
                            <span>Code</span>
                          </motion.a>
                        )}
                        
                        {project.comingSoon ? (
                          <motion.div
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-orange-600/20 border border-orange-500/30 rounded text-orange-400 text-sm w-full cursor-default"
                            whileHover={{ scale: 1.02 }}
                          >
                            <FiCalendar size={14} />
                            <span>Coming Soon</span>
                          </motion.div>
                        ) : project.live && project.live !== "#" && (
                          <motion.a
                            href={project.live}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors text-sm w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink size={14} />
                            <span>Demo</span>
                          </motion.a>
                        )}
                        
                        {project.whatsapp && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              openWhatsApp(project.whatsapp!, project.title);
                            }}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors text-sm w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <SiWhatsapp size={14} />
                            <span>Contact</span>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ) : project.images?.length > 0 && (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={FLIP_TRANSITION}
                      className="relative z-20 h-full flex flex-col"
                    >
                      {/* Unified interface that matches content mode size */}
                      <div className="h-full flex flex-col">
                        {/* Image section - compact size to match content mode */}
                        <div className="flex-1 flex items-center justify-center mb-4">
                          <div className="w-full h-[160px] bg-transparent flex items-center justify-center relative overflow-hidden">
                            {/* Completely transparent container */}
                            <motion.img
                              src={project.images[imageIndices[project.title] || 0]}
                              alt={`${project.title} UI Screenshot ${(imageIndices[project.title] || 0) + 1}`}
                              className="w-full h-full object-contain absolute inset-0 m-auto"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              key={`unified-${project.title}-${imageIndices[project.title] || 0}`}
                              transition={IMAGE_TRANSITION}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement?.querySelector('.fallback-placeholder')?.classList.remove('hidden');
                              }}
                            />
                            {/* Fallback placeholder for images that fail to load */}
                            <div className="fallback-placeholder hidden absolute inset-0 flex items-center justify-center bg-transparent">
                              <div className="text-blue-400/80 text-center">
                                <div className="text-xl mb-1">📷</div>
                                <p className="text-xs text-gray-400/80">Image</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom info section - compact to match content mode */}
                        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
                          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {project.description.substring(0, 80)}...
                          </p>
                          
                          {/* Tech Stack Preview - matches content mode spacing */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.stack.slice(0, 2).map((tech, techIndex) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.stack.length > 2 && (
                              <span className="px-2 py-1 text-xs bg-gray-700/50 text-gray-400 rounded border border-gray-600/20">
                                +{project.stack.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Text Link - Elegant Design */}
        {regularProjects.length > 6 && (
          <div className="text-center mt-12">
            <motion.div
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="group inline-flex items-center gap-2 cursor-pointer relative"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              {/* Main text */}
              <motion.span 
                className="relative text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-medium text-lg"
                whileHover={{ scale: 1.02 }}
              >
                {showAllProjects ? 'Show less projects' : 'Show more projects'}
              </motion.span>
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              />
              
              {/* Arrow icon with rotation */}
              <motion.div
                className="relative text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                animate={{ 
                  rotate: showAllProjects ? 180 : 0 
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </motion.div>
              
              {/* Floating particles on hover */}
              <motion.div
                className="absolute -top-1 -left-1 w-1 h-1 bg-blue-400/80 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-1 h-1 bg-purple-400/80 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
