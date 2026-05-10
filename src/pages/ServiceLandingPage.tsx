import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbSchema, FAQSchema, ServiceSchema } from '@/components/StructuredData';
import {
  CaseStudiesSection,
  FAQSection,
  FinalCTA,
  PackagesGuidanceSection,
  ProcessTimeline,
  RelatedServiceLinks,
  ServiceAreasSection,
  SupportPromiseSection,
  TrustBar,
} from '@/components/MarketingSections';
import { BUSINESS_INFO, getServicePageByPath, whatsappUrl } from '@/data/site';
import { useSEO } from '@/hooks/useSEO';

const ServiceLandingPage = () => {
  const location = useLocation();
  const page = getServicePageByPath(location.pathname);

  useSEO({
    title: page?.title || 'Service Not Found | DexLanka Software Solutions',
    description:
      page?.metaDescription ||
      'DexLanka Software Solutions builds websites, apps, dashboards, POS systems, inventory systems, and custom business software.',
    keywords: page
      ? `${page.heading}, DexLanka, Sri Lanka software company, React, Supabase, Next.js, web development`
      : undefined,
    url: page?.path || location.pathname,
    canonical: page?.path || location.pathname,
    image: '/og-image.png',
    type: 'website',
    noindex: !page,
  });

  if (!page) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold mb-4">Service page not found</h1>
            <p className="text-gray-300 mb-6">The service page you requested is not available.</p>
            <Link to="/services" className="inline-flex items-center px-6 py-3 bg-dexRed text-white rounded-lg">
              View Services
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <ServiceSchema
        name={page.heading}
        description={page.metaDescription}
        url={page.path}
        areaServed={page.kind === 'local' ? 'Sri Lanka' : ['Sri Lanka', 'International']}
      />
      <FAQSchema items={page.faqs} id={`faq-${page.slug}`} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: page.kind === 'local' ? 'Sri Lanka Services' : 'International Services', url: '/services' },
          { name: page.heading, url: page.path },
        ]}
      />
      <Navbar />

      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText text={page.eyebrow} animation="slide-up" className="inline-block text-xl text-dexRed font-medium mb-4" />
            <AnimatedText text={page.heading} animation="slide-up" delay={100} className="text-4xl md:text-5xl font-bold mb-6" />
            <AnimatedText text={page.summary} animation="slide-up" delay={200} className="text-gray-300 text-lg" />
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                <MessageCircle size={18} className="mr-2" />
                {page.ctaLabel}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustBar compact />

      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="glass rounded-2xl p-8">
              <span className="inline-block text-xl text-dexRed font-medium mb-4">Who It Is For</span>
              <h2 className="text-3xl font-bold mb-6">Designed for Real Business Workflows</h2>
              <div className="flex flex-wrap gap-3">
                {page.whoFor.map((item) => (
                  <Badge key={item} variant="outline" className="border-white/20 text-gray-200 capitalize">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <span className="inline-block text-xl text-dexRed font-medium mb-4">Service Explanation</span>
              <h2 className="text-3xl font-bold mb-6">What DexLanka Builds</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{page.summary}</p>
              <p className="text-gray-300 leading-relaxed">
                Contact {BUSINESS_INFO.name} to clarify scope, pages, features, integrations, timeline, and launch support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Features and Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything Needed for a Useful Launch</h2>
            <p className="text-gray-300">Each feature is planned around user experience, business operations, and long-term maintainability.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {page.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-gray-300">
                    <CheckCircle size={18} className="text-dexRed mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Business Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {page.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-gray-300">
                    <CheckCircle size={18} className="text-dexRed mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {page.techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sample Pricing Guidance</h2>
              <p className="text-gray-300 leading-relaxed">{page.pricing}</p>
            </div>
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <CaseStudiesSection projectIds={page.relatedProjectIds} limit={3} />

      <section className="py-16 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Related Services and Internal Links</h2>
            <RelatedServiceLinks paths={page.relatedServicePaths} />
          </div>
        </div>
      </section>

      {page.kind === 'local' && <ServiceAreasSection />}
      <PackagesGuidanceSection compact />
      <SupportPromiseSection />
      <FAQSection faqs={page.faqs} />
      <FinalCTA
        title={page.kind === 'international' ? 'Request a free project audit.' : "Tell us your project idea. We'll reply within 24 hours."}
        primaryLabel={page.kind === 'international' ? 'Request a Free Project Audit' : page.ctaLabel}
      />
      <Footer />
    </div>
  );
};

export default ServiceLandingPage;
