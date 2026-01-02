import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import CounterAnimation from '@/components/CounterAnimation';
import CEO from '../assets/images/Firefly 20250428003444.png';
import FrontEndDev from '../assets/images/Firefly 20250430030414.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSEO } from '@/hooks/useSEO';
import { BreadcrumbSchema } from '@/components/StructuredData';

const About = () => {
  // SEO Optimization
  useSEO({
    title: 'About Us - DexLanka Team & Story',
    description: 'Learn about DexLanka - a leading IT services company in Sri Lanka. Meet our expert team, discover our journey, and see how we deliver premium web development, mobile apps, and digital solutions.',
    keywords: 'about DexLanka, DexLanka team, IT company Sri Lanka, software development company, web development team, our story',
    image: '/about-og.png',
    url: '/about',
    type: 'website',
  });
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [journeyRef, journeyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const team = [
    {
      name: 'Rashmitha Kalhara',
      position: 'CEO, Founder, Lead Developer',
      image: CEO,
      bio: 'Rashmitha founded DexLanka with a vision to create exceptional software solutions that transform businesses.',
    },
    {
      name: 'Tharushi Nethmini',
      position: 'UI/UX Director, Developer',
      image: FrontEndDev,
      bio: 'Tharushi leads our technical team with over 3 years of experience in software development and architecture.',
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'DexLanka Founded',
      description: 'Started as a small team of 3 passionate developers with a vision to create innovative software solutions.',
    },
    {
      year: '2024',
      title: 'First Major Client',
      description: 'Secured our first enterprise client and expanded the team to 10 members to handle growing projects.',
    },
    {
      year: '2024',
      title: 'Mobile App Division',
      description: 'Launched our dedicated mobile application development division to focus on iOS and Android platforms.',
    },
    {
      year: '2025',
      title: 'International Expansion',
      description: 'Opened our first international office and partnered with global technology leaders.',
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
              text="A passionate team of designers, developers, and digital strategists dedicated to creating exceptional software solutions that drive business growth and deliver outstanding user experiences."
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Empowering Businesses Through Technology</h2>
              <p className="text-gray-300 mb-6">
                At DexLanka, we're dedicated to empowering businesses with innovative technology solutions that drive growth, enhance efficiency, and create exceptional user experiences. We believe that the right technology can transform any business, and we're committed to making that transformation as seamless and effective as possible.
              </p>
              <p className="text-gray-300 mb-6">
                With a team of passionate experts across various technology domains, we bring creativity, technical excellence, and strategic thinking to every project we undertake. Our collaborative approach ensures that we understand your unique challenges and opportunities, allowing us to deliver solutions that not only meet but exceed your expectations.
              </p>
              <div className="bg-darkBlue p-6 rounded-lg border-l-4 border-dexRed">
                <p className="text-gray-300 italic">
                  "Our vision is to be the go-to partner for businesses seeking to leverage technology for transformative growth. We don't just build software; we build relationships and solutions that last."
                </p>
                <p className="text-white font-medium mt-3">— Alex Rivera, CEO & Founder</p>
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
                  alt="DexLanka Team"
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
