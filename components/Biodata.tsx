"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiUser, FiCalendar, FiMapPin, FiBook, FiAward, FiHeart, FiPhone, FiMail, FiUsers, FiChevronRight, FiCode } from "react-icons/fi";
import ScrollAnimation from "./ScrollAnimation";
import { ReactNode } from "react";

interface BiodataItem {
  label: string;
  value: string;
  field?: string;
  year?: string;
  details?: string[];
}

interface BiodataSection {
  title: string;
  icon: ReactNode;
  items: BiodataItem[];
}

export default function Biodata() {
  const [activeSection, setActiveSection] = useState(0);

  const sections: BiodataSection[] = [
    {
      title: "Personal Information",
      icon: <FiUser className="text-blue-400 text-xl" />,
      items: [
        { label: "Full Name", value: "Gebin George" },
        { label: "Date of Birth", value: "21 August 2001" },
        { label: "Place of Birth", value: "Kerala, India" },
        { label: "Nationality", value: "Indian" },
        { label: "Current Location", value: "Bangalore, Karnataka" },
        { label: "Languages", value: "English, Hindi, Malayalam, Kannada (Basic)" }
      ]
    },
    {
      title: "Educational Qualifications",
      icon: <FiBook className="text-blue-400 text-xl" />,
      items: [
        { 
          label: "Master of Computer Applications (MCA)", 
          value: "Christ University, Bangalore",
          year: "2024 - Present",
          details: [
            "Specialization: AI and Machine Learning",
            "Focus: Cybersecurity and Software Development",
            "Research: Emerging Technologies"
          ]
        },
        { 
          label: "Bachelor of Computer Applications (BCA)", 
          value: "St. Francis de Sales College, Bangalore",
          year: "2020 - 2023",
          details: [
            "Focus: Web Development and Database Management",
            "Strong foundation in programming languages",
            "Project-based learning approach"
          ]
        },
        { 
          label: "Pre-University Course (PCMC)", 
          value: "St. Francis PU College, Karnataka",
          year: "Completed 2020",
          details: [
            "Stream: Physics, Chemistry, Mathematics, Computer Science",
            "Academic Excellence in STEM subjects"
          ]
        }
      ]
    },
    {
      title: "Professional Skills",
      icon: <FiCode className="text-blue-400 text-xl" />,
      items: [
        { 
          label: "Programming Languages", 
          value: "JavaScript, TypeScript, Python, Golang, Java",
          details: [
            "Frontend: React, Next.js, HTML5, CSS3",
            "Backend: Node.js, Express.js, Firebase",
            "Database: MySQL, SQLite, Firestore",
            "Tools: Git, VS Code, Postman, AWS"
          ]
        },
        { 
          label: "Specializations", 
          value: "Full-Stack Development, AI Integration, Cybersecurity",
          details: [
            "Web Application Development",
            "API Development and Integration",
            "Security Testing and OSINT",
            "AI-powered Application Development"
          ]
        },
        { 
          label: "Current Learning", 
          value: "Advanced AI/ML, Cloud Computing, DevOps",
          details: [
            "Machine Learning with Python",
            "AWS Cloud Services",
            "Docker and Kubernetes",
            "Advanced Cybersecurity Techniques"
          ]
        }
      ]
    },
    {
      title: "Work Experience",
      icon: <FiAward className="text-blue-400 text-xl" />,
      items: [
        { 
          label: "2024 – Redinent Technologies", 
          value: "R&D Intern",
          details: [
            "Web Penetration Testing",
            "OSINT Research and Analysis",
            "Security Vulnerability Assessment",
            "Research on emerging security threats"
          ]
        },
        { 
          label: "2023 – [24]7.ai (Best Buy Process)", 
          value: "Tech Support Advisor",
          details: [
            "Customer Technical Support",
            "Issue Resolution and Troubleshooting",
            "Product Knowledge and Assistance",
            "Customer Satisfaction Management"
          ]
        }
      ]
    },
    {
      title: "Notable Projects",
      icon: <FiAward className="text-blue-400 text-xl" />,
      items: [
        { 
          label: "BugBesty", 
          value: "AI-powered Bug Bounty Automation Dashboard",
          year: "2025",
          details: [
            "Built with Next.js, Firebase, and Gemini API",
            "Automated subdomain enumeration and vulnerability tracking",
            "AI-powered report generation",
            "Phishing detection and prevention"
          ]
        },
        { 
          label: "Christ Wellness", 
          value: "Mental Wellness Portal for Christ University",
          year: "2025",
          details: [
            "Role-based access system for students, counselors, and admins",
            "Event management and counselor booking system",
            "WhatsApp bot integration",
            "Firebase backend with real-time features"
          ]
        },
        { 
          label: "TheatreMe", 
          value: "Movie Ticket Booking Platform",
          year: "2025",
          details: [
            "Built in 90 minutes during lab exam",
            "Golang backend with concurrent user handling",
            "Seat selection and booking management",
            "SQLite database integration"
          ]
        }
      ]
    },
    {
      title: "Achievements & Interests",
      icon: <FiHeart className="text-blue-400 text-xl" />,
      items: [
        { 
          label: "Technical Achievements", 
          value: "8+ Projects Built, Open Source Contributor",
          details: [
            "Built projects ranging from simple HTML to AI-powered applications",
            "Active on GitHub with various repositories",
            "Continuous learning and skill development",
            "Problem-solving through code"
          ]
        },
        { 
          label: "Personal Interests", 
          value: "AI Research, Cybersecurity, Technology Exploration",
          details: [
            "Passionate about artificial intelligence and machine learning",
            "Interest in cybersecurity and ethical hacking",
            "Technology enthusiast and early adopter",
            "Enjoys exploring new programming languages and frameworks"
          ]
        },
        { 
          label: "Philosophy", 
          value: "Learning by Building, Curiosity-Driven Development",
          details: [
            "Believes in hands-on learning through real projects",
            "Curiosity-driven approach to technology",
            "Adapts quickly to new tech environments",
            "Every bug is a learning opportunity"
          ]
        }
      ]
    }
  ];

  return (
    <section id="biodata" className="py-20 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid background */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
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
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.2, 0.6, 0.2],
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Bio
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                data
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
              A comprehensive overview of my journey, skills, and achievements
            </motion.p>
          </div>
        </ScrollAnimation>

        <div className="max-w-7xl mx-auto">
          {/* Section Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex flex-nowrap gap-2 md:gap-4 pb-4 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`flex items-center px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
                    activeSection === index
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-blue-500/30 hover:text-blue-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Section Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-8 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="space-y-4 md:space-y-6">
              {sections[activeSection].items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 md:p-6 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                          {item.label}
                        </h3>
                        {item.year && (
                          <span className="text-xs md:text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20 self-start sm:self-center">
                            {item.year}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                        {item.value}
                      </p>
                      {item.details && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-200 mb-2">Details:</h4>
                          <ul className="space-y-1">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start text-gray-400 text-sm md:text-base">
                                <FiChevronRight className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-blue-400/30 transition-all duration-300"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.a
                href="tel:+919741301245"
                className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiPhone className="text-blue-400 mr-4 text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-200 font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">+91-9741301245</p>
                </div>
              </motion.a>
              <motion.a
                href="mailto:gebin.official@gmail.com"
                className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail className="text-blue-400 mr-4 text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-200 font-medium">Email</p>
                  <p className="text-gray-400 text-sm break-all">gebin.official@gmail.com</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}