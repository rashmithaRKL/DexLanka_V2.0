import React from 'react';
import { Link } from 'react-router-dom';
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
  Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_INFO, packageGuidance, processSteps, serviceAreas, testimonials, trustTechnologies, whatsappUrl, whyDexLanka } from '@/data/site';
import { projectDetails } from '@/data/projects';

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

export const PackagesGuidanceSection = ({ compact = false }: { compact?: boolean }) => (
  <section className={compact ? 'py-16 bg-darkBlue' : 'section-padding bg-gradient-to-b from-background to-darkBlue'}>
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Packages"
        title="Transparent Starting Points for Common Projects"
        description="These ranges help you plan a realistic budget before the detailed scope is finalized."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {packageGuidance.map((pkg, index) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`glass rounded-2xl p-6 h-full ${pkg.isPopular ? 'border-dexRed shadow-[0_0_40px_rgba(239,68,68,0.18)]' : ''}`}
          >
            {pkg.isPopular && <Badge className="bg-dexRed text-white mb-4">Popular</Badge>}
            <h3 className="text-xl font-bold mb-3">{pkg.title}</h3>
            <p className="text-dexRed font-semibold mb-5">{pkg.price}</p>
            <ul className="space-y-3">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-gray-300">
                  <CheckCircle size={16} className="text-dexRed mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-gray-400 text-sm mt-8">
        Final price depends on features, design complexity, integrations, timeline, and support requirements.
      </p>
    </div>
  </section>
);

export const TestimonialsSection = () => (
  <section className="section-padding bg-gradient-to-b from-darkBlue to-background">
    <div className="container mx-auto px-6">
      <SectionHeading
        eyebrow="Testimonials"
        title="Client Feedback and Review Placeholders"
        description="Verified testimonials and Google reviews can be added here as they become available."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex gap-1 text-dexRed mb-5" aria-label="5 star placeholder review">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={18} className="fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-6">{testimonial.content}</p>
            <h3 className="font-semibold">{testimonial.author}</h3>
            <p className="text-gray-400 text-sm">{testimonial.position}</p>
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
        <div className="flex justify-center gap-1 text-dexRed mb-4" aria-label="Google review placeholder rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={20} className="fill-current" />
          ))}
        </div>
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
            DexLanka Software Solutions is based in Meegoda, Homagama and helps Sri Lankan SMEs and international startups build websites,
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
          className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-dexRed/50 transition-colors"
        >
          {item.label}
          <ExternalLink size={14} className="ml-2" />
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
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) => (
  <section className="py-24 bg-gradient-to-b from-background to-darkBlue">
    <div className="container mx-auto px-6">
      <div className="glass p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            <MessageCircle size={18} className="mr-2" />
            {primaryLabel}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export const StickyWhatsApp = () => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Talk to DexLanka on WhatsApp"
    className="fixed right-4 bottom-24 md:bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-dexRed text-white shadow-[0_10px_30px_rgba(234,56,76,0.45)] hover:bg-red-600 transition-colors"
  >
    <MessageCircle size={26} />
  </a>
);
