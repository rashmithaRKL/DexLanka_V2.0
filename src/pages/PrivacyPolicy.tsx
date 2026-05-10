import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { BUSINESS_INFO } from '@/data/site';
import { useSEO } from '@/hooks/useSEO';

const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy | DexLanka Software Solutions',
    description:
      'Read the DexLanka Software Solutions privacy policy for website inquiries, quote requests, contact forms, analytics, and software project communication.',
    keywords: 'DexLanka privacy policy, privacy policy Sri Lanka software company, contact form data',
    url: '/privacy-policy',
    canonical: '/privacy-policy',
    image: '/og-image.png',
    type: 'website',
  });

  const sections = [
    {
      title: 'Information We Collect',
      body:
        'DexLanka may collect your name, email address, phone number, company name, project requirements, quote details, and messages submitted through contact forms, WhatsApp links, package requests, or project inquiry flows.',
    },
    {
      title: 'How We Use Information',
      body:
        'We use submitted information to respond to inquiries, prepare project quotes, provide support, manage client communication, improve website content, and deliver requested software, website, app, or maintenance services.',
    },
    {
      title: 'Analytics and Website Improvement',
      body:
        'The website may use analytics or visitor tracking to understand page performance, popular services, conversion paths, and technical issues. This helps improve user experience, SEO, and website performance.',
    },
    {
      title: 'Data Sharing',
      body:
        'DexLanka does not sell personal information. Information may be shared with trusted tools or service providers only when needed for hosting, email delivery, project communication, payment processing, or legal compliance.',
    },
    {
      title: 'Data Security',
      body:
        'We use reasonable technical and organizational safeguards to protect submitted information. No online system can be guaranteed completely secure, but we work to keep access limited and relevant to business operations.',
    },
    {
      title: 'Your Choices',
      body:
        'You can request corrections, updates, or deletion of personal information related to your inquiry by contacting DexLanka using the official contact email below.',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy' }]} />
      <Navbar />

      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText text="Privacy Policy" animation="slide-up" className="inline-block text-xl text-dexRed font-medium mb-4" />
            <AnimatedText text="How DexLanka Handles Website and Project Information" animation="slide-up" delay={100} className="text-4xl md:text-5xl font-bold mb-6" />
            <p className="text-gray-300 text-lg">Last updated: May 10, 2026</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </div>
            ))}

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Contact for Privacy Requests</h2>
              <div className="space-y-2 text-gray-300">
                <p>{BUSINESS_INFO.name}</p>
                <p>{BUSINESS_INFO.location}</p>
                <p>
                  Email:{' '}
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-dexRed hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </p>
                <p>
                  Phone/WhatsApp:{' '}
                  <a href={`tel:${BUSINESS_INFO.phoneHref}`} className="text-dexRed hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
