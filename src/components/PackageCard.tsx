
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Sparkles } from 'lucide-react';
import { useUserAuth } from '@/context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { createPackageRequest } from '@/lib/api';

interface PackageCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  delay?: number;
  category?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  delay = 0,
  category = 'general'
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { isAuthenticated, user } = useUserAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetStarted = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please login to purchase a package or request a quote.",
        variant: "destructive",
      });
      navigate('/signin', { state: { from: '/packages', package: { title, price, category } } });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save package request to database
      await createPackageRequest({
        user_id: user.id,
        customer_name: user.full_name,
        customer_email: user.email,
        customer_phone: user.phone || null,
        package_title: title,
        package_price: price,
        package_category: category || 'general',
        package_description: description,
        status: 'new',
        priority: 'normal',
      });

      toast({
        title: "Package Request Submitted!",
        description: "We've received your request and will contact you shortly to discuss your project details.",
      });
    } catch (error) {
      console.error('Error submitting package request:', error);
      toast({
        title: "Request Failed",
        description: error instanceof Error ? error.message : "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      className={`w-full min-w-0 flex-shrink-0 relative glass rounded-2xl overflow-hidden transition-all duration-300 h-full hover:-translate-y-1 ${isPopular
          ? 'border-2 border-dexRed shadow-[0_0_40px_rgba(239,68,68,0.25)] hover:shadow-[0_0_50px_rgba(239,68,68,0.35)]'
          : 'border border-gray-800 hover:border-gray-700'
        }`}
    >
      {isPopular && (
        <div className="relative bg-gradient-to-r from-dexRed via-red-500 to-dexRed text-white py-4 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.15)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]"></div>
          <div className="relative flex items-center justify-center gap-2.5">
            <span className="text-xl">⭐</span>
            <span className="text-lg font-bold tracking-wide uppercase">Popular Choice</span>
            <span className="text-xl">⭐</span>
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex items-baseline mb-8 pb-6 border-b border-gray-800">
          <span className={`font-bold ${isPopular ? 'text-5xl text-dexRed' : 'text-4xl text-white'}`}>
            {price}
          </span>
          {price !== 'Custom' && <span className="text-gray-500 ml-2 text-sm">/project</span>}
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div className={`rounded-full p-1.5 mt-0.5 mr-3 flex-shrink-0 transition-all duration-300 ${isPopular ? 'bg-dexRed/20 group-hover:bg-dexRed/30' : 'bg-gray-800 group-hover:bg-gray-700'
                }`}>
                <Check size={14} className={`${isPopular ? 'text-dexRed' : 'text-gray-400'} group-hover:text-dexRed transition-colors`} />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleGetStarted}
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${isPopular
            ? 'bg-gradient-to-r from-dexRed to-red-600 text-white shadow-lg shadow-dexRed/50 hover:shadow-xl hover:shadow-dexRed/60 hover:translate-y-[-3px]'
            : 'bg-dexRed text-white hover:bg-red-600 hover:translate-y-[-2px]'
            } active:translate-y-[0px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
        >
          {isSubmitting ? 'Submitting...' : 'Get Started'}
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
