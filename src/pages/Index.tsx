import React, { Suspense, lazy } from 'react';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import CounterAnimation from '@/components/CounterAnimation';
import { motion } from 'framer-motion';
import { BarChart, Code, Database, PenTool, ShoppingCart, Smartphone } from 'lucide-react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useSEO } from '@/hooks/useSEO';
import { FAQSchema, LocalBusinessSchema, OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';
import {
  CaseStudiesSection,
  ClientLogosSection,
  FAQSection,
  FinalCTA,
  FounderStorySection,
  GoogleReviewPlaceholderSection,
  PackagesGuidanceSection,
  ProcessTimeline,
  RelatedServiceLinks,
  SectionHeading,
  ServiceAreasSection,
  SupportPromiseSection,
  TestimonialsSection,
  TrustBar,
  WhyDexLanka,
} from '@/components/MarketingSections';
import { homepageFaqs, servicePages } from '@/data/site';

const ContactForm = lazy(() => import('@/components/ContactForm'));

const Index = () => {
  useSEO({
    title: 'DexLanka Software Solutions | Web, Mobile & Business Software in Sri Lanka',
    description:
      'DexLanka builds modern websites, e-commerce stores, mobile apps, POS systems, inventory systems, and custom business software for Sri Lankan SMEs and global startups.',
    keywords:
      'DexLanka Software Solutions, web development Sri Lanka, mobile apps Sri Lanka, POS system Sri Lanka, inventory system Sri Lanka, e-commerce website Sri Lanka, React Supabase Next.js',
    image: '/og-image.png',
    url: '/',
    canonical: '/',
    type: 'website',
  });

  useVisitorTracking();

  const services = [
    {
      icon: <Code size={24} />,
      title: 'Web Development',
      description:
        'Modern business websites, landing pages, CMS websites, and web apps built for mobile users, local SEO, and customer inquiries.',
      href: '/web-development-sri-lanka',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Applications',
      description:
        'Cross-platform mobile apps for customer experiences, bookings, ordering, internal workflows, and startup MVPs.',
      href: '/mobile-app-development-sri-lanka',
    },
    {
      icon: <ShoppingCart size={24} />,
      title: 'E-Commerce',
      description:
        'Online stores with products, cart, checkout, COD/payment planning, order dashboards, and WhatsApp order alerts.',
      href: '/ecommerce-website-development-sri-lanka',
    },
    {
      icon: <Database size={24} />,
      title: 'POS & Inventory Systems',
      description:
        'Custom POS, stock, invoice, supplier, customer, staff login, and reporting systems for Sri Lankan SMEs.',
      href: '/pos-system-sri-lanka',
    },
    {
      icon: <BarChart size={24} />,
      title: 'Dashboards & Custom Software',
      description:
        'Admin dashboards, business systems, SaaS MVPs, and workflow tools using React, Supabase, Next.js, and Cloudflare.',
      href: '/custom-software-development-sri-lanka',
    },
    {
      icon: <PenTool size={24} />,
      title: 'UI/UX, SEO & Branding Support',
      description:
        'User-focused layouts, SEO-ready structure, clearer service copy, visual consistency, and conversion-focused design improvements.',
      href: '/services',
    },
  ];

  const stats = [
    { number: 3, suffix: '+', label: 'Years Experience' },
    { number: 12, suffix: '+', label: 'Projects Completed' },
    { number: 10, suffix: '+', label: 'Happy Clients' },
    { number: 2, suffix: '+', label: 'Team Experts' },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <FAQSchema items={homepageFaqs} id="homepage-faq" />
      <Navbar />

      <HeroSection />
      <TrustBar compact />

      <section id="services" className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Our Services"
            title="Websites, Apps, POS, Inventory, and Custom Software"
            description="DexLanka helps Sri Lankan SMEs and international startups build practical digital systems that improve customer inquiries, operations, and online credibility."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Browse All Service Pages</h2>
            <p className="text-gray-300 mb-6">
              Explore local Sri Lankan service pages and international startup development pages.
            </p>
            <RelatedServiceLinks paths={servicePages.map((page) => page.path)} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline">
                  <CounterAnimation end={stat.number} suffix={stat.suffix} duration={2000} className="flex" />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudiesSection limit={6} />
      <WhyDexLanka />
      <ClientLogosSection />
      <FounderStorySection />
      <ProcessTimeline />
      <PackagesGuidanceSection />
      <SupportPromiseSection />
      <ServiceAreasSection />
      <TestimonialsSection />
      <GoogleReviewPlaceholderSection />
      <FAQSection faqs={homepageFaqs} />

      <section id="contact" className="section-padding bg-darkBlue">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get a Free Project Consultation</h2>
            <p className="text-gray-300">
              Tell us what you want to build. DexLanka can help plan your website, app, e-commerce store, POS system, inventory system, or custom software.
            </p>
          </div>

          <Suspense fallback={<div className="text-center">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
