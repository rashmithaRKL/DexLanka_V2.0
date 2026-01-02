import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import AnimatedText from '@/components/AnimatedText';
import CustomQuoteModal from '@/components/CustomQuoteModal';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, XCircle } from 'lucide-react';
import { useUserAuth } from '@/context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Packages = () => {
  const [comparisonRef, comparisonInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentTab, setCurrentTab] = useState('websites');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to request a custom quote.",
        variant: "destructive",
      });
      navigate('/signin', { state: { from: '/packages' } });
      return;
    }
    setIsQuoteModalOpen(true);
  };

  const packages = {
    websites: [
      {
        title: 'One-Page Website',
        price: '$25',
        description: 'Perfect for landing pages or simple business sites',
        features: [
          'One-page responsive design',
          'Contact form integration',
          'Basic SEO setup',
          'Social media links',
          '1 revision included'
        ],
        isPopular: false,
        category: 'website',
      },
      {
        title: '5-Page Website',
        price: '$60',
        description: 'Ideal for small businesses and personal brands',
        features: [
          '5 custom designed pages',
          'Responsive design for all devices',
          'Contact form & Google Maps',
          'Basic SEO optimization',
          'CMS integration',
          '2 revisions included'
        ],
        isPopular: true,
        category: 'website',
      },
      {
        title: '10+ Page Website',
        price: '$100',
        description: 'Comprehensive solution for established businesses',
        features: [
          '10 or more custom pages',
          'Advanced responsive design',
          'Blog/news section setup',
          'Enhanced SEO package',
          'Social media integration',
          'CMS with training',
          '3 revisions included'
        ],
        isPopular: false,
        category: 'website',
      },
    ],
    applications: [
      {
        title: 'Web Application',
        price: '$65',
        description: 'Custom web application with advanced functionality',
        features: [
          'Custom user accounts',
          'Database integration',
          'Admin dashboard',
          'API development',
          'Payment gateway integration',
          'Cloud deployment',
          '3 months support'
        ],
        isPopular: false,
        category: 'web_application',
      },
      {
        title: 'E-Commerce Website',
        price: '$100',
        description: 'Complete online store with all necessary features',
        features: [
          'Product catalog with categories',
          'Shopping cart and checkout',
          'Payment gateway integration',
          'Inventory management',
          'Customer accounts & order history',
          'SEO optimization',
          'Analytics dashboard',
          '6 months support'
        ],
        isPopular: true,
        category: 'web_application',
      },
      {
        title: 'Desktop Application',
        price: '$200',
        description: 'Native desktop application for Windows/Mac/Linux',
        features: [
          'Cross-platform compatibility',
          'Custom user interface',
          'Offline functionality',
          'Data synchronization',
          'Automated updates',
          'Advanced security features',
          '12 months support'
        ],
        isPopular: false,
        category: 'desktop_system',
      },
    ],
    mobile: [
      {
        title: 'Simple Mobile App',
        price: '$30',
        description: 'Basic mobile application for iOS or Android',
        features: [
          'Up to 5 screens/features',
          'User authentication',
          'Basic API integration',
          'Push notifications',
          'App store submission',
          '3 months support'
        ],
        isPopular: false,
        category: 'mobile_app',
      },
      {
        title: 'Advanced Mobile App',
        price: '$80',
        description: 'Feature-rich application for iOS and Android',
        features: [
          'Cross-platform (iOS & Android)',
          'Complex functionality',
          'User profiles & social features',
          'API integration',
          'Offline mode',
          'In-app purchases',
          'Analytics integration',
          '6 months support'
        ],
        isPopular: true,
        category: 'mobile_app',
      },
      {
        title: 'E-Commerce Mobile App',
        price: '$150',
        description: 'Complete shopping experience for mobile users',
        features: [
          'Product catalog and search',
          'Shopping cart & checkout',
          'Payment gateway integration',
          'User accounts & wishlist',
          'Order tracking',
          'Push notifications',
          'Admin dashboard',
          '12 months support'
        ],
        isPopular: false,
        category: 'mobile_app',
      },
    ],
    enterprise: [
      {
        title: 'Enterprise Solution',
        price: 'Custom',
        description: 'Tailored software solutions for enterprise needs',
        features: [
          'Custom software architecture',
          'System integration services',
          'Enterprise-grade security',
          'Scalable infrastructure',
          'User training & documentation',
          'SLA with dedicated support',
          'Ongoing maintenance & updates'
        ],
        isPopular: false,
        category: 'enterprise_application',
      },
    ],
  };

  const comparisonData = {
    headers: ['Features', 'One-Page', '5-Page', '10+ Pages', 'Web App', 'E-Commerce'],
    rows: [
      {
        feature: 'Responsive Design',
        onePage: true,
        fivePage: true,
        tenPage: true,
        webApp: true,
        eCommerce: true,
      },
      {
        feature: 'CMS Integration',
        onePage: false,
        fivePage: true,
        tenPage: true,
        webApp: true,
        eCommerce: true,
      },
      {
        feature: 'SEO Optimization',
        onePage: 'Basic',
        fivePage: 'Standard',
        tenPage: 'Advanced',
        webApp: 'Advanced',
        eCommerce: 'Premium',
      },
      {
        feature: 'User Accounts',
        onePage: false,
        fivePage: 'Optional',
        tenPage: 'Optional',
        webApp: true,
        eCommerce: true,
      },
      {
        feature: 'Payment Processing',
        onePage: false,
        fivePage: false,
        tenPage: 'Optional',
        webApp: 'Optional',
        eCommerce: true,
      },
      {
        feature: 'Custom Functionality',
        onePage: 'Minimal',
        fivePage: 'Basic',
        tenPage: 'Standard',
        webApp: 'Advanced',
        eCommerce: 'Advanced',
      },
      {
        feature: 'Revisions Included',
        onePage: 'Unlimited',
        fivePage: 'Unlimited',
        tenPage: 'Unlimited',
        webApp: 'Unlimited',
        eCommerce: 'Unlimited',
      },
      {
        feature: 'Support Period',
        onePage: '2 days',
        fivePage: '4 days',
        tenPage: '1 week',
        webApp: '1 month',
        eCommerce: '1-2 months',
      },
    ],
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText text="Our Packages" animation="slide-up" className="inline-block text-xl text-dexRed font-medium mb-4" />
            <AnimatedText text="Choose the Perfect Package" animation="slide-up" delay={100} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" />
            <AnimatedText text="We offer a range of packages to suit different business needs and budgets..." animation="slide-up" delay={200} className="text-gray-300 text-base sm:text-lg" />
          </div>
        </div>
      </section>

      {/* Packages Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex glass rounded-lg p-1 flex-wrap gap-2 justify-center">
              {[{ id: 'websites', label: 'Websites' }, { id: 'applications', label: 'Applications' }, { id: 'mobile', label: 'Mobile Apps' }, { id: 'enterprise', label: 'Enterprise' }].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${currentTab === tab.id ? 'bg-dexRed text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages[currentTab].map((pkg, index) => (
              <PackageCard key={index} {...pkg} delay={index} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">Don't see a package that fits your needs? We offer custom solutions.</p>
            <button 
              onClick={handleRequestQuote}
              className="inline-block px-6 py-3 border border-dexRed text-dexRed rounded-lg text-sm sm:text-base hover:bg-dexRed/10 transition-colors"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={comparisonRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-darkBlue">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Package Comparison</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Compare Our Website Packages</h2>
            <p className="text-gray-300 text-sm sm:text-base">See which package is right for your business...</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="overflow-x-auto glass rounded-2xl"
          >
            <table className="min-w-full text-sm sm:text-base">
              <thead>
                <tr>
                  {comparisonData.headers.map((header, i) => (
                    <th key={i} className={`px-4 py-3 text-left font-semibold ${i === 0 ? 'text-white' : 'text-dexRed'} border-b border-gray-800 whitespace-nowrap`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-dark-800/30' : ''}>
                    {['feature', 'onePage', 'fivePage', 'tenPage', 'webApp', 'eCommerce'].map((key, j) => (
                      <td key={j} className="px-4 py-3 border-b border-gray-800">
                        {typeof row[key] === 'boolean' ? (
                          row[key] ? <CheckCircle size={18} className="text-dexRed" /> : <XCircle size={18} className="text-gray-600" />
                        ) : (
                          <span className="text-gray-300">{row[key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Custom Quote Modal */}
      <CustomQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCategory={
          currentTab === 'websites' ? 'website' :
          currentTab === 'applications' ? 'web_application' :
          currentTab === 'mobile' ? 'mobile_app' :
          currentTab === 'enterprise' ? 'enterprise_application' : 'website'
        }
      />
    </div>
  );
};

export default Packages;
