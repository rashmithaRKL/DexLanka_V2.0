import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, PenTool, ShoppingCart, Database, BarChart, CheckCircle, Monitor, Globe, Server, Shield, Headphones } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { BreadcrumbSchema } from '@/components/StructuredData';

const Services = () => {
  // SEO Optimization
  useSEO({
    title: 'Our Services - IT Solutions & Digital Services | DexLanka',
    description: 'Comprehensive IT services including web development, mobile apps, UI/UX design, e-commerce solutions, desktop applications, and digital marketing. Expert solutions for your business in Sri Lanka.',
    keywords: 'web development services, mobile app development, UI/UX design, e-commerce solutions, digital marketing, IT services Sri Lanka, software development services',
    image: '/services-og.png',
    url: '/services',
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
    },
    {
      icon: <Database size={40} />,
      title: 'Desktop Applications',
      description: 'High-performance desktop applications for Windows, macOS, and Linux platforms.',
      features: [
        'Cross-platform applications',
        'Electron.js development',
        'System integration capabilities',
        'Offline functionality',
        'Automated updates',
      ],
    },
    {
      icon: <BarChart size={40} />,
      title: 'Digital Marketing',
      description: 'Strategic digital marketing solutions to boost your online presence and drive business growth.',
      features: [
        'SEO and content strategy',
        'Social media marketing',
        'PPC and display advertising',
        'Email marketing campaigns',
        'Analytics and performance tracking',
      ],
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
              text="Comprehensive Software Solutions"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="From web and mobile development to UI/UX design and digital marketing, we offer end-to-end services to help businesses thrive in the digital landscape."
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
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
      
      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-darkBlue to-background">
        <div className="container mx-auto px-6">
          <div className="glass p-12 rounded-2xl text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your Project?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's talk about how our services can help you achieve your business goals. Schedule a consultation with our team today.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
