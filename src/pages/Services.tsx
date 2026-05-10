import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, PenTool, ShoppingCart, Database, BarChart, CheckCircle, Monitor, Globe, Server, Shield, Headphones } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { BreadcrumbSchema, ServiceSchema } from '@/components/StructuredData';
import { FinalCTA, PackagesGuidanceSection, SupportPromiseSection } from '@/components/MarketingSections';

const Services = () => {
  // SEO Optimization
  useSEO({
    title: 'Web Development, Mobile Apps & POS Systems in Sri Lanka | DexLanka',
    description: "Explore DexLanka's website development, mobile app development, e-commerce, POS, inventory, UI/UX, branding, SEO, and custom software services.",
    keywords: 'web development Sri Lanka, mobile app development Sri Lanka, POS system Sri Lanka, inventory system Sri Lanka, custom software Sri Lanka, e-commerce website Sri Lanka, UI UX SEO Sri Lanka',
    image: '/services-og.png',
    url: '/services',
    canonical: '/services',
    type: 'website',
  });
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Code size={40} />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies for maximum performance and user experience.',
      features: [
        'Responsive design for all devices',
        'Performance optimization',
        'Progressive Web Apps (PWAs)',
        'SEO-friendly architecture',
        'Content management systems',
      ],
      path: '/web-development-sri-lanka',
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.',
      features: [
        'iOS and Android native apps',
        'React Native & Flutter development',
        'UI/UX design for mobile',
        'App Store optimization',
        'Maintenance and updates',
      ],
      path: '/mobile-app-development-sri-lanka',
    },
    {
      icon: <PenTool size={40} />,
      title: 'UI/UX Design',
      description: 'User-centric design solutions that elevate your digital products with intuitive and engaging experiences.',
      features: [
        'User research and personas',
        'Wireframing and prototyping',
        'Visual design and branding',
        'Usability testing',
        'Design systems creation',
      ],
      path: '/services',
    },
    {
      icon: <ShoppingCart size={40} />,
      title: 'E-Commerce',
      description: 'Custom online stores and marketplaces designed to maximize conversions and revenue.',
      features: [
        'Custom shopping experiences',
        'Payment gateway integration',
        'Inventory management',
        'Mobile commerce optimization',
        'Analytics and reporting',
      ],
      path: '/ecommerce-website-development-sri-lanka',
    },
    {
      icon: <Database size={40} />,
      title: 'POS & Inventory Systems',
      description: 'Custom POS, stock, invoice, customer, supplier, staff login, and reporting systems for Sri Lankan businesses.',
      features: [
        'Billing and invoices',
        'Stock management',
        'Staff roles',
        'Supplier and customer records',
        'Daily reports',
      ],
      path: '/pos-system-sri-lanka',
    },
    {
      icon: <BarChart size={40} />,
      title: 'SEO & Digital Growth',
      description: 'SEO-ready website structure, conversion copy, analytics setup, and local search improvements for business inquiries.',
      features: [
        'SEO and content strategy',
        'Local service pages',
        'Conversion CTA planning',
        'Analytics setup',
        'Analytics and performance tracking',
      ],
      path: '/web-development-sri-lanka',
    },
    {
      icon: <Monitor size={40} />,
      title: 'Web Applications',
      description: 'Powerful and scalable web applications that solve complex business problems and streamline operations.',
      features: [
        'SaaS product development',
        'Enterprise web applications',
        'Cloud-based solutions',
        'Real-time applications',
        'API development and integration',
      ],
      path: '/saas-mvp-development',
    },
    {
      icon: <Globe size={40} />,
      title: 'Digital Transformation',
      description: 'Comprehensive digital transformation services to modernize your business and enhance efficiency.',
      features: [
        'Legacy system modernization',
        'Process automation',
        'Cloud migration',
        'Digital workflow optimization',
        'Technology stack evaluation',
      ],
      path: '/custom-software-development-sri-lanka',
    },
    {
      icon: <Server size={40} />,
      title: 'DevOps Services',
      description: 'Streamline your development and operations with our expert DevOps services and solutions.',
      features: [
        'CI/CD pipeline implementation',
        'Infrastructure as code',
        'Containerization (Docker, Kubernetes)',
        'Cloud infrastructure management',
        'Performance monitoring',
      ],
      path: '/react-supabase-development-agency',
    },
  ];

  const processSteps = [
    {
      icon: <span className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold">1</span>,
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, target audience, and project requirements to create a solid foundation for success.',
    },
    {
      icon: <span className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold">2</span>,
      title: 'Design & Prototyping',
      description: 'Our designers create wireframes and interactive prototypes to visualize the solution and refine the user experience before development begins.',
    },
    {
      icon: <span className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold">3</span>,
      title: 'Development',
      description: 'Our experienced developers build your solution using the latest technologies and best practices, with regular updates and milestones.',
    },
    {
      icon: <span className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold">4</span>,
      title: 'Testing & QA',
      description: 'Rigorous quality assurance and testing across different devices and scenarios ensures your solution works flawlessly.',
    },
    {
      icon: <span className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold">5</span>,
      title: 'Deployment',
      description: 'We carefully deploy your solution to production, ensuring a smooth transition and minimal disruption to your business.',
    },
    {
      icon: <span className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold">6</span>,
      title: 'Support & Maintenance',
      description: 'Our relationship continues with ongoing support, maintenance, and updates to keep your solution secure and performing optimally.',
    },
  ];

  const whyChooseUs = [
    {
      icon: <CheckCircle className="text-dexRed" size={24} />,
      title: 'Experienced Team',
      description: 'Our team of experts brings years of industry experience to every project.',
    },
    {
      icon: <Shield className="text-dexRed" size={24} />,
      title: 'Quality Assurance',
      description: 'Rigorous testing and QA processes ensure high-quality deliverables.',
    },
    {
      icon: <Globe className="text-dexRed" size={24} />,
      title: 'Global Reach',
      description: 'We serve clients worldwide with solutions tailored to their regional markets.',
    },
    {
      icon: <Headphones className="text-dexRed" size={24} />,
      title: 'Dedicated Support',
      description: '24/7 support and maintenance to ensure your solutions run smoothly.',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ServiceSchema
        name="Web Development, Mobile Apps, POS Systems, Inventory Systems, and Custom Software"
        description="DexLanka Software Solutions provides web development, mobile app development, e-commerce, POS, inventory, UI/UX, SEO, dashboards, and custom software services."
        url="/services"
        areaServed={['Sri Lanka', 'International']}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
      ]} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Our Services"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Websites, Mobile Apps, POS Systems & Business Software"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="Explore website development, mobile app development, e-commerce, POS, inventory, dashboards, UI/UX, SEO, and custom software services for Sri Lankan SMEs and international startups."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section ref={servicesRef} className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden h-full flex flex-col"
              >
                <div className="p-8">
                  <div className="text-dexRed mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  <div className="mt-auto">
                    <h4 className="font-medium mb-4 text-white">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle size={16} className="text-dexRed mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={service.path}
                      className="inline-flex items-center text-dexRed font-medium mt-6 group"
                    >
                      Learn more
                      <CheckCircle size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PackagesGuidanceSection compact />
      
      {/* Our Process */}
      <section ref={processRef} className="section-padding bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Work</h2>
            <p className="text-gray-300">
              Our systematic approach ensures that every project is delivered with quality, efficiency, and transparency,
              from initial concept to final deployment and beyond.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform translate-x-[-50%] z-0"></div>
            
            {/* Process Steps */}
            <div className="relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={processInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`mb-12 md:mb-24 flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center`}
                >
                  {/* Step Number and Line */}
                  <div className="mb-6 md:mb-0 md:w-1/2 flex flex-col items-center md:items-end md:pr-12">
                    <div className="flex md:flex-row-reverse items-center">
                      <div className="z-10 relative">{step.icon}</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 md:pl-12">
                    <div className={`glass p-6 rounded-2xl ${index % 2 === 0 ? 'md:ml-6' : 'md:mr-6'}`}>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The DexLanka Difference</h2>
            <p className="text-gray-300">
              When you partner with us, you get more than just a service provider. You get a dedicated team that's invested in your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-8 rounded-2xl text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SupportPromiseSection />
      
      <FinalCTA />
      
      <Footer />
    </div>
  );
};

export default Services;
