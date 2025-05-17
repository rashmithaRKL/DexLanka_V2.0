
import { useState, useEffect, useRef } from 'react';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
}

const Stat = ({ value, label, suffix = "" }: StatProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const countedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !countedRef.current) {
        countedRef.current = true;
        const start = 0;
        const duration = 2000;
        const startTimestamp = performance.now();

        const step = (timestamp: number) => {
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentCount = Math.floor(progress * value);
          setCount(currentCount);

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(value);
          }
        };

        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [value]);

  return (
    <div className="text-center" ref={countRef}>
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <p className="text-foreground/70">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 px-6 bg-card/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          <Stat value={3} label="Years Experience" suffix="+" />
          <Stat value={12} label="Projects Completed" suffix="+" />
          <Stat value={10} label="Happy Clients" suffix="+" />
          <Stat value={2} label="Team Experts" suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
