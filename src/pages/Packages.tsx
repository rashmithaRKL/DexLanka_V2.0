
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, XCircle } from 'lucide-react';

const Packages = () => {
  const [comparisonRef, comparisonInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [currentTab, setCurrentTab] = useState('websites');

  const packages = {
    websites: [
      {
        title: 'One-Page Website',
        price: '$599',
        description: 'Perfect for landing pages or simple business sites',
        features: [
          'One-page responsive design',
          'Contact form integration',
          'Basic SEO setup',
          'Social media links',
          '1 revision included'
        ],
        isPopular: false,
      },
      {
        title: '5-Page Website',
        price: '$1,499',
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
      },
      {
        title: '10+ Page Website',
        price: '$2,999',
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
      },
    ],
    applications: [
      {
        title: 'Web Application',
        price: '$5,999',
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
      },
      {
        title: 'E-Commerce Website',
        price: '$7,999',
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
      },
      {
        title: 'Desktop Application',
        price: '$8,999',
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
      },
    ],
    mobile: [
      {
        title: 'Simple Mobile App',
        price: '$7,499',
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
      },
      {
        title: 'Advanced Mobile App',
        price: '$12,999',
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
      },
      {
        title: 'E-Commerce Mobile App',
        price: '$15,999',
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
        fivePage: false,
        tenPage: 'Optional',
        webApp: true,
        eCommerce: true,
      },
      {
        feature: 'Payment Processing',
        onePage: false,
        fivePage: 'Optional',
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
        onePage: '1',
        fivePage: '2',
        tenPage: '3',
        webApp: '3',
        eCommerce: '3',
      },
      {
        feature: 'Support Period',
        onePage: '1 month',
        fivePage: '3 months',
        tenPage: '3 months',
        webApp: '6 months',
        eCommerce: '12 months',
      },
    ],
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text={<span className="inline-block text-xl text-dexRed font-medium mb-4">Our Packages</span>}
              animation="slide-up"
              className="mb-4"
            />
            <AnimatedText
              text={<h1 className="text-4xl md:text-5xl font-bold mb-6">Choose the Perfect Package</h1>}
              animation="slide-up"
              delay={100}
              className="mb-6"
            />
            <AnimatedText
              text={
                <p className="text-gray-300 text-lg">
                  We offer a range of packages to suit different business needs and budgets.
                  Each package is designed to deliver maximum value and can be customized to your specific requirements.
                </p>
              }
              animation="slide-up"
              delay={200}
            />
          </div>
        </div>
      </section>
      
      {/* Packages Tabs */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className="inline-flex glass rounded-lg p-1">
              {[
                { id: 'websites', label: 'Websites' },
                { id: 'applications', label: 'Applications' },
                { id: 'mobile', label: 'Mobile Apps' },
                { id: 'enterprise', label: 'Enterprise' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentTab === tab.id
                      ? 'bg-dexRed text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages[currentTab as keyof typeof packages].map((pkg, index) => (
              <PackageCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
                delay={index}
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-6">
              Don't see a package that fits your needs? We offer custom solutions tailored to your specific requirements.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 border border-dexRed text-dexRed rounded-lg font-medium hover:bg-dexRed/10 transition-colors"
            >
              Request Custom Quote
            </a>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section ref={comparisonRef} className="section-padding bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Package Comparison</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Compare Our Website Packages</h2>
            <p className="text-gray-300">
              See which package is right for your business with our detailed comparison.
              Each package is designed to provide the features you need at different stages of your business.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="overflow-x-auto glass rounded-2xl"
          >
            <table className="min-w-full">
              <thead>
                <tr>
                  {comparisonData.headers.map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-4 text-left text-sm font-semibold ${
                        index === 0 ? 'text-white' : 'text-dexRed'
                      } border-b border-gray-800`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-dark-800/30' : ''}>
                    <td className="px-6 py-4 text-white font-medium border-b border-gray-800">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-800">
                      {typeof row.onePage === 'boolean' ? (
                        row.onePage ? (
                          <CheckCircle size={20} className="text-dexRed" />
                        ) : (
                          <XCircle size={20} className="text-gray-600" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.onePage}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-800">
                      {typeof row.fivePage === 'boolean' ? (
                        row.fivePage ? (
                          <CheckCircle size={20} className="text-dexRed" />
                        ) : (
                          <XCircle size={20} className="text-gray-600" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.fivePage}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-800">
                      {typeof row.tenPage === 'boolean' ? (
                        row.tenPage ? (
                          <CheckCircle size={20} className="text-dexRed" />
                        ) : (
                          <XCircle size={20} className="text-gray-600" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.tenPage}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-800">
                      {typeof row.webApp === 'boolean' ? (
                        row.webApp ? (
                          <CheckCircle size={20} className="text-dexRed" />
                        ) : (
                          <XCircle size={20} className="text-gray-600" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.webApp}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-800">
                      {typeof row.eCommerce === 'boolean' ? (
                        row.eCommerce ? (
                          <CheckCircle size={20} className="text-dexRed" />
                        ) : (
                          <XCircle size={20} className="text-gray-600" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.eCommerce}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-300">
              Find answers to common questions about our packages and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does it take to complete a website?",
                answer: "Completion times vary by project complexity. A one-page website typically takes 1-2 weeks, a 5-page site 3-4 weeks, and larger projects 6-12 weeks. We'll provide a specific timeline during our initial consultation."
              },
              {
                question: "Do you offer ongoing maintenance?",
                answer: "Yes, we offer maintenance packages to keep your website secure, updated, and performing optimally. These can be purchased separately or added to your initial package."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit cards, bank transfers, and PayPal. For most projects, we require a 50% deposit to begin work, with the remainder due upon completion."
              },
              {
                question: "Can you help with content creation?",
                answer: "Yes, we offer content creation services including copywriting, photography, and video production as add-ons to our packages. Ask about our content creation services during consultation."
              },
              {
                question: "Do you offer hosting services?",
                answer: "Yes, we provide reliable hosting solutions for all our web projects. Our hosting includes regular backups, security monitoring, and technical support."
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Absolutely! We design our solutions to be scalable. You can start with a basic package and upgrade as your business grows and your needs evolve."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-darkBlue to-background">
        <div className="container mx-auto px-6">
          <div className="glass p-12 rounded-2xl text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and find the perfect package for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                Contact Us
              </a>
              <a
                href="/services"
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Packages;
