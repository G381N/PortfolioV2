// Portfolio update - 2024
"use client";

import { useState } from "react";
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import GitActivity from '../components/GitActivity';
import SaveContactButton from '../components/SaveContactButton';
import AnimatedBackground from '../components/AnimatedBackground';
import LoadingAnimation from '../components/LoadingAnimation';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      {!showLoading && (
        <>
          <AnimatedBackground />
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <GitActivity />
          <SaveContactButton />
        </>
      )}
    </>
  );
} 