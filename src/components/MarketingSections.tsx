import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  BUSINESS_INFO,
  getWhatsAppUrl,
  maintenancePlans,
  packageGuidance,
  processSteps,
  serviceAreas,
  trustTechnologies,
  whatsappMessages,
  whyDexLanka,
} from '@/data/site';
import { projectDetails } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';
import { getCurrencyPrice, useCurrency, type CurrencyCode } from '@/hooks/useCurrency';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
    <span className="inline-block text-xl text-dexRed font-medium mb-4">{eyebrow}</span>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
    {description && <p className="text-gray-300">{description}</p>}
  </div>
);

export const CurrencySwitcher = ({
  currency,
  setCurrency,
  countryCode,
  isDetected,
}: {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  countryCode?: string | null;
  isDetected?: boolean;
}) => (
  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400 mb-8">
    <span>
      Prices shown in {currency === 'LKR' ? 'Sri Lankan Rupees' : 'USD'}
      {countryCode ? ` (${countryCode})` : ''}
      {!isDetected ? '...' : ''}
    </span>
    <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
      {(['LKR', 'USD'] as CurrencyCode[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setCurrency(option)}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
            currency === option ? 'bg-dexRed text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const TrustBar = ({ compact = false }: { compact?: boolean }) => (
  <section className={compact ? 'py-8 bg-darkBlue/70' : 'py-10 bg-darkBlue'}>
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
        {trustTechnologies.map((item) => (
          <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export const WhyDexLanka = () => (
  <section className="section-padding">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Why Businesses Choose DexLanka"
        title="Built for Trust, Inquiries, and Long-Term Support"
        description="DexLanka focuses on practical business outcomes: clearer customer journeys, modern responsive interfaces, reliable communication, and support after launch."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyDexLanka.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="glass p-6 rounded-2xl h-full"
          >
            <ShieldCheck className="text-dexRed mb-4" size={28} />
            <h3 className="text-lg font-semibold mb-2">{item}</h3>
            <p className="text-gray-300 text-sm">
              Every project is planned around usable features, clear content, and maintainable technology.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const ProcessTimeline = () => (
  <section className="section-padding bg-darkBlue">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Our Process"
        title="Free Consultation to Launch Support"
        description="A simple project flow keeps scope clear and helps both local and international clients understand what happens next."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-dexRed flex items-center justify-center text-white font-bold mb-4">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const PackagesGuidanceSection = ({ compact = false }: { compact?: boolean }) => {
  const { currency, setCurrency, countryCode, isDetected } = useCurrency();

  return (
    <section className={compact ? 'py-16 bg-darkBlue' : 'section-padding bg-gradient-to-b from-background to-darkBlue'}>
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Packages"
          title="Transparent Starting Points for Common Projects"
          description="These starting points help you understand what is included, what is excluded, and when a custom quote is needed."
        />
        <CurrencySwitcher currency={currency} setCurrency={setCurrency} countryCode={countryCode} isDetected={isDetected} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {packageGuidance.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`glass rounded-2xl p-6 h-full min-w-0 ${pkg.isPopular ? 'border-dexRed shadow-[0_0_40px_rgba(239,68,68,0.18)]' : ''}`}
            >
              {pkg.isPopular && <Badge className="bg-dexRed text-white mb-4">Popular</Badge>}
              <h3 className="text-xl font-bold mb-3">{pkg.title}</h3>
              <p className="text-dexRed font-semibold mb-5 leading-tight">{getCurrencyPrice(pkg, currency)}</p>
              {'bestFor' in pkg && pkg.bestFor && (
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  <span className="text-white font-medium">Best for: </span>
                  {pkg.bestFor}
                </p>
              )}
              <h4 className="text-white font-medium mb-3">Includes</h4>
              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-dexRed mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {'notIncluded' in pkg && pkg.notIncluded && (
                <>
                  <h4 className="text-white font-medium mt-6 mb-3">Not included</h4>
                  <ul className="space-y-2">
                    {pkg.notIncluded.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-gray-400">
                        <span className="text-dexRed mt-0.5">-</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
          Final price depends on features, design complexity, integrations, number of pages, content, timeline, and support requirements.
        </p>
        <div className="text-center mt-8">
          <a
            href={getWhatsAppUrl(whatsappMessages.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            <MessageCircle size={18} className="mr-2 shrink-0" />
            Request Website Package
          </a>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => (
  <section className="section-padding bg-gradient-to-b from-darkBlue to-background">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Testimonials"
        title="Verified Client Feedback Can Be Added Here"
        description="This section is prepared for real testimonials after client approval. No placeholder review is shown as a verified review."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Website client testimonial', 'Software client testimonial', 'Maintenance client testimonial'].map((slot, index) => (
          <motion.div
            key={slot}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4">{slot}</h3>
            <p className="text-gray-300 mb-6">
              Verified feedback, client name, business type, and approval status can be added here after the project handover.
            </p>
            <p className="text-gray-400 text-sm">Awaiting approved testimonial</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const GoogleReviewPlaceholderSection = () => (
  <section className="py-16 bg-darkBlue">
    <div className="container mx-auto px-6">
      <div className="glass rounded-2xl p-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Google Reviews Placeholder</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Verified Google reviews and client ratings can be embedded here after the public Google Business Profile review link is confirmed.
        </p>
      </div>
    </div>
  </section>
);

export const FAQSection = ({
  faqs,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
}: {
  faqs: Array<{ question: string; answer: string }>;
  eyebrow?: string;
  title?: string;
}) => (
  <section className="section-padding bg-darkBlue">
    <div className="container mx-auto px-6">
      <SectionHeading eyebrow={eyebrow} title={title} description="Clear answers to common planning, pricing, and support questions." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const CaseStudiesSection = ({ projectIds, limit = 6 }: { projectIds?: number[]; limit?: number }) => {
  const projects = (projectIds?.length
    ? projectIds.map((id) => projectDetails.find((project) => project.id === id)).filter(Boolean)
    : projectDetails.filter((project) => project.featured)
  ).slice(0, limit);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="Selected Website, App, and Software Projects"
          description="Explore examples of business websites, app interfaces, dashboards, and digital systems built with modern technologies."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project!.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="glass rounded-2xl overflow-hidden h-full flex flex-col"
            >
              <Link to={`/project/${project!.id}`} className="block aspect-[16/10] overflow-hidden">
                <img
                  src={project!.imageUrl}
                  alt={`${project!.title} project screenshot by DexLanka`}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-dexRed text-sm font-medium mb-3">{project!.category}</span>
                <h3 className="text-xl font-semibold mb-3">{project!.title}</h3>
                <p className="text-gray-300 text-sm mb-5 flex-1">{project!.description}</p>
                <Link to={`/project/${project!.id}`} className="inline-flex items-center text-dexRed font-medium group">
                  View case study
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ClientLogosSection = () => (
  <section className="py-16 bg-darkBlue">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Client Types"
        title="Built for Local SMEs and Startup Teams"
        description="Client logos can be added here after approval. The current blocks show the main business categories DexLanka supports."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {['SME Websites', 'Restaurants', 'Hotels & Villas', 'Retail Stores', 'Startups', 'Dashboards', 'POS Systems', 'E-commerce'].map((item) => (
          <div key={item} className="glass rounded-2xl px-4 py-6 text-center text-gray-300 font-medium">
            {item}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FounderStorySection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xl text-dexRed font-medium mb-4">Founder Story</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">A Sri Lankan Software Studio Focused on Practical Business Growth</h2>
          <p className="text-gray-300 mb-5">
            DexLanka Software Solutions is based in Homagama and helps Sri Lankan SMEs and international startups build websites,
            software systems, dashboards, and app experiences that are clear, usable, and supportable.
          </p>
          <p className="text-gray-300">
            The team focuses on modern technologies, business-first planning, responsive design, SEO structure, and ongoing maintenance so
            clients can keep improving after launch.
          </p>
        </div>
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6">Business Details</h3>
          <div className="space-y-5">
            <div className="flex gap-3">
              <MapPin className="text-dexRed shrink-0 mt-1" size={20} />
              <span className="text-gray-300">{BUSINESS_INFO.location}</span>
            </div>
            <div className="flex gap-3">
              <Phone className="text-dexRed shrink-0 mt-1" size={20} />
              <a href={`tel:${BUSINESS_INFO.phoneHref}`} className="text-gray-300 hover:text-white">
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <div className="flex gap-3">
              <Mail className="text-dexRed shrink-0 mt-1" size={20} />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-gray-300 hover:text-white">
                {BUSINESS_INFO.email}
              </a>
            </div>
            <div className="flex gap-3">
              <Clock className="text-dexRed shrink-0 mt-1" size={20} />
              <span className="text-gray-300">{BUSINESS_INFO.hours}</span>
            </div>
            <p className="text-gray-500 text-sm">Business registration details can be added here once confirmed by the client.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const SupportPromiseSection = () => (
  <section className="section-padding bg-darkBlue">
    <div className="container mx-auto px-6">
      <div className="glass p-8 md:p-12 rounded-2xl max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <ShieldCheck className="text-dexRed shrink-0" size={44} />
          <div>
            <h2 className="text-3xl font-bold mb-4">Maintenance and Support Promise</h2>
            <p className="text-gray-300">
              After launch, DexLanka can help with updates, backups, improvements, hosting monitoring, bug fixes,
              content changes, and ongoing technical support.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const MaintenancePlansSection = () => {
  const { currency, setCurrency, countryCode, isDetected } = useCurrency();

  return (
    <section className="section-padding bg-darkBlue">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Maintenance"
          title="Monthly Website and Software Support"
          description="Support plans help keep websites, stores, and business systems updated after launch."
        />
        <CurrencySwitcher currency={currency} setCurrency={setCurrency} countryCode={countryCode} isDetected={isDetected} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {maintenancePlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`glass rounded-2xl p-6 h-full min-w-0 ${plan.isPopular ? 'border-dexRed shadow-[0_0_40px_rgba(239,68,68,0.18)]' : ''}`}
            >
              {plan.isPopular && <Badge className="bg-dexRed text-white mb-4">Popular</Badge>}
              <h3 className="text-xl font-bold mb-3">{plan.title}</h3>
              <p className="text-dexRed font-semibold mb-5 leading-tight">{getCurrencyPrice(plan, currency)}</p>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-dexRed mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={getWhatsAppUrl(whatsappMessages.maintenance)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            <MessageCircle size={18} className="mr-2 shrink-0" />
            Need website support every month?
          </a>
        </div>
      </div>
    </section>
  );
};

export const FacebookVsWebsiteSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Website vs Facebook"
        title="Why Your Business Needs a Website, Not Only a Facebook Page"
        description="Social media is useful, but your website gives your business stronger trust, search visibility, and control."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {['Professional trust', 'Google visibility', 'Full control', 'Better service/product presentation', 'WhatsApp lead capture', 'SEO traffic', 'Online portfolio', 'Long-term brand value'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="glass rounded-2xl p-6"
          >
            <CheckCircle className="text-dexRed mb-4" size={24} />
            <h3 className="font-semibold">{item}</h3>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/website-development-sri-lanka"
          className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-dexRed text-white text-center font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
        >
          Turn your Facebook page into a professional website
          <ArrowRight size={16} className="ml-2 shrink-0" />
        </Link>
      </div>
    </div>
  </section>
);

export const WhoWeHelpSection = () => {
  const industries = [
    { name: 'Restaurants & Cafes', path: '/restaurant-websites' },
    { name: 'Retail Shops', path: '/shop-websites' },
    { name: 'Clothing Stores', path: '/shop-websites' },
    { name: 'Mobile Phone Shops', path: '/shop-websites' },
    { name: 'Clinics', path: '/clinic-websites' },
    { name: 'Salons', path: '/salon-websites' },
    { name: 'Hotels & Villas', path: '/hotel-booking-website-sri-lanka' },
    { name: 'Travel Agencies', path: '/travel-agency-websites' },
    { name: 'Startups', path: '/startup-web-app-development' },
    { name: 'Personal Brands', path: '/personal-brand-websites' },
    { name: 'Service Businesses', path: '/website-development-sri-lanka' },
    { name: 'Import/Export Businesses', path: '/custom-software-development-sri-lanka' },
  ];

  return (
    <section className="section-padding bg-darkBlue">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Who We Help"
          title="Websites and Software for Specific Business Types"
          description="DexLanka builds practical digital systems for Sri Lankan SMEs and international startups."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {industries.map((industry) => (
            <Link key={industry.name} to={industry.path} className="glass rounded-2xl px-4 py-6 text-center text-gray-300 font-medium hover:text-white hover:border-dexRed/50 transition-colors">
              {industry.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FreeAuditSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-6">
      <div className="glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <span className="inline-block text-xl text-dexRed font-medium mb-4">Free Audit</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get a Free Website Audit</h2>
            <p className="text-gray-300 mb-6">
              Share your current website or Facebook page and DexLanka will review the biggest opportunities for clarity, trust, SEO, speed, and WhatsApp lead capture.
            </p>
            <a
              href={getWhatsAppUrl(whatsappMessages.audit)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
            >
              <MessageCircle size={18} className="mr-2 shrink-0" />
              Request Free Audit
            </a>
          </div>
          <form
            className="space-y-4 min-w-0"
            action={`mailto:${BUSINESS_INFO.email}`}
            method="post"
            encType="text/plain"
            onSubmit={() => {
              trackEvent('free_audit_submit', { location: 'free_audit_section' });
            }}
          >
            {[
              { name: 'Business name', placeholder: 'Business name' },
              { name: 'Current website/Facebook page', placeholder: 'Website or Facebook URL' },
              { name: 'WhatsApp number', placeholder: '+94...' },
              { name: 'Business type', placeholder: 'Restaurant, shop, clinic, startup...' },
            ].map((field) => (
              <label key={field.name} className="block">
                <span className="sr-only">{field.name}</span>
                <input
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
                />
              </label>
            ))}
            <label className="block">
              <span className="sr-only">What they want to improve</span>
              <textarea
                name="What they want to improve"
                placeholder="What do you want to improve?"
                rows={4}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed resize-none"
              />
            </label>
            <button type="submit" className="w-full px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
              Request Free Audit
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export const ServiceAreasSection = () => (
  <section className="py-16 bg-darkBlue">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Service Areas"
        title="Local Support Across Sri Lanka"
        description="DexLanka supports clients near Homagama and across Sri Lanka, with remote collaboration available for international projects."
      />
      <div className="flex flex-wrap gap-3 justify-center">
        {serviceAreas.map((area) => (
          <span key={area} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300">
            {area}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export const RelatedServiceLinks = ({ paths }: { paths: string[] }) => {
  if (!paths.length) return null;

  const labels = paths.map((path) => ({
    path,
    label: path
      .replace('/', '')
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  }));

  return (
    <div className="flex flex-wrap gap-3">
      {labels.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="inline-flex max-w-full items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-dexRed/50 transition-colors"
        >
          <span className="truncate sm:whitespace-normal">{item.label}</span>
          <ExternalLink size={14} className="ml-2 shrink-0" />
        </Link>
      ))}
    </div>
  );
};

export const FinalCTA = ({
  title = "Tell us your project idea. We'll reply within 24 hours.",
  description = 'Share what you want to build and DexLanka will help you plan the next step.',
  primaryLabel = 'Talk to DexLanka on WhatsApp',
  secondaryLabel = 'Contact Form',
  whatsappMessage,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  whatsappMessage?: string;
}) => (
  <section className="py-24 bg-gradient-to-b from-background to-darkBlue">
    <div className="container mx-auto px-6">
      <div className="glass p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppUrl(whatsappMessage || whatsappMessages.homepage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            <MessageCircle size={18} className="mr-2 shrink-0" />
            {primaryLabel}
          </a>
          <Link
            to="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export const StickyWhatsApp = () => {
  const { pathname } = useLocation();
  const message =
    pathname.includes('restaurant')
      ? whatsappMessages.restaurant
      : pathname.includes('ecommerce') || pathname.includes('shop')
        ? whatsappMessages.ecommerce
        : pathname.includes('pos') || pathname.includes('inventory')
          ? whatsappMessages.pos
          : pathname.includes('mobile-app')
            ? whatsappMessages.mobile
            : pathname.includes('react') || pathname.includes('saas') || pathname.includes('dashboard') || pathname.includes('startup')
              ? whatsappMessages.international
              : pathname.includes('website') || pathname === '/'
                ? whatsappMessages.website
                : whatsappMessages.homepage;

  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Talk to DexLanka on WhatsApp"
      className="fixed right-4 bottom-24 md:bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-dexRed text-white shadow-[0_10px_30px_rgba(234,56,76,0.45)] hover:bg-red-600 transition-colors"
    >
      <MessageCircle size={26} />
    </a>
  );
};
