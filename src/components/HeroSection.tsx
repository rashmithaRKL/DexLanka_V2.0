import React, { useState } from 'react';
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
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Spline Animation - Full Screen for cursor tracking - Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 z-0 overflow-hidden hidden md:block"
      >
        <iframe 
          src='https://my.spline.design/nexbotrobotcharacterconcept-NRt1IYGKK0gQ1dLMgARuoZxA/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline Animation Desktop"
          className="touch-none"
          style={{ 
            border: 'none',
            transform: 'translateX(25%) scale(1.2)',
            transformOrigin: 'center center',
            touchAction: 'none'
          }}
        />
      </motion.div>

      {/* Spline Animation - Mobile/Tablet - Centered */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 z-0 overflow-hidden md:hidden"
      >
        <iframe 
          src='https://my.spline.design/nexbotrobotcharacterconcept-NRt1IYGKK0gQ1dLMgARuoZxA/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="Spline Animation Mobile"
          className="touch-none"
          style={{ 
            border: 'none',
            // Zoom and shift up slightly on mobile to match the desktop framing (hide legs/Built with Spline)
            transform: 'translateY(-8%) scale(1.4)',
            transformOrigin: 'center center',
            touchAction: 'none'
          }}
        />
      </motion.div>

      {/* Overlay - for better text readability - Desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-darkBg/90 via-darkBg/40 to-transparent pointer-events-none z-[1] hidden md:block"></div>
      
      {/* Overlay - for better text readability - Mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg/85 via-darkBg/70 to-darkBg/85 pointer-events-none z-[1] md:hidden"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-full sm:max-w-3xl lg:max-w-2xl pointer-events-none text-center md:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 pointer-events-none leading-tight"
          >
            Elevate Your Digital Presence With{' '}
            <span className="dex-span">Dex</span>
            <span className="lanka-span">Lanka</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 pointer-events-none"
          >
            We build premium, innovative software solutions that transform businesses and deliver exceptional user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pointer-events-none justify-center md:justify-start"
          >
            <a
              href="/packages"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px] flex items-center justify-center pointer-events-auto touch-manipulation"
            >
              View Packages
              <ArrowRight size={16} className="ml-2" />
            </a>

            <a
              href="/contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all pointer-events-auto touch-manipulation justify-center flex items-center"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce z-10"
      >
        <a href="#services" className="text-white/70 flex flex-col items-center pointer-events-auto touch-manipulation">
          <span className="text-xs sm:text-sm mb-2">Scroll Down</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-6 sm:h-6"
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
