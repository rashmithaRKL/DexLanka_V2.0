import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Import a placeholder video - you'll need to replace this with your actual video file
const videoSource = "https://dl.dropboxusercontent.com/scl/fi/a1x7q1s5g0g3h6odynpkl/tech-background.mp4?rlkey=i2ui0xw6y8lbll3cpkl9mde15";

const generateBubbles = () => {
  return Array.from({ length: 60 }).map((_, index) => ({
    id: index,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 8 + 2,
  }));
};
const HeroSection: React.FC = () => {
  const [bubbles, setBubbles] = useState(generateBubbles);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg/80 to-darkBg/95"></div>

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 0.5, y: -300 }}
          transition={{ duration: bubble.duration, delay: bubble.delay, repeat: Infinity, repeatType: "loop" }}
          className="absolute bg-white/20 rounded-full backdrop-blur-sm"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "1px",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Elevate Your Digital Presence With{' '}
            <span className="dex-span">Dex</span>
            <span className="lanka-span">Lanka</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl"
          >
            We build premium, innovative software solutions that transform businesses and deliver exceptional user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/packages"
              className="px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px] flex items-center"
            >
              View Packages
              <ArrowRight size={16} className="ml-2" />
            </a>

            <a
              href="/contact"
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side Floating Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative hidden md:block"
      >
        <div className="relative w-[300px] h-[200px] bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <div className="h-3 w-16 bg-blue-500 rounded-full mb-2"></div>
          <div className="h-3 w-20 bg-purple-500 rounded-full mb-4"></div>
          <div className="flex gap-4">
            <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
        <div className="absolute top-3 left-3 w-[300px] h-[200px] bg-blue-500 rounded-2xl blur-lg opacity-50"></div>
        <div className="absolute top-6 left-6 w-[300px] h-[200px] bg-purple-500 rounded-2xl blur-lg opacity-30"></div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
      >
        <a href="#services" className="text-white/70 flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default HeroSection;
