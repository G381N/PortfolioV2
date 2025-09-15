// Portfolio update - 2024
"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import { useRef } from "react";
import ScrollAnimation from "./ScrollAnimation";

// Define types for experience data
interface ExperienceWithRole {
  location: string;
  role: string;
  institution?: string;
}

interface ExperienceWithRoles {
  location: string;
  roles: string[];
  institution?: string;
  workprofile?: string;
}

type ExperienceItem = ExperienceWithRole | ExperienceWithRoles;

interface YearGroup {
  year: string;
  experiences: ExperienceItem[];
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Gebin's experience data
  const consolidatedExperiences: YearGroup[] = [
    {
      year: "2024",
      experiences: [
        {
          location: "Redinent Technologies",
          role: "R&D Intern",
          institution: "Gained hands‑on experience in web security through PortSwigger labs, learning vulnerability signatures, Nmap scanning, and OSINT fundamentals.",
        }
      ]
    },
    {
      year: "2023",
      experiences: [
        {
          location: "[24]7.ai (Best Buy Process)",
          role: "Tech Support Advisor",
          institution: "I worked as a Geek Squad Agent, responsible for diagnosing, troubleshooting, and resolving technical issues across various consumer devices.",
        }
      ]
    },
  ];

  // Helper function to check if experience has role or roles
  const hasRole = (experience: ExperienceItem): experience is ExperienceWithRole => {
    return 'role' in experience;
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-40 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12">
            Work Experience
          </h2>
        </ScrollAnimation>

        {/* Vertical Timeline for Desktop and Tablet */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400 rounded-full"></div>
            
            {/* Year Markers */}
            {consolidatedExperiences.map((yearGroup, index) => (
              <div key={yearGroup.year} className="absolute left-1/2 transform -translate-x-1/2" style={{ top: `${index * 300 + 50}px` }}>
                <div className="z-10 flex items-center justify-center w-14 h-14 rounded-full bg-black border-4 border-blue-500 shadow-lg relative">
                  <span className="text-blue-400 font-bold text-sm">{yearGroup.year}</span>
                </div>
              </div>
            ))}
            
            <div className="space-y-0">
              {consolidatedExperiences.map((yearGroup, index) => (
                <div key={index} className="relative">
                  {/* Content */}
                  <div className={`mt-16 mb-16 ${index % 2 === 0 ? 'ml-auto pl-16 pr-8' : 'mr-auto pr-16 pl-8'} w-[calc(50%-1rem)]`}>
                    {yearGroup.experiences.map((experience, expIndex) => (
                      <motion.div
                        key={expIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: expIndex * 0.1 }}
                        className={expIndex > 0 ? "mt-8 pt-8 border-t border-gray-800" : ""}
                      >
                        <div className="bg-gray-900/50 rounded-xl shadow-lg shadow-blue-500/10 p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                          <div className="flex items-start gap-3 mb-3">
                            <FiMapPin className="mr-2 text-blue-400 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-white">{experience.location}</h4>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {hasRole(experience) ? (
                              <div className="flex items-start gap-3">
                                <FiBriefcase className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                <div>
                                  <h5 className="text-lg font-semibold text-white">{experience.role}</h5>
                                  {experience.institution && (
                                    <p className="text-gray-400">{experience.institution}</p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start gap-3">
                                <FiBriefcase className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                <div>
                                  <h5 className="text-lg font-semibold text-white mb-2">Roles:</h5>
                                  <ul className="space-y-1">
                                    {experience.roles.map((role, roleIndex) => (
                                      <li key={roleIndex} className="text-gray-300 flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        {role}
                                      </li>
                                    ))}
                                  </ul>
                                  {experience.institution && (
                                    <p className="text-gray-400 pt-2 border-t border-gray-800 italic mt-3">
                                      {experience.institution}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Experience Cards - Vertical stacked layout */}
        <div className="md:hidden">
          <div className="relative">
            {/* Timeline Line - Mobile */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400 rounded-full"></div>
            
            {/* Year Markers */}
            {consolidatedExperiences.map((yearGroup, index) => (
              <div key={yearGroup.year} className="absolute left-0" style={{ top: `${index * 200 + 30}px` }}>
                <div className="z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black border-3 border-blue-500 shadow-md">
                  <span className="text-blue-400 font-bold text-xs">{yearGroup.year}</span>
                </div>
              </div>
            ))}
            
            <div className="space-y-8">
              {consolidatedExperiences.map((yearGroup, index) => (
                <div key={index} className="relative pl-12">
                  {/* Content */}
                  <div className="mb-2">
                    {yearGroup.experiences.map((experience, expIndex) => (
                      <motion.div
                        key={expIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: expIndex * 0.1 }}
                        className={expIndex > 0 ? "mt-5 pt-5 border-t border-gray-800" : ""}
                      >
                        <div className="bg-gray-900/50 rounded-xl shadow-md shadow-blue-500/10 p-4 border border-gray-800">
                          <div className="flex items-start gap-2 mb-2">
                            <FiMapPin className="mr-1.5 text-blue-400 flex-shrink-0 text-sm" />
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-white">{experience.location}</h4>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {hasRole(experience) ? (
                              <div className="flex items-start gap-2">
                                <FiBriefcase className="mr-1.5 mt-0.5 text-blue-400 flex-shrink-0 text-sm" />
                                <div>
                                  <h5 className="text-md font-semibold text-white">{experience.role}</h5>
                                  {experience.institution && (
                                    <p className="text-gray-400 text-sm">{experience.institution}</p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start gap-2">
                                <FiBriefcase className="mr-1.5 mt-0.5 text-blue-400 flex-shrink-0 text-sm" />
                                <div>
                                  <h5 className="text-md font-semibold text-white mb-1">Roles:</h5>
                                  <ul className="space-y-1">
                                    {experience.roles.map((role, roleIndex) => (
                                      <li key={roleIndex} className="text-gray-300 text-sm flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        {role}
                                      </li>
                                    ))}
                                  </ul>
                                  {experience.institution && (
                                    <p className="text-gray-400 pt-2 border-t border-gray-800 italic text-xs mt-2">
                                      {experience.institution}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}