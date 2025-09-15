"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import ScrollAnimation from "./ScrollAnimation";

interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

export default function GitActivity() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchGitHubContributions();
    }
  }, [isClient]); // Removed isMobile dependency since we'll show full year on both

  const fetchGitHubContributions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try multiple GitHub API sources for better reliability
      const apiSources = [
        // Primary: GitHub Contributions API with current year
        `https://github-contributions-api.jogruber.de/v4/G381N?y=${new Date().getFullYear()}`,
        // Secondary: Last year data
        `https://github-contributions-api.jogruber.de/v4/G381N?y=last`,
        // Tertiary: All data
        `https://github-contributions-api.jogruber.de/v4/G381N`,
        // Alternative: Skyline API
        `https://skyline.github.com/G381N/${new Date().getFullYear()}.json`
      ];
      
      for (const apiUrl of apiSources) {
        try {
          console.log('Trying API:', apiUrl);
          const response = await fetch(apiUrl, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Portfolio-Website'
            }
          });
          
          if (!response.ok) {
            console.warn(`API ${apiUrl} returned ${response.status}`);
            continue;
          }
          
          const data = await response.json();
          console.log('API Response:', data);
          
          // Handle jogruber API format
          if (data && data.contributions && Array.isArray(data.contributions)) {
            console.log(`Found ${data.contributions.length} contributions from jogruber API`);
            
            const allDays: ContributionDay[] = data.contributions.map((contribution: any) => ({
              date: contribution.date,
              count: contribution.count || 0,
              level: mapContributionLevel(contribution.count || 0)
            }));

            // Always show current year data for both mobile and desktop
            const filteredData = getCurrentYearData(allDays);
            
            if (filteredData.length > 0) {
              setContributionData(filteredData);
              console.log('✅ Successfully loaded real GitHub data from:', apiUrl);
              console.log('Total contributions:', filteredData.reduce((sum, day) => sum + day.count, 0));
              return;
            }
          }
          
          // Handle Skyline API format
          if (data && data.contributions) {
            console.log('Processing Skyline API data');
            const contributionsByDate = new Map<string, number>();
            
            // Process skyline data structure
            Object.entries(data.contributions).forEach(([date, count]: [string, any]) => {
              contributionsByDate.set(date, typeof count === 'number' ? count : 0);
            });
            
            const allDays: ContributionDay[] = [];
            const today = new Date();
            const startOfYear = new Date(today.getFullYear(), 0, 1);
            
            for (let d = new Date(startOfYear); d <= today; d.setDate(d.getDate() + 1)) {
              const dateStr = d.toISOString().split('T')[0];
              const count = contributionsByDate.get(dateStr) || 0;
              allDays.push({
                date: dateStr,
                count,
                level: mapContributionLevel(count)
              });
            }
            
            const filteredData = allDays; // Show full year for both mobile and desktop
            
            if (filteredData.length > 0) {
              setContributionData(filteredData);
              console.log('✅ Successfully loaded GitHub data from Skyline API');
              return;
            }
          }
          
        } catch (apiError) {
          console.warn(`API ${apiUrl} failed:`, apiError);
          continue;
        }
      }
      
      // If all APIs fail
      throw new Error('All GitHub API sources failed');
      
    } catch (err) {
      console.warn('All GitHub APIs failed, using enhanced fallback data that matches your pattern:', err);
      setError('Showing estimated activity (API unavailable)');
      // Use enhanced fallback that closely matches your actual dense pattern
      setContributionData(generateDensePatternFallback());
    } finally {
      setLoading(false);
    }
  };

  const mapContributionLevel = (count: number): number => {
    // Updated mapping to better handle higher contribution counts
    if (count === 0) return 0;
    if (count >= 1 && count <= 2) return 1;
    if (count >= 3 && count <= 5) return 2;
    if (count >= 6 && count <= 10) return 3;
    return 4; // 11+ contributions
  };

  const getLastThreeMonths = (allDays: ContributionDay[]): ContributionDay[] => {
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    
    return allDays.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= threeMonthsAgo && dayDate <= today;
    });
  };

  const getCurrentYearData = (allDays: ContributionDay[]): ContributionDay[] => {
    const today = new Date();
    
    // Calculate the start date: Sunday of the week containing (today - 365 days)
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 365);
    
    // Find the Sunday of the week containing oneYearAgo
    const startDate = new Date(oneYearAgo);
    startDate.setDate(oneYearAgo.getDate() - oneYearAgo.getDay()); // Go back to Sunday
    
    return allDays.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= startDate && dayDate <= today;
    });
  };

  const generateDensePatternFallback = (): ContributionDay[] => {
    const data: ContributionDay[] = [];
    const today = new Date();
    
    // Calculate the start date: Sunday of the week containing (today - 365 days)
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 365);
    
    // Find the Sunday of the week containing oneYearAgo
    const startDate = new Date(oneYearAgo);
    startDate.setDate(oneYearAgo.getDate() - oneYearAgo.getDay()); // Go back to Sunday
    
    // Generate data from start date up to today
    for (let currentDate = new Date(startDate); currentDate <= today; currentDate.setDate(currentDate.getDate() + 1)) {
      const activity = generateDenseActivity(currentDate, startDate, today);
      data.push({
        date: currentDate.toISOString().split('T')[0],
        level: activity,
        count: activity * 3 // Higher counts for realistic numbers
      });
    }
    
    return data;
  };

  const generateDenseActivity = (date: Date, startDate: Date, endDate: Date): number => {
    if (date < startDate || date > endDate) return 0;
    
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    
    let activity = 0;
    
    // Very dense activity pattern to match your screenshot
    
    // April-May: Moderate activity (Level 1-3)
    if (month >= 3 && month <= 4) {
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Weekdays
        activity = 2 + (dayOfMonth % 2); // Level 2-3
      } else { // Weekends
        activity = 1 + (dayOfMonth % 2); // Level 1-2
      }
    }
    
    // June: Building up activity (Level 2-4)
    else if (month === 5) {
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        activity = 3 + (dayOfMonth % 2); // Level 3-4
      } else {
        activity = 1 + (dayOfMonth % 3); // Level 1-3
      }
    }
    
    // July-August: PEAK ACTIVITY (Level 3-4) - matches your dense screenshot
    else if (month >= 6 && month <= 7) {
      // This is the heavy period visible in your screenshot
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Weekdays
        activity = 4; // Maximum level almost every weekday
      } else { // Weekends
        activity = 2 + (dayOfMonth % 3); // Level 2-4 on weekends too
      }
      
      // Make it even denser - almost no empty days
      if (dayOfMonth % 7 !== 0) { // 6 out of 7 days have activity
        activity = Math.max(activity, 3);
      }
    }
    
    // September: Continuing strong activity
    else if (month === 8) {
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        activity = 3 + (dayOfMonth % 2); // Level 3-4
      } else {
        activity = 1 + (dayOfMonth % 3); // Level 1-3
      }
    }
    
    // Other months: Regular activity (Level 1-2)
    else {
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        activity = 1 + (dayOfMonth % 2); // Level 1-2
      } else {
        activity = dayOfMonth % 4 === 0 ? 1 : 0; // Occasional weekend work
      }
    }
    
    // Add some controlled randomness while keeping it dense
    const seed = (dayOfMonth + month * 31) % 6;
    if (seed === 0 && activity > 0) activity = Math.max(1, activity - 1); // Rarely reduce
    if (seed === 5) activity = Math.min(4, activity + 1); // Often increase
    
    return activity;
  };

  const generateDayActivity = (date: Date, startDate: Date, endDate: Date) => {
    // Only show activity within the valid range
    if (date < startDate || date > endDate) return 0;
    
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    
    let activity = 0;
    
    // More activity on weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      activity = 1 + (dayOfMonth % 3);
    }
    
    // Light weekend activity
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      activity = dayOfMonth % 4 === 0 ? 1 : 0;
    }
    
    // Project burst periods
    if (month === 2 || month === 5 || month === 8 || month === 11) {
      if (dayOfMonth >= 10 && dayOfMonth <= 20) {
        activity = Math.min(4, activity + 2);
      }
    }
    
    // Add some variation
    const seed = (dayOfMonth + month * 31) % 7;
    if (seed === 0) activity = Math.max(0, activity - 1);
    if (seed === 6) activity = Math.min(4, activity + 1);
    
    return activity;
  };

  const getContributionColor = (level: number) => {
    // GitHub's exact contribution colors
    switch (level) {
      case 0: return 'bg-gray-800'; // #161b22
      case 1: return 'bg-green-900'; // #0e4429
      case 2: return 'bg-green-700'; // #006d32
      case 3: return 'bg-green-500'; // #26a641
      case 4: return 'bg-green-400'; // #39d353
      default: return 'bg-gray-800';
    }
  };

  const totalContributions = contributionData.reduce((sum, day) => sum + day.count, 0);

  return (
    <section id="git-activity" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.4) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "30px 30px"],
          }}
          transition={{
            duration: 60, // Slowed down from 20 to 60 seconds
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Git Activity
            </motion.h2>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-green-400/30 transition-all duration-500 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%)',
                boxShadow: '0 0 40px rgba(34, 197, 94, 0.1)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border border-green-400/30"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiGithub className="text-green-400 text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      @G381N
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date().getFullYear()} Activity
                      {error && (
                        <span className="ml-2 text-yellow-400 text-xs">
                          • Estimated data
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg md:text-xl font-bold text-green-400">
                    {loading ? (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ...
                      </motion.div>
                    ) : (
                      totalContributions
                    )}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    contributions {error && '(estimated)'}
                  </div>
                </div>
              </div>

              {/* Contribution Calendar */}
              <div className="overflow-x-auto pb-4"> {/* Added pb-4 for scrollbar space */}
                <div className="min-w-[722px]"> {/* GitHub's exact width */}
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <motion.div
                        className="flex items-center gap-2 text-green-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm">
                          {error ? 'Loading fallback data...' : 'Fetching GitHub activity...'}
                        </span>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Month labels - positioned above the calendar */}
                      <div className="flex">
                        <div className="w-7"></div> {/* Space for day labels */}
                        <div className="flex-1 flex justify-between text-xs text-gray-400 px-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                            <span key={month}>{month}</span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Main calendar - horizontal layout */}
                      <div className="flex gap-3">
                        {/* Day labels */}
                        <div className="flex flex-col gap-[3px] pt-[15px]">
                          {['Mon', '', 'Wed', '', 'Fri', '', ''].map((day, index) => (
                            <div key={index} className="text-xs text-gray-400 h-[11px] flex items-center w-7">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        {/* Contribution grid - horizontal weeks */}
                        <div className="flex gap-[3px]">
                          {(() => {
                            // Calculate the number of weeks we need
                            const numberOfWeeks = Math.ceil(contributionData.length / 7);
                            
                            return Array.from({ length: numberOfWeeks }, (_, weekIndex) => (
                              <div key={weekIndex} className="flex flex-col gap-[3px]">
                                {Array.from({ length: 7 }, (_, dayIndex) => {
                                  const dataIndex = weekIndex * 7 + dayIndex;
                                  const day = contributionData[dataIndex];
                                  
                                  if (!day) return (
                                    <div 
                                      key={dayIndex} 
                                      className="w-[11px] h-[11px] rounded-[2px] bg-gray-800"
                                    />
                                  );
                                  
                                  return (
                                    <motion.div
                                      key={dataIndex}
                                      className={`w-[11px] h-[11px] rounded-[2px] ${getContributionColor(day.level)} cursor-pointer`}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ 
                                        delay: dataIndex * 0.001, 
                                        duration: 0.2,
                                        type: "spring",
                                        stiffness: 120 
                                      }}
                                      whileHover={{ 
                                        scale: 1.2,
                                        transition: { duration: 0.1 }
                                      }}
                                      title={`${day.count} contributions on ${day.date}`}
                                    />
                                  );
                                })}
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Legend - GitHub style */}
              {!loading && contributionData.length > 0 && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/30">
                  <div className="text-xs text-gray-400">
                    Learn how we count contributions
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400 mr-2">Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                      <motion.div
                        key={level}
                        className={`w-[11px] h-[11px] rounded-[2px] ${getContributionColor(level)}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.1 }}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">More</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
