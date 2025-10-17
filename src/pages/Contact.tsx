import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Contact Us"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Let's Work Together"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="Have a project in mind or questions about our services? We're here to help. Reach out to us and let's start a conversation."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/3 space-y-8"
            >
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-dexRed/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-dexRed" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">Our Office</h3>
                      <p className="text-gray-300">
                        Meegoda,<br />
                        Homagama,<br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-dexRed/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-dexRed" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-300">
                        <a href="tel:+94705588789" className="hover:text-white transition-colors">
                          +94 70 558 8789
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-dexRed/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-dexRed" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-300">
                        <a href="mailto:dexlanka@gmail.com" className="hover:text-white transition-colors">
                        dexlanka@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-dexRed/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-dexRed" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">Working Hours</h3>
                      <p className="text-gray-300">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-semibold mb-6">Connect With Us</h2>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-dexRed/10 flex items-center justify-center text-dexRed hover:bg-dexRed hover:text-white transition-colors"
                      aria-label={social}
                    >
                      <i className={`fab fa-${social}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:w-2/3"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl overflow-hidden h-[400px] relative">
            {/* Map Loading State */}
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-darkBlue/50 backdrop-blur-sm z-10">
                <div className="text-center">
                  <span className="block text-xl mb-2">Loading Map...</span>
                  <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              </div>
            )}
 {/* Google Map Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.481628908141!2d80.04007767570593!3d6.832710419491383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2530001cfb671%3A0xc8c24530ce10d8e6!2sDexLanka%20Software%20Solution!5e0!3m2!1sen!2slk!4v1760389243966!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="transition-opacity duration-300"
              onLoad={() => setMapLoaded(true)}
              title="DexLanka Office Location"
            ></iframe>

            {/* Map Location Pin */}
            <div className="absolute top-4 right-4">
              <a
                href="https://maps.app.goo.gl/J41wNq3bRQJ1QLFL6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-dexRed text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm hover:bg-red-600 transition-colors"
              >
                <span>View Larger Map</span>
                <ExternalLink size={14} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xl text-dexRed font-medium mb-4">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-300">
              Find answers to common questions about our contact and consultation process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'How soon can I expect a response?',
                answer: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please call our office directly.'
              },
              {
                question: 'Do you offer free consultations?',
                answer: 'Yes, we provide a free 30-minute initial consultation to discuss your project requirements and how we can help.'
              },
              {
                question: 'Can we meet in person?',
                answer: 'Absolutely! We welcome in-person meetings at our office. Please schedule an appointment in advance so we can prepare for your visit.'
              },
              {
                question: 'Do you work with international clients?',
                answer: 'Yes, we work with clients globally. We use video conferencing and project management tools to ensure smooth communication across different time zones.'
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
