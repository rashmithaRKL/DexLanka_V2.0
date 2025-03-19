
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

interface PackageCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  delay?: number;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  delay = 0
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.1
      }}
      className={`glass rounded-2xl overflow-hidden ${
        isPopular ? 'border-dexRed ring-1 ring-dexRed' : 'border-gray-800'
      } h-full`}
    >
      {isPopular && (
        <div className="bg-dexRed text-white text-sm font-medium py-1 px-4 text-center">
          Popular Choice
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-gray-400 ml-1">/project</span>}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-dexRed mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className="w-full py-3 px-4 bg-dexRed text-white rounded-lg font-medium transition-transform hover:translate-y-[-2px] active:translate-y-[0px]">
          Get Started
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
