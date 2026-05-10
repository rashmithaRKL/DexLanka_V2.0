
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  href?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description,
  delay = 0,
  href = '/services'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass p-8 rounded-2xl card-hover h-full"
    >
      <div className="flex flex-col h-full">
        <div className="text-dexRed mb-4 w-12 h-12 flex items-center justify-center bg-secondary rounded-lg">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        
        <p className="text-gray-300 mb-6 flex-grow">{description}</p>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-auto"
            >
              <Link to={href} className="group flex items-center text-dexRed">
                <span className="mr-2">Learn more</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
