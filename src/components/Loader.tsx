import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const Loader: React.FC = () => {
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  );

  const [loadingText, setLoadingText] = useState(0);
  const loadingMessages = [
    'Crafting digital excellence...',
    'Designing your experience...',
    'Loading innovation...',
    'Almost there...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <motion.div
      className="app-loader-creative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Gradient Background */}
      <div className="loader-gradient-bg" />
      
      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="loader-content">
        {/* Central Orb with Morphing Effect */}
        <motion.div
          className="morphing-orb-container"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Outer Glow Rings */}
          <motion.div
            className="glow-ring ring-outer-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="glow-ring ring-outer-2"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Multi-Layer Spinner System */}
          <div className="spinner-system">
            {/* Outer Rotating Hexagon */}
            <motion.div
              className="spinner-hexagon outer-hex"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="hex-side" />
              <div className="hex-side" />
              <div className="hex-side" />
              <div className="hex-side" />
              <div className="hex-side" />
              <div className="hex-side" />
            </motion.div>

            {/* Middle Rotating Triangle */}
            <motion.div
              className="spinner-triangle"
              animate={{ rotate: -360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="triangle-corner" />
              <div className="triangle-corner" />
              <div className="triangle-corner" />
            </motion.div>

            {/* Inner Pulsing Circle */}
            <motion.div
              className="spinner-core"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="core-inner"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="core-dot" />
                <div className="core-dot" />
                <div className="core-dot" />
                <div className="core-dot" />
              </motion.div>
            </motion.div>

            {/* Orbiting Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="orbiting-particle"
                style={{
                  '--index': i,
                } as React.CSSProperties}
                initial={{
                  rotate: i * 45, // Start at different angles (45deg apart)
                }}
                animate={{
                  rotate: 360 + i * 45,
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="particle-dot" />
              </motion.div>
            ))}
          </div>

          {/* Rotating Rings */}
          <motion.div
            className="rotating-ring ring-1"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="rotating-ring ring-2"
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="rotating-ring ring-3"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Brand Name with Stagger Animation */}
        <motion.div
          className="brand-name-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="brand-dex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Dex
          </motion.span>
          <motion.span
            className="brand-lanka"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Lanka
          </motion.span>
        </motion.div>

        {/* Loading Text with Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingText}
            className="loading-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[loadingText]}
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          className="progress-bar-container"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="progress-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Floating Geometric Shapes */}
        <div className="geometric-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`geometric-shape shape-${i + 1}`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Wave Animation at Bottom */}
      <div className="wave-container">
        <motion.svg
          className="wave"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                "M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z",
                "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(229, 72, 92, 0.1)" />
              <stop offset="50%" stopColor="rgba(229, 72, 92, 0.3)" />
              <stop offset="100%" stopColor="rgba(229, 72, 92, 0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default Loader;

