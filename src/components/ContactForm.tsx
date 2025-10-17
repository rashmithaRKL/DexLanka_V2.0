
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { submitContactForm } from '@/lib/api';
import { generateMailtoLink } from '@/lib/emailService';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      
      // Check if it's an EmailJS configuration error
      if (errorMessage.includes('EmailJS not configured')) {
        toast({
          title: "Message Saved Successfully!",
          description: "Your message was saved but email setup is needed. We'll contact you soon.",
          action: (
            <button
              onClick={() => {
                const mailtoLink = generateMailtoLink(formData);
                window.open(mailtoLink, '_blank');
              }}
              className="flex items-center gap-2 px-3 py-2 bg-dexRed text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <Mail size={16} />
              Send Email
            </button>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden shadow-soft p-8 w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
            placeholder="Your phone number (optional)"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
          >
            <option value="" disabled>Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Project Request">Project Request</option>
            <option value="Support">Technical Support</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed resize-none"
            placeholder="Your message..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-dexRed text-white font-medium rounded-lg flex items-center justify-center transition-transform hover:translate-y-[-2px] active:translate-y-[0px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={16} className="ml-2" />
            </>
          )}
        </button>
      </form>
      
    </motion.div>
  );
};

export default ContactForm;
