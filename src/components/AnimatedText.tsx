
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up';
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  once = true,
  animation = 'slide-up',
  delay = 0,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });
  
  const animatedRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inView && animatedRef.current) {
      animatedRef.current.style.opacity = '1';
      animatedRef.current.style.transform = 'translate(0, 0)';
    }
  }, [inView]);
  
  const getInitialStyle = () => {
    switch (animation) {
      case 'slide-up':
        return { opacity: 0, transform: 'translateY(20px)' };
      case 'slide-down':
        return { opacity: 0, transform: 'translateY(-20px)' };
      case 'slide-left':
        return { opacity: 0, transform: 'translateX(20px)' };
      case 'slide-right':
        return { opacity: 0, transform: 'translateX(-20px)' };
      case 'scale-up':
        return { opacity: 0, transform: 'scale(0.95)' };
      default:
        return { opacity: 0, transform: 'translateY(20px)' };
    }
  };

  return (
    <div
      ref={ref}
      className={className}
    >
      <div
        ref={animatedRef}
        style={{
          ...getInitialStyle(),
          transitionProperty: 'opacity, transform',
          transitionDuration: '0.6s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default AnimatedText;
