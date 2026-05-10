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
import { useSEO } from '@/hooks/useSEO';

const Packages = () => {
  const [comparisonRef, comparisonInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentTab, setCurrentTab] = useState('websites');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  useSEO({
    title: 'Website, E-commerce, POS & Maintenance Packages | DexLanka',
    description:
      'View DexLanka package guidance for starter websites, business websites, e-commerce stores, POS and inventory systems, custom software, and maintenance support in Sri Lanka.',
    keywords: 'website packages Sri Lanka, DexLanka pricing, e-commerce website price Sri Lanka, POS system price Sri Lanka, maintenance package Sri Lanka',
    image: '/og-image.png',
    url: '/packages',
    canonical: '/packages',
    type: 'website',
  });

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      toast({
        title: "Use the quote form",
        description: "Send your project details through the contact form and DexLanka will reply within 24 hours.",
      });
      navigate('/contact');
      return;
    }
    setIsQuoteModalOpen(true);
  };

  const packages = {
    websites: [
      {
        title: 'Starter Website',
        price: 'LKR 45,000-85,000',
        description: 'Ideal for a clean local business website with the essentials',
        features: [
          '5 pages',
          'Mobile responsive design',
          'WhatsApp button',
          'Contact form',
          'Google Map',
          'Basic SEO'
        ],
        isPopular: false,
        category: 'website',
      },
      {
        title: 'Business Website',
        price: 'LKR 120,000-250,000',
        description: 'For SMEs that need more pages, content control, and lead generation',
        features: [
          '10 pages',
          'CMS/admin panel',
          'Blog',
          'SEO setup',
          'Analytics',
          'Social integration'
        ],
        isPopular: true,
        category: 'website',
      },
      {
        title: 'Maintenance',
        price: 'LKR 10,000-50,000/month',
        description: 'Ongoing support after launch for website and system improvements',
        features: [
          'Updates',
          'Backups',
          'Content changes',
          'Support',
          'Hosting monitoring',
          'Bug fixes'
        ],
        isPopular: false,
        category: 'website',
      },
    ],
    applications: [
      {
        title: 'Custom Software',
        price: 'Scoped Quote',
        description: 'Dashboards, portals, booking systems, and workflow software',
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
        title: 'E-commerce Website',
        price: 'LKR 250,000-600,000+',
        description: 'Online store with product, order, checkout, and admin features',
        features: [
          'Products',
          'Cart',
          'Checkout',
          'Payment/COD',
          'Order dashboard',
          'Invoice',
          'WhatsApp order alerts'
        ],
        isPopular: true,
        category: 'web_application',
      },
      {
        title: 'POS / Inventory System',
        price: 'LKR 300,000-1,200,000+',
        description: 'Business system for sales, stock, reports, staff, and suppliers',
        features: [
          'Products',
          'Stock',
          'Invoices',
          'Staff login',
          'Reports',
          'Suppliers',
          'Customers'
        ],
        isPopular: false,
        category: 'desktop_system',
      },
    ],
    mobile: [
      {
        title: 'Simple Mobile App',
        price: 'Scoped Quote',
        description: 'Focused mobile app for core customer or staff workflows',
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
        title: 'SaaS MVP',
        price: 'Scoped Quote',
        description: 'First version of a SaaS, marketplace, or dashboard product',
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
        title: 'Admin Dashboard',
        price: 'Scoped Quote',
        description: 'Internal tools, analytics panels, CRUD screens, and reporting',
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
    headers: ['Features', 'Starter', 'Business', 'E-commerce', 'POS/Inventory', 'Maintenance'],
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
        eCommerce: false,
      },
      {
        feature: 'SEO Optimization',
        onePage: 'Basic',
        fivePage: 'Standard',
        tenPage: 'Product SEO',
        webApp: 'Optional',
        eCommerce: 'Ongoing',
      },
      {
        feature: 'Admin / Staff Login',
        onePage: false,
        fivePage: 'Optional',
        tenPage: true,
        webApp: true,
        eCommerce: false,
      },
      {
        feature: 'Payments / COD',
        onePage: false,
        fivePage: false,
        tenPage: true,
        webApp: 'Optional',
        eCommerce: false,
      },
      {
        feature: 'Reports',
        onePage: 'Minimal',
        fivePage: 'Basic',
        tenPage: 'Order reports',
        webApp: 'Advanced',
        eCommerce: 'Monthly',
      },
      {
        feature: 'WhatsApp CTA',
        onePage: true,
        fivePage: true,
        tenPage: true,
        webApp: 'Optional',
        eCommerce: true,
      },
      {
        feature: 'Support Period',
        onePage: 'Launch support',
        fivePage: 'Launch support',
        tenPage: 'Launch support',
        webApp: 'Launch support',
        eCommerce: 'Monthly',
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
            <AnimatedText text="Website, Software, and Support Pricing Guidance" animation="slide-up" delay={100} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" />
            <AnimatedText text="Use these ranges to plan your project budget. Final pricing depends on features, design complexity, integrations, timeline, and support requirements." animation="slide-up" delay={200} className="text-gray-300 text-base sm:text-lg" />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Compare Common Project Packages</h2>
            <p className="text-gray-300 text-sm sm:text-base">Use this as a planning guide before the final scope is confirmed.</p>
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
