"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiYoutube, FiPlay, FiEye, FiClock, FiGithub, FiLinkedin, FiInstagram, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

// YouTube API Configuration
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCJWCQkIes8obeWnSYMJWoJg';

if (!API_KEY) {
  console.error('YouTube API key not found. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in your environment variables.');
}

const VIDEO_COUNT = 6;

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: Date;
  viewCount: number;
  duration: string;
}

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
  type: 'ember' | 'spark';
}

// Simplified particle system
const useParticleSystem = (count: number) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();

  const createParticle = useCallback((index: number): Particle => {
    const types: Particle['type'][] = ['ember', 'spark'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: index,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 50,
      vx: (Math.random() - 0.5) * 1,
      vy: -Math.random() * 2 - 0.5,
      size: Math.random() * (type === 'spark' ? 2 : 4) + 1,
      life: 1,
      maxLife: Math.random() * 150 + 80,
      color: type === 'ember' ? `hsl(${Math.random() * 40 + 10}, 90%, ${Math.random() * 20 + 50}%)` 
             : `hsl(${Math.random() * 20 + 50}, 90%, 70%)`,
      type
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
          life: particle.life - 1,
          vy: particle.vy - 0.01
        };

        if (newParticle.life <= 0 || newParticle.y < -50) {
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

export default function HitPixelsPage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const particles = useParticleSystem(20); // Reduced from 40
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']); // Reduced from 50%
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']); // Reduced from 200%

  useEffect(() => {
    loadYouTubeVideos();
  }, []);

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
      href: "https://www.gebin.net/bikeswithgebin.html",
      label: "Instagram",
      color: "from-pink-400 to-purple-600"
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

  const loadYouTubeVideos = async () => {
    // Check if API key is available
    if (!API_KEY) {
      console.error('YouTube API key not configured. Please set NEXT_PUBLIC_YOUTUBE_API_KEY environment variable.');
      setVideos([]);
      setLoading(false);
      return;
    }

    try {
      const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`);
      
      if (!channelResponse.ok) {
        throw new Error(`API request failed: ${channelResponse.status} ${channelResponse.statusText}`);
      }
      
      const channelData = await channelResponse.json();
      
      if (channelData.error) {
        throw new Error(`YouTube API Error: ${channelData.error.message}`);
      }
      
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      
      const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=${uploadsPlaylistId}&key=${API_KEY}`);
      
      if (!videosResponse.ok) {
        throw new Error(`Videos API request failed: ${videosResponse.status} ${videosResponse.statusText}`);
      }
      
      const videosData = await videosResponse.json();
      
      if (videosData.error) {
        throw new Error(`YouTube API Error: ${videosData.error.message}`);
      }
      
      if (!videosData.items || videosData.items.length === 0) {
        throw new Error('No videos found');
      }
      
      const videoIds = videosData.items.map((item: any) => item.contentDetails.videoId).join(',');
      const statsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`);
      
      if (!statsResponse.ok) {
        throw new Error(`Stats API request failed: ${statsResponse.status} ${statsResponse.statusText}`);
      }
      
      const statsData = await statsResponse.json();
      
      if (statsData.error) {
        throw new Error(`YouTube API Error: ${statsData.error.message}`);
      }
      
      const statsMap: any = {};
      if (statsData.items) {
        statsData.items.forEach((item: any) => {
          statsMap[item.id] = {
            viewCount: parseInt(item.statistics.viewCount || 0),
            duration: item.contentDetails.duration
          };
        });
      }
      
      const videosWithStats = videosData.items.map((item: any) => {
        const videoId = item.contentDetails.videoId;
        const stats = statsMap[videoId] || { viewCount: 0, duration: 'PT0M0S' };
        
        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          publishedAt: new Date(item.snippet.publishedAt),
          viewCount: stats.viewCount,
          duration: formatDuration(stats.duration)
        };
      });
      
      setVideos(videosWithStats.sort((a: VideoData, b: VideoData) => b.viewCount - a.viewCount).slice(0, VIDEO_COUNT));
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '') || '0';
    const seconds = (match[3] || '').replace('S', '') || '00';
    
    let result = '';
    if (hours) result += `${hours}:`;
    result += `${minutes}:${seconds.padStart(2, '0')}`;
    
    return result;
  };

  const formatViewCount = (count: number) => {
    if (!count) return '0';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
    >
      {/* Simplified Particle System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {particles.map(particle => (
            <circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={particle.color}
              opacity={particle.life / particle.maxLife * 0.6}
              filter="url(#glow)"
            />
          ))}
        </svg>

        {/* Subtle Background Layers */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 30% 70%, rgba(220, 38, 38, 0.2) 0%, rgba(239, 68, 68, 0.1) 30%, transparent 60%)",
                "radial-gradient(circle at 70% 30%, rgba(185, 28, 28, 0.2) 0%, rgba(220, 38, 38, 0.1) 30%, transparent 60%)",
                "radial-gradient(circle at 30% 70%, rgba(220, 38, 38, 0.2) 0%, rgba(239, 68, 68, 0.1) 30%, transparent 60%)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
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
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(220, 38, 38, 0.3)",
                      "0 0 25px rgba(220, 38, 38, 0.5)",
                      "0 0 15px rgba(220, 38, 38, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Image
                    src="/ytllgog.png"
                    alt="HitPixels"
                    width={24}
                    height={24}
                    className="relative z-10 rounded"
                  />
                </motion.div>
              </div>
              
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  <span className="text-red-400">HIT</span>
                  <span className="text-white">Pixels</span>
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Videos", href: "#videos" },
              { label: "About", href: "#about" },
              { label: "Instagram", href: "/bikeswithgebin", external: false }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {item.external === false ? (
                  <Link 
                    href={item.href}
                    className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                  >
                    {item.label}
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"
                    />
                  </Link>
                ) : (
                  <a 
                    href={item.href}
                    className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                  >
                    {item.label}
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"
                    />
                  </a>
                )}
              </motion.div>
            ))}
            
            <motion.a
              href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
              className="relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiYoutube size={18} />
              <span>Subscribe</span>
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
              className="md:hidden backdrop-blur-xl bg-black/80 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                {[
                  { label: "Videos", href: "#videos" },
                  { label: "About", href: "#about" },
                  { label: "Instagram", href: "/bikeswithgebin" }
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
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <FiYoutube size={20} />
                  Subscribe
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section - Simplified */}
      <section className="relative z-10 pt-28 pb-16 px-6 min-h-screen flex items-center justify-center">
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-6"
            >
              <p className="text-lg md:text-xl font-light text-gray-400 mb-4">
                Welcome to the Future of Content
              </p>
            </motion.div>

            <div className="relative mb-10">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <motion.span 
                  className="inline-block relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-red-500 font-black">HIT</span>
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-white font-black">Pixels</span>
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
                Dive into a world of wonder! From{" "}
                <span className="text-red-400 font-medium">fascinating places</span>{" "}
                across the globe to{" "}
                <span className="text-red-400 font-medium">mind-blowing fun facts</span>
                , plus thrilling{" "}
                <span className="text-red-400 font-medium">motovlogging adventures</span>{" "}
                coming soon.
              </p>
              
              <p className="text-md text-gray-400">
                Join the journey of discovery! 🔥
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiYoutube size={24} />
                <span>Subscribe Now</span>
              </motion.a>

              <motion.a
                href="#videos"
                className="group relative overflow-hidden backdrop-blur-xl bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 border border-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Videos</span>
                <FiPlay size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-red-400 font-semibold text-md mb-4 tracking-wide uppercase">
              Featured Content
            </p>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-red-400">Epic</span>{" "}
              <span className="text-white">Videos</span>
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover breathtaking destinations, mind-blowing facts, and adventure like never before
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <motion.div
                className="relative w-20 h-20 mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 border-4 border-red-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full" />
              </motion.div>
              <p className="text-lg text-gray-400">Loading content...</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <motion.div 
                    className="relative bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-500/50"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <motion.a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                          <FiPlay size={24} className="ml-1" />
                        </div>
                      </motion.a>
                      
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                        <div className="flex items-center gap-1">
                          <FiClock size={12} />
                          {video.duration}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                        {video.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {video.description.substring(0, 100)}
                        {video.description.length > 100 ? '...' : ''}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FiEye size={14} />
                          <span>{formatViewCount(video.viewCount)} views</span>
                        </div>
                        
                        <div className="text-xs">
                          {video.publishedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="relative bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-lg mx-auto"
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiYoutube className="text-white text-4xl" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Visit My YouTube Channel</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Experience amazing content about fascinating places, incredible fun facts, and thrilling motovlogging adventures.
                </p>
                
                <motion.a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiExternalLink size={20} />
                  <span>Visit Channel</span>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
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
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(185, 28, 28, 0.1))",
                    boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)"
                  }}
                >
                  <Image
                    src="/ytllgog.png"
                    alt="HitPixels Creator"
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
                <p className="text-red-400 font-semibold text-md mb-4 tracking-wide uppercase">
                  About the Creator
                </p>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  <span className="text-red-400">Meet</span>{" "}
                  <span className="text-white">HitPixels</span>
                </h2>
              </motion.div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {[
                  "Welcome to my world of endless discovery! 🌟 I create content about the most fascinating places on Earth and mind-blowing fun facts that'll make you the smartest person in the room.",
                  "From hidden gems in remote corners of the world to incredible facts about science, history, and nature - there's always something amazing to explore! 🌍✨",
                  "And here's where it gets exciting - motovlogging adventures are coming soon! Get ready for adrenaline-pumping rides through scenic routes, bike tips, and epic road trip stories! 🏍️💨",
                  "Buckle up for a wild ride of learning, adventure, and pure excitement! 🔥"
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    className={`text-md leading-relaxed ${index === 3 ? 'text-red-400 font-semibold' : ''}`}
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