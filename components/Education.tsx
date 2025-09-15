// Portfolio update - 2024
"use client";

import { motion } from "framer-motion";
import { FiBook, FiAward, FiCalendar, FiMapPin } from "react-icons/fi";
import ScrollAnimation from "./ScrollAnimation";
import AnimatedCard from "./AnimatedCard";

export default function Education() {
  const educationData = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Christ University",
      duration: "2024 - Present",
      location: "Bangalore, Karnataka",
      description: "Currently pursuing advanced studies in computer applications with focus on modern software development, AI applications, and cybersecurity.",
      achievements: [
        "Focus on AI and Machine Learning applications",
        "Cybersecurity and ethical hacking specialization",
        "Full-stack development projects",
        "Research in emerging technologies"
      ],
      icon: <FiBook className="text-2xl" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "St. Francis de Sales College",
      duration: "2020 - 2023",
      location: "Bangalore, Karnataka",
      description: "Completed comprehensive undergraduate program in computer applications with strong foundation in programming, web development, and software engineering.",
      achievements: [
        "Strong foundation in programming languages",
        "Web development and database management",
        "Software engineering principles",
        "Project-based learning approach"
      ],
      icon: <FiAward className="text-2xl" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      degree: "Pre-University Course (PCMC)",
      institution: "St. Francis PU College",
      duration: "Completed in 2020",
      location: "Karnataka",
      description: "Completed pre-university education with focus on Physics, Chemistry, Mathematics, and Computer Science, building the foundation for technical studies.",
      achievements: [
        "Strong foundation in Mathematics and Science",
        "Introduction to Computer Science",
        "Analytical and problem-solving skills",
        "Academic excellence in core subjects"
      ],
      icon: <FiCalendar className="text-2xl" />,
      color: "from-blue-500 to-blue-600"
    },
  ];

  return (
    <section id="education" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">        
        {/* Animated Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" width="100%" height="100%">
          <pattern id="educationGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#ffffff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#educationGrid)" />
        </svg>
        
        {/* Decorative shapes */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Education
          </h2>
        </ScrollAnimation>
        
        <ScrollAnimation delay={0.1} direction="up">
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 md:mb-16">
            Building a strong foundation in computer science and technology
          </p>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateX: -10 
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0 
                }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }}
              >
                <AnimatedCard delay={index * 0.1} className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Icon and visual element */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center text-white shadow-lg`}>
                        {edu.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="mb-2 md:mb-0">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {edu.degree}
                          </h3>
                          <h4 className="text-lg font-semibold text-blue-400 mb-2">
                            {edu.institution}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                          <div className="flex items-center">
                            <FiCalendar className="mr-2 text-blue-400" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className="mr-2 text-blue-400" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {edu.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {edu.achievements.map((achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.5, 
                              delay: (index * 0.2) + (achievementIndex * 0.1) + 0.3 
                            }}
                            className="flex items-start text-sm"
                          >
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-400">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 