// Portfolio update - 2024
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [phase, setPhase] = useState<'loading' | 'glitch' | 'complete'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation - faster
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase('glitch');
          return 100;
        }
        return prev + 4; // Increased from 2 to 4 for faster progress
      });
    }, 20); // Reduced from 30 to 20 for faster updates

    // Glitch phase timer - faster
    const glitchTimer = setTimeout(() => {
      setPhase('complete');
    }, 1000); // Reduced from 1800 to 1000

    // Complete timer - faster
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1400); // Reduced from 2200 to 1400

    return () => {
      clearInterval(progressInterval);
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const glitchVariants = {
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      y: [0, 1, -1, 2, -2, 0],
      transition: {
        duration: 0.1,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(180deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "20px 20px"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo/Name with Glitch Effect */}
          <motion.div
            className="relative mb-8"
            variants={phase === 'glitch' ? glitchVariants : {}}
            animate={phase === 'glitch' ? 'glitch' : 'normal'}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 relative">
              <span className="relative z-10">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Gebin
                </span>{" "}
                George
              </span>
              
              {/* Glitch overlay effects */}
              {phase === 'glitch' && (
                <>
                  <motion.span
                    className="absolute inset-0 text-red-500 opacity-70"
                    style={{ clipPath: 'inset(0 0 70% 0)' }}
                    animate={{
                      x: [-2, 2, -1, 1, 0],
                      clipPath: [
                        'inset(0 0 70% 0)',
                        'inset(20% 0 50% 0)',
                        'inset(40% 0 30% 0)',
                        'inset(60% 0 10% 0)',
                        'inset(0 0 70% 0)'
                      ]
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Gebin
                    </span>{" "}
                    George
                  </motion.span>
                  
                  <motion.span
                    className="absolute inset-0 text-cyan-400 opacity-70"
                    style={{ clipPath: 'inset(70% 0 0 0)' }}
                    animate={{
                      x: [2, -2, 1, -1, 0],
                      clipPath: [
                        'inset(70% 0 0 0)',
                        'inset(50% 0 20% 0)',
                        'inset(30% 0 40% 0)',
                        'inset(10% 0 60% 0)',
                        'inset(70% 0 0 0)'
                      ]
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.05
                    }}
                  >
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      Gebin
                    </span>{" "}
                    George
                  </motion.span>
                </>
              )}
            </h1>
            
            <motion.p
              className="text-gray-400 text-lg"
              animate={phase === 'glitch' ? {
                opacity: [1, 0.5, 1, 0.3, 1],
                x: [0, -1, 1, -1, 0]
              } : {}}
              transition={{
                duration: 0.15,
                repeat: phase === 'glitch' ? Infinity : 0,
                repeatType: "loop"
              }}
            >
              Tech Explorer & Cybersecurity Enthusiast
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Loading</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Status Text */}
          <motion.div
            className="text-blue-400 text-sm font-mono"
            animate={phase === 'glitch' ? {
              opacity: [1, 0, 1, 0.5, 1],
              scale: [1, 0.98, 1.02, 1]
            } : {}}
            transition={{
              duration: 0.2,
              repeat: phase === 'glitch' ? Infinity : 0,
              repeatType: "loop"
            }}
          >
            {phase === 'loading' && 'Initializing...'}
            {phase === 'glitch' && 'System Ready'}
            {phase === 'complete' && 'Welcome'}
          </motion.div>

          {/* Digital noise effect during glitch */}
          {phase === 'glitch' && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Scanlines effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.03) 2px,
              rgba(59, 130, 246, 0.03) 4px
            )`
          }}
          animate={{
            opacity: phase === 'glitch' ? [0.3, 0.7, 0.3] : 0.3
          }}
          transition={{
            duration: 0.1,
            repeat: phase === 'glitch' ? Infinity : 0,
            repeatType: "loop"
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
} 