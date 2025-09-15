// Portfolio update - 2024
"use client";

import { motion } from "framer-motion";
import { FiAward, FiUsers, FiBook, FiCode } from "react-icons/fi";
import ScrollAnimation from "./ScrollAnimation";
import AnimatedCard from "./AnimatedCard";
import { getTotalProjectCount } from "../data/projects";

export default function About() {
  // Dynamic project count - automatically counts from projects data
  const totalProjects = getTotalProjectCount();

  const stats = [
    {
      value: "1 Year",
      label: "Experience",
      icon: <FiAward className="text-blue-400 text-2xl" />,
    },
    {
      value: "MCA",
      label: "Student",
      icon: <FiBook className="text-blue-400 text-2xl" />,
    },
    {
      value: `${totalProjects}+`,
      label: "Projects Built",
      icon: <FiCode className="text-blue-400 text-2xl" />,
    },
    {
      value: "AI & Cyber",
      label: "Enthusiast",
      icon: <FiUsers className="text-blue-400 text-2xl" />,
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid background */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(59, 130, 246, 0.02) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px'
             }} 
        />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-40 left-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-blue-400/3 blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
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

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {" "}Me
              </span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p 
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building the future through code, curiosity, and continuous learning
            </motion.p>
          </div>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimation delay={0.2} direction="up">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-12 hover:border-blue-400/30 transition-all duration-300">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="mb-6 text-gray-300 leading-relaxed">
                  I'm a curious learner who loves experimenting with new technologies. My passion has led me to explore <span className="text-blue-400 font-semibold">prompt engineering</span>, APIs, automation, Golang, web development, and AI tools. Whether it's building a WhatsApp bot or crafting automation scripts, I learn best by getting my hands dirty with real projects.
                </p>
                
                <p className="mb-6 text-gray-300 leading-relaxed">
                  You'll often find me tackling <span className="text-blue-400 font-medium">PortSwigger Labs</span>, diving into cybersecurity challenges, and working on projects that blend creativity with technical problem-solving. From simple HTML templates to AI-powered applications, every project teaches me something new and pushes my boundaries.
                </p>
                
                <p className="mb-6 text-gray-300 leading-relaxed">
                  Currently pursuing my <span className="text-blue-400 font-medium">MCA at Christ University, Bengaluru</span> — a fast-paced program that inspired me to build practical projects for deeper learning. The academic environment challenges me to think critically while giving me the freedom to experiment with emerging technologies.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  I believe in hands-on learning and adapt quickly to new tech environments. Every bug I encounter, every API I integrate, and every automation I create is driven by pure curiosity and the excitement of solving real-world problems through code.
                </p>
              </div>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? -50 : 50,
                    rotateY: isEven ? -15 : 15
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: 0
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  className="h-full"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 md:p-6 text-center h-full hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/10 transition-all duration-300 group min-h-[140px] flex flex-col justify-center">
                    <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-800/50 border border-blue-400/30 mb-3 md:mb-4 mx-auto group-hover:border-blue-400/60 transition-all duration-300">
                      {stat.icon}
                    </div>
                    <motion.div 
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 120, delay: 0.3 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-gray-400 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 