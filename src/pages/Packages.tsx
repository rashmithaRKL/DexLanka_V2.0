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
import { CurrencySwitcher, FinalCTA, MaintenancePlansSection } from '@/components/MarketingSections';
import { getCurrencyPrice, useCurrency } from '@/hooks/useCurrency';

const Packages = () => {
  const [comparisonRef, comparisonInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentTab, setCurrentTab] = useState('websites');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { isAuthenticated } = useUserAuth();
  const navigate = useNavigate();
  const { currency, setCurrency, countryCode, isDetected } = useCurrency();

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
        price: 'From Rs 25,000',
        priceLkr: 'From Rs 25,000',
        priceUsd: 'From $85',
        description: 'Best for personal brands, small shops, restaurants, cafes, and basic service businesses',
        features: [
          '1-3 pages',
          'Mobile responsive design',
          'Contact section',
          'WhatsApp button',
          'Basic SEO setup',
          'Social media links',
          'Free domain for 1 year if included in offer',
          'Excludes e-commerce, payment gateways, custom dashboards, advanced SEO, booking systems, and complex integrations'
        ],
        isPopular: false,
        category: 'website',
      },
      {
        title: 'Business Website',
        price: 'From Rs 45,000 / Rs 120,000',
        priceLkr: 'From Rs 45,000 / Rs 120,000',
        priceUsd: 'From $150 / $400',
        description: 'For growing businesses that need stronger service pages, galleries, forms, maps, and SEO setup',
        features: [
          'Multiple business pages',
          'Service sections',
          'Gallery/portfolio',
          'Contact forms',
          'Google Maps',
          'SEO setup',
          'WhatsApp integration',
          'Mobile responsive design'
        ],
        isPopular: true,
        category: 'website',
      },
      {
        title: 'Free Website Audit',
        price: 'Free',
        priceLkr: 'Free',
        priceUsd: 'Free',
        description: 'For businesses that want DexLanka to review their current website or Facebook page first',
        features: [
          'Homepage clarity review',
          'Mobile UX review',
          'WhatsApp CTA review',
          'Basic SEO observations',
          'Speed and trust suggestions',
          'Next-step recommendation'
        ],
        isPopular: false,
        category: 'website',
      },
    ],
    applications: [
      {
        title: 'Custom Business Software',
        price: 'Quote Based',
        priceLkr: 'Quote Based',
        priceUsd: 'Quote Based',
        description: 'POS systems, inventory systems, employee systems, booking systems, dashboards, and automation',
        features: [
          'Admin dashboard',
          'Staff login',
          'Customer management',
          'Sales management',
          'Stock management',
          'Reports',
          'Invoices',
          'Business automation'
        ],
        isPopular: false,
        category: 'web_application',
      },
      {
        title: 'E-commerce Website',
        price: 'From Rs 60,000 / Rs 250,000',
        priceLkr: 'From Rs 60,000 / Rs 250,000',
        priceUsd: 'From $200 / $850',
        description: 'For shops and online stores that need products, cart, checkout, and order management',
        features: [
          'Product categories',
          'Product pages',
          'Cart',
          'Checkout',
          'Order management',
          'Admin panel',
          'WhatsApp order option',
          'COD/payment options depending on requirement'
        ],
        isPopular: true,
        category: 'web_application',
      },
      {
        title: 'POS / Inventory System',
        price: 'Quote Based',
        priceLkr: 'Quote Based',
        priceUsd: 'Quote Based',
        description: 'Business system for sales, stock, reports, staff, and suppliers',
        features: [
          'Sales management',
          'Stock management',
          'Invoices',
          'Staff login',
          'Reports',
          'Suppliers',
          'Customers',
          'Business automation'
        ],
        isPopular: false,
        category: 'desktop_system',
      },
    ],
    mobile: [
      {
        title: 'Simple Mobile App',
        price: 'Scoped Quote',
        priceLkr: 'Scoped Quote',
        priceUsd: 'Scoped Quote',
        description: 'Focused mobile app for core customer or staff workflows',
        features: [
          'Up to 5 screens/features',
          'User authentication',
          'Basic API integration',
          'Push notifications',
          'App store submission',
          '6 months support'
        ],
        isPopular: false,
        category: 'mobile_app',
      },
      {
        title: 'SaaS MVP',
        price: 'Scoped Quote',
        priceLkr: 'Scoped Quote',
        priceUsd: 'Scoped Quote',
        description: 'First version of a SaaS, marketplace, dashboard, or startup web app product',
        features: [
          'Cross-platform (iOS & Android)',
          'Complex functionality',
          'User profiles & social features',
          'API integration',
          'Offline mode',
          'In-app purchases',
          'Analytics integration',
          '1 Year Support'
        ],
        isPopular: true,
        category: 'mobile_app',
      },
      {
        title: 'Admin Dashboard',
        price: 'Scoped Quote',
        priceLkr: 'Scoped Quote',
        priceUsd: 'Scoped Quote',
        description: 'Internal tools, analytics panels, CRUD screens, and reporting',
        features: [
          'Role-based access',
          'Data tables and filters',
          'Charts and reports',
          'CRUD screens',
          'Export-ready workflows',
          'Supabase/API integration',
          'Responsive admin UI',
        ],
        isPopular: false,
        category: 'mobile_app',
      },
    ],
    enterprise: [
      {
        title: 'Enterprise Solution',
        price: 'Custom',
        priceLkr: 'Custom',
        priceUsd: 'Custom',
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
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} countryCode={countryCode} isDetected={isDetected} />
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
            {packages[currentTab as keyof typeof packages].map((pkg, index) => (
              <PackageCard key={index} {...pkg} price={getCurrencyPrice(pkg, currency)} delay={index} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">Don't see a package that fits your needs? We offer custom solutions.</p>
            <button
              onClick={handleRequestQuote}
              className="inline-block w-full sm:w-auto px-6 py-3 border border-dexRed text-dexRed rounded-lg text-sm sm:text-base hover:bg-dexRed/10 transition-colors"
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

      <MaintenancePlansSection />
      <FinalCTA
        title="Need a clear quote before you start?"
        description="Send your business type, required features, budget range, and timeline. DexLanka will help you choose the right package or custom scope."
        primaryLabel="Request Website Package"
      />

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
