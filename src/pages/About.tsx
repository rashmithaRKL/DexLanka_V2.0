import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import CounterAnimation from '@/components/CounterAnimation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSEO } from '@/hooks/useSEO';
import { BreadcrumbSchema } from '@/components/StructuredData';

const About = () => {
  // SEO Optimization
  useSEO({
    title: 'About DexLanka Software Solutions | Homagama, Sri Lanka',
    description: 'Learn about DexLanka Software Solutions, a Sri Lankan software studio based near Homagama building websites, apps, POS systems, inventory systems, and custom software.',
    keywords: 'about DexLanka Software Solutions, software company Homagama, Sri Lanka web development team, custom software Sri Lanka',
    image: '/og-image.png',
    url: '/about',
    canonical: '/about',
    type: 'website',
  });
  const [journeyRef, journeyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
    {
      year: '2024',
      title: 'DexLanka Founded',
      description: 'DexLanka started as a Sri Lankan software studio focused on websites, business systems, and practical digital solutions.',
    },
    {
      year: '2024',
      title: 'Local Business Website Work',
      description: 'The team focused on mobile-friendly websites, clear business copy, WhatsApp CTAs, and SEO-ready structures for SMEs.',
    },
    {
      year: '2025',
      title: 'Business Software Capability',
      description: 'DexLanka expanded project planning around POS systems, inventory systems, admin dashboards, mobile apps, and custom workflows.',
    },
    {
      year: '2026',
      title: 'Local and International Positioning',
      description: 'DexLanka now positions its services for Sri Lankan businesses and international startups that need affordable React, Supabase, and custom software support.',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ]} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Our Story"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="We Are DexLanka"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="A Sri Lankan software studio helping SMEs and startups build websites, apps, POS systems, inventory systems, dashboards, and custom business software."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: 3, label: 'Years of Excellence' },
              { number: 12, suffix: '+', label: 'Projects Delivered' },
              { number: 10, suffix: '+', label: 'Happy Clients' },
              { number: 2, label: 'Team Members' },
            ].map((stat, index) => (
              <div key={index} className="glass p-6 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline justify-center">
                  <CounterAnimation
                    end={stat.number}
                    suffix={stat.suffix || ''}
                    duration={2000}
                    className="flex"
                  />
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <span className="inline-block text-xl text-dexRed font-medium mb-4">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Helping Businesses Launch Useful Digital Systems</h2>
              <p className="text-gray-300 mb-6">
                At DexLanka, we help Sri Lankan SMEs and international startups plan, design, build, and maintain practical software that supports real business goals. Our work includes websites, e-commerce stores, mobile apps, POS systems, inventory systems, admin dashboards, and custom software.
              </p>
              <p className="text-gray-300 mb-6">
                We focus on clear communication, mobile-responsive design, SEO-ready structure, maintainable technology, and support after launch so clients can keep improving their digital presence and internal workflows.
              </p>
              <div className="bg-darkBlue p-6 rounded-lg border-l-4 border-dexRed">
                <p className="text-gray-300 italic">
                  "Our goal is to build software that is clear, useful, and realistic for the business using it. Good technology should make customer communication and daily operations easier."
                </p>
                <p className="text-white font-medium mt-3">- Rashmitha Kalhara, Founder</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920"
                  alt="DexLanka software development team collaboration"
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-darkBg/30 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-dexRed/90 flex items-center justify-center text-white hover:bg-dexRed transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section ref={teamRef} className="section-padding bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet The Experts</h2>
            <p className="text-gray-300">
              Our diverse team of talented professionals is the heart of everything we do at DexLanka.
              Each member brings unique expertise and passion to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-dexRed mb-4">{member.position}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Company Journey */}
      <section ref={journeyRef} className="section-padding">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The DexLanka Story</h2>
            <p className="text-gray-300">
              From humble beginnings to where we are today, our journey has been defined by innovation,
              perseverance, and a relentless pursuit of excellence.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:translate-x-[-0.5px]"></div>

            {/* Timeline Items */}
            <div className="relative z-10">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`mb-12 md:mb-24 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-center`}
                >
                  {/* Year and Dot */}
                  <div className="mb-6 md:mb-0 md:w-1/2 flex flex-col items-center md:items-end md:pr-12">
                    <div className="flex md:flex-row-reverse items-center">
                      <div className="w-8 h-8 rounded-full bg-dexRed flex items-center justify-center -ml-4 mr-4 md:ml-0 md:mr-0 md:-mr-4 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <span className="text-2xl font-bold mr-4 md:mr-0">{item.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 md:pl-12">
                    <div className="glass p-6 rounded-2xl">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-darkBlue to-background">
        <div className="container mx-auto px-6">
          <div className="glass p-12 rounded-2xl text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Bring Your Ideas to Life?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Partner with DexLanka and transform your vision into reality with our expert team and innovative solutions.
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

export default About;
