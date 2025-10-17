
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const countRef = useRef<number>(0);
  const startTime = useRef<number | null>(null);
  
  useEffect(() => {
    if (inView) {
      startTime.current = null;
      
      const animateCount = (timestamp: number) => {
        if (!startTime.current) startTime.current = timestamp;
        
        const progress = timestamp - startTime.current;
        const percentage = Math.min(progress / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4); // Easing function
        
        const nextCount = easeOutQuart * end;
        countRef.current = nextCount;
        setCount(nextCount);
        
        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [inView, end, duration]);
  
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div ref={ref} className={className}>
      <span>{prefix}</span>
      <span>{formatNumber(count)}</span>
      <span>{suffix}</span>
    </div>
  );
};

export default CounterAnimation;
