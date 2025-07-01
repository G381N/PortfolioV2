"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiCalendar } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import ScrollAnimation from "./ScrollAnimation";

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Featured Projects - displayed with large cards
  const featuredProjects = [
    {
      title: "BugBesty",
      description: "Created in my third semester to streamline bug bounty workflows: automated subdomain enumeration, screenshot capture, phishing checks, and AI-powered report generation using Gemini API. Built with Next.js, REST APIs (including Shodan), and Firebase as the backend.",
      story: "A comprehensive project born from the need to automate repetitive bug bounty tasks. This platform combines multiple security tools and APIs to create an efficient workflow for security researchers and penetration testers.",
      stack: ["Next.js", "Firebase Auth", "Firestore", "Gemini API", "Shodan API"],
      github: "https://github.com/G381N/BugBesty",
      live: "https://bugbesty.onrender.com/",
      year: "2025",
      status: "Completed"
    },
    {
      title: "Elcita WhatsApp Bot",
      description: "Developed for the Electronic City Industrial Township Authority (ELCITA), this WhatsApp bot helps residents access services such as property tax and water bill payments. Built with Node.js, Express.js, and Meta's WhatsApp Cloud API, and deployed on AWS LightSail using PM2 and Nginx.",
      story: "A real-world solution for government services digitization, making civic services accessible through WhatsApp. This project is where I learnt to work with the meta whatsapp cloud api.",
      stack: ["Node.js", "WhatsApp API", "AWS LightSail", "PM2", "Nginx"],
      github: "https://github.com/G381N/elcita-whatsapp-bot",
      live: "#",
      whatsapp: "+91 8147148016",
      year: "2025",
      status: "Completed"
    }
  ];

  // Regular Projects - displayed in smaller grid cards
  const regularProjects = [
    {
      title: "Christ Wellness",
      description: "A dual-module platform for Christ University students. The web app offers a social feed, events, and activities, while the WhatsApp bot enables anonymous complaints, counselor session bookings, and department-based communication. Built with Next.js, Firebase, and WhatsApp Cloud API.",
      stack: ["Firebase Auth", "Next.js", "WhatsApp API", "Firestore"],
      github: "https://github.com/G381N/student-wellness",
      live: "https://student-wellness-gamma.vercel.app/",
      whatsapp: "+91 9380213122",
      year: "2025",
      status: "Completed"
    },
    {
      title: "GoMovies",
      description: "Created within 90 minutes for a lab exam, I built a movie ticket booking platform entirely in Golang. I used AI to speed up the UI, but all concurrency, session management, and backend logic were coded manually. A solid exercise in fast-paced development.",
      stack: ["Golang","HTML", "CSS", "JavaScript"],
      github: "https://github.com/G381N/GoMAKE",
      live: "https://gomovies.gebin.net/",
      year: "2024",
      status: "Completed"
    },
    {
      title: "Christ Cravings",
      description: "A GUI-based Golang assignment, this food-ordering app was my first hands-on Go GUI project. It includes bill generation and PDF download features—showing what's possible in Golang beyond terminal-based programs. Also its the first time I used Render to host a webservice.",
      stack: ["HTML", "CSS", "JavaScript", "Golang", "Render"],
      github: "https://github.com/G381N/christ-class-delivery",
      live: "https://christcravings.gebin.net/",
      year: "2024",
      status: "Completed"
    },
    {
      title: "Phishing Awareness Demo",
      description: "Built as a college assignment, this interactive project simulates a real phishing attack to raise awareness. It replaces a static poster with a fake login demo and a URL scanner using VirusTotal — showing how urgency can trick even cautious users.",
      stack: ["React", "Next.js", "Tailwind CSS", "Cybersecurity"],
      github: "https://github.com/G381N/Poster",
      live: "https://poster-three.vercel.app/",
      year: "2025",
      status: "Completed"
    },
    {
      title: "Code Breaker",
      description: "A spontaneous two-hour lab project from my third semester. Built with Next.js, it showcases basic encryption and decryption operations, along with a playful (and imperfect) steganography attempt. It was a fun deep-dive into crypto fundamentals during a quiet lab session to kill some time.",
      stack: ["Next.js", "Tailwind CSS", "Cryptography","Vercel"],
      github: "https://github.com/G381N/CodeBreaker",
      live: "https://codebreaker.gebin.net/",
      year: "2024",
      status: "Completed"
    },
    {
      title: "Gadi Doctor",
      description: "A vehicle-service portal built from a web dev assignment. Starting from an HTML template, I integrated Google Maps API, created custom REST APIs, added form validations, and structured the frontend—laying the groundwork for future React-based projects.",
      stack: ["HTML", "CSS", "JavaScript", "Google Maps API"],
      github: "https://github.com/G381N/CarService",
      live: "https://gadidoctor.gebin.net/",
      year: "2024",
      status: "Completed"
    },
    {
      title: "One Minute Grace",
      description: "Designed for my father's social media initiative, this Next.js app pulls in daily motivational messages via Facebook and Instagram APIs. It's a simple, inspiring tool to learn social media integration and API consumption.",
      stack: ["Next.js", "Tailwind CSS", "Facebook API", "Instagram API"],
      github: "https://github.com/valianayil/Omg",
      live: "https://www.oneminutegrace.com/",
      year: "2023",
      status: "Completed"
    },
    {
      title: "The Atlas Game",
      description: "A geography-based learning game inspired by GeoGuessr and the Indian 'Atlas' classroom game. Built using Next.js and Firebase (Realtime DB, Auth, Storage), it verifies user entries via Gemini API, dynamically grows the dataset of recognized places, and helps students learn geography interactively.",
      stack: ["Next.js", "Tailwind CSS", "Firebase", "Gemini API"],
      github: "https://github.com/G381N/atlas",
      live: "#",
      year: "2024",
      status: "Completed"
    },
    {
      title: "IoT Air Quality Monitor",
      description: "Another IoT exploration that measures pollution levels and reports air quality index in real time. This project taught me sensor calibration, data logging, and visualization concepts—valuable fundamentals for environmental monitoring tools and smart devices.",
      stack: ["Arduino", "Wokwi"],
      live: "https://wokwi.com/projects/your-project-id",
      year: "2023",
      status: "Completed"
    },
    {
      title: "IoT Gas Leakage Sensor",
      description: "This lab project was my introduction to IoT. I built a sensor that detects gas leaks and sends real-time alerts, learning how hardware, firmware, and software intersect. Through this, I explored embedded systems, data transmission, and alert-trigger logic.",
      stack: ["Arduino", "IoT Sensors", "C++", "ESP32", "Real-time Monitoring"],
      live: "https://wokwi.com/projects/435153305648727041",
      year: "2023",
      status: "Completed"
    }
  ];

  const displayedRegularProjects = showAllProjects ? regularProjects : regularProjects.slice(0, 6);

  const openWhatsApp = (number: string, projectName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${projectName} project. Could you tell me more about it?`);
    const whatsappUrl = `https://wa.me/${number.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="projects" className="py-16 md:py-20 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
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
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
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

      <div className="container mx-auto px-4 relative z-10">
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
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 relative overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status Badge - Fixed positioning */}
                <div className="absolute top-6 right-6 z-10 hidden md:block">
                  <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    Completed in {project.year}
                  </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium group/btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiGithub className="mr-3 group-hover/btn:rotate-12 transition-transform" size={18} />
                          View Code
                        </motion.a>
                      )}
                      
                      {project.live && project.live !== "#" && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium group/btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiExternalLink className="mr-3 group-hover/btn:rotate-12 transition-transform" size={18} />
                          Live Demo
                        </motion.a>
                      )}
                      
                      {project.whatsapp && (
                        <motion.button
                          onClick={() => openWhatsApp(project.whatsapp!, project.title)}
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Section */}
        <ScrollAnimation>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Other Projects
          </h3>
        </ScrollAnimation>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedRegularProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
              >
                <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-5 h-full flex flex-col relative overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Status Badge - Fixed positioning */}
                  <div className="absolute top-3 right-3 z-10 hidden md:block">
                    <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      {project.year}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-4 pr-16">
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                        {project.title}
                      </h4>
                      
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4 flex-grow">
                      <div className="flex flex-wrap gap-1">
                        {project.stack.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      {project.github && project.github !== "#" && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-medium group/btn flex-1 justify-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiGithub className="mr-1 group-hover/btn:rotate-12 transition-transform" size={12} />
                          Code
                        </motion.a>
                      )}
                      
                      {project.live && project.live !== "#" && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium group/btn flex-1 justify-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiExternalLink className="mr-1 group-hover/btn:rotate-12 transition-transform" size={12} />
                          Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Subtle Toggle for Regular Projects */}
        {regularProjects.length > 6 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium relative group"
            >
              {showAllProjects ? "Show Less" : "Show More"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
} 