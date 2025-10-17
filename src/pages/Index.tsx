import React, { Suspense, lazy, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import AnimatedText from '@/components/AnimatedText';
import CounterAnimation from '@/components/CounterAnimation';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Code, Smartphone, PenTool, ShoppingCart, Database, BarChart } from 'lucide-react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

// Lazy-loaded components
const ContactForm = lazy(() => import('@/components/ContactForm'));

const Index = () => {
  // Track visitor
  useVisitorTracking();

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Code size={24} />,
      title: 'Web Development',
      description: 'Modern websites and web applications built with cutting-edge technologies for maximum performance and user experience.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.',
    },
    {
      icon: <PenTool size={24} />,
      title: 'UI/UX Design',
      description: 'User-centric design solutions that elevate your digital products with intuitive and engaging experiences.',
    },
    {
      icon: <ShoppingCart size={24} />,
      title: 'E-Commerce',
      description: 'Custom online stores and marketplaces designed to maximize conversions and revenue.',
    },
    {
      icon: <Database size={24} />,
      title: 'Desktop Applications',
      description: 'High-performance desktop applications for Windows, macOS, and Linux platforms.',
    },
    {
      icon: <BarChart size={24} />,
      title: 'Digital Marketing',
      description: 'Strategic digital marketing solutions to boost your online presence and drive business growth.',
    },
  ];

  const stats = [
    { number: 3, suffix: '+', label: 'Years Experience' },
    { number: 12, suffix: '+', label: 'Projects Completed' },
    { number: 10, suffix: '+', label: 'Happy Clients' },
    { number: 2, suffix: '+', label: 'Team Experts' },
  ];

  const testimonials = [
    {
      id: 1,
      content: "DexLanka transformed our business with their exceptional web development services. They delivered a high-performing website that exceeded our expectations.",
      author: "Sarah Johnson",
      position: "CEO, TechInnovate",
    },
    {
      id: 2,
      content: "The mobile app developed by DexLanka revolutionized how we interact with our customers. The team was professional, responsive, and delivered on time.",
      author: "Michael Chang",
      position: "CTO, MobileFirst",
    },
    {
      id: 3,
      content: "We've worked with many development companies, but DexLanka stands out for their attention to detail and commitment to quality.",
      author: "Emily Rodriguez",
      position: "Marketing Director, GrowthX",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section id="services" className="section-padding" ref={servicesRef}>
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText
              text="Our Services"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Comprehensive Software Solutions for Your Business"
              animation="slide-up"
              delay={100}
              className="text-3xl md:text-4xl font-bold mb-6"
            />
            <AnimatedText
              text="We offer a wide range of software development services tailored to meet the unique needs of your business. Our expert team is dedicated to delivering high-quality solutions that drive growth and success."
              animation="slide-up"
              delay={200}
              className="text-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-darkBlue" ref={statsRef}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline">
                  <CounterAnimation
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2000}
                    className="flex"
                  />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-b from-background to-darkBlue" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText
              text="Testimonials"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="What Our Clients Say"
              animation="slide-up"
              delay={100}
              className="text-3xl md:text-4xl font-bold mb-6"
            />
            <AnimatedText
              text="Don't just take our word for it. Hear what our clients have to say about our services and solutions."
              animation="slide-up"
              delay={200}
              className="text-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="glass p-8 rounded-2xl"
              >
                <svg width="45" height="36" className="text-dexRed/30 mb-6" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.95 36C9.225 36 5.625 34.5 3.15 31.5C1.05 29.1 0 25.95 0 22.05C0 17.85 1.275 14.025 3.825 10.575C6.375 7.125 10.05 4.275 14.85 2.025L18.225 7.65C14.625 9.45 11.925 11.4 10.125 13.5C8.325 15.6 7.425 17.325 7.425 18.675C7.425 19.275 7.65 19.8 8.1 20.25C8.55 20.625 9.225 21 10.125 21.375C12.225 22.275 13.8 23.4 14.85 24.75C15.9 26.025 16.425 27.675 16.425 29.7C16.425 31.65 15.675 33.225 14.175 34.425C12.75 35.475 11.025 36 13.95 36ZM37.8 36C33.075 36 29.475 34.5 27 31.5C24.9 29.1 23.85 25.95 23.85 22.05C23.85 17.85 25.125 14.025 27.675 10.575C30.225 7.125 33.9 4.275 38.7 2.025L42.075 7.65C38.475 9.45 35.775 11.4 33.975 13.5C32.175 15.6 31.275 17.325 31.275 18.675C31.275 19.275 31.5 19.8 31.95 20.25C32.4 20.625 33.075 21 33.975 21.375C36.075 22.275 37.65 23.4 38.7 24.75C39.75 26.025 40.275 27.675 40.275 29.7C40.275 31.65 39.525 33.225 38.025 34.425C36.6 35.475 34.875 36 37.8 36Z" fill="currentColor" />
                </svg>

                <p className="text-gray-300 mb-6">{testimonial.content}</p>

                <div className="mt-auto">
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-darkBlue">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch With Our Team</h2>
            <p className="text-gray-300">
              Have a project in mind? We'd love to hear from you. Reach out to us and let's create something amazing together.
            </p>
          </div>

          <Suspense fallback={<div className="text-center">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
