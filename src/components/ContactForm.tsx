
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { submitContactForm } from '@/lib/api';
import { generateMailtoLink } from '@/lib/emailService';
import { trackEvent } from '@/lib/analytics';
import { lkrBudgetOptions, usdBudgetOptions, useCurrency, type CurrencyCode } from '@/hooks/useCurrency';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    preferredContactMethod: '',
    expectedTimeline: '',
    reference: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currency, setCurrency, countryCode } = useCurrency();
  const budgetOptions = currency === 'LKR' ? lkrBudgetOptions : usdBudgetOptions;

  const handleCurrencyChange = (nextCurrency: CurrencyCode) => {
    setCurrency(nextCurrency);
    setFormData((prev) => ({ ...prev, budgetRange: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `${formData.projectType || 'Project'} Quote Request`,
      message: [
        `Business name: ${formData.businessName || 'Not provided'}`,
        `Project type: ${formData.projectType || 'Not selected'}`,
        `Budget currency: ${currency}${countryCode ? ` (${countryCode})` : ''}`,
        `Budget range: ${formData.budgetRange || 'Not selected'}`,
        `Preferred contact method: ${formData.preferredContactMethod || 'Not selected'}`,
        `Expected timeline: ${formData.expectedTimeline || 'Not selected'}`,
        `Reference image/document/link: ${formData.reference || 'Not provided'}`,
        '',
        'Message:',
        formData.message,
      ].join('\n'),
    };
    
    try {
      await submitContactForm(submissionData);
      toast({
        title: "Message sent!",
        description: "Tell us your project idea. We'll reply as soon as possible with the next steps.",
      });
      trackEvent('contact_form_submit', {
        project_type: formData.projectType || 'Not selected',
        budget_range: formData.budgetRange || 'Not selected',
        currency,
      });
      
      // Reset form
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        projectType: '',
        budgetRange: '',
        preferredContactMethod: '',
        expectedTimeline: '',
        reference: '',
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
                const mailtoLink = generateMailtoLink(submissionData);
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
    className="glass rounded-2xl overflow-hidden shadow-soft p-5 sm:p-8 w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-2">Get Free Website Quote</h2>
      <p className="text-gray-300 text-sm mb-6">
        Tell us your project idea. We'll reply as soon as possible with the next steps.
      </p>
      
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
            <label htmlFor="businessName" className="block text-sm font-medium mb-1">
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
              placeholder="Your business name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone / WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
              placeholder="+94..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium mb-1">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
            >
              <option value="" disabled>Select project type</option>
              <option value="Website">Website</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Mobile app">Mobile app</option>
              <option value="POS system">POS system</option>
              <option value="Inventory system">Inventory system</option>
              <option value="Custom software">Custom software</option>
              <option value="Branding">Branding</option>
              <option value="Website redesign">Website redesign</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="budgetRange" className="block text-sm font-medium">
                Budget Range
              </label>
              <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs">
                {(['LKR', 'USD'] as CurrencyCode[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleCurrencyChange(option)}
                    className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                      currency === option ? 'bg-dexRed text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <select
              id="budgetRange"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
            >
              <option value="">Select budget range</option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="preferredContactMethod" className="block text-sm font-medium mb-1">
              Preferred Contact Method
            </label>
            <select
              id="preferredContactMethod"
              name="preferredContactMethod"
              value={formData.preferredContactMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
            >
              <option value="">Select contact method</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone call">Phone call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div>
            <label htmlFor="expectedTimeline" className="block text-sm font-medium mb-1">
              Expected Timeline
            </label>
            <select
              id="expectedTimeline"
              name="expectedTimeline"
              value={formData.expectedTimeline}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
            >
              <option value="">Select timeline</option>
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 2-4 weeks">Within 2-4 weeks</option>
              <option value="Within 1-2 months">Within 1-2 months</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium mb-1">
            Reference Image / Document / Link (Optional)
          </label>
          <input
            id="reference"
            name="reference"
            type="text"
            value={formData.reference}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed"
            placeholder="Paste a website, Drive link, image link, or note"
          />
        </div>

        <div>
          <label htmlFor="referenceFile" className="block text-sm font-medium mb-1">
            Upload Reference Image / Document (Optional)
          </label>
          <input
            id="referenceFile"
            name="referenceFile"
            type="file"
            onChange={(event) => {
              const fileName = event.target.files?.[0]?.name;
              if (fileName) {
                setFormData((prev) => ({ ...prev, reference: prev.reference ? `${prev.reference} | Uploaded file: ${fileName}` : `Uploaded file: ${fileName}` }));
              }
            }}
            className="w-full max-w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dexRed file:mr-4 file:rounded-md file:border-0 file:bg-dexRed file:px-3 file:py-2 file:text-white"
          />
          <p className="text-gray-400 text-xs mt-2">If upload delivery is not configured, add a Google Drive or reference link above as well.</p>
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
            placeholder="Tell us about your business, project goal, required features, budget range, and timeline..."
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
              <span>Request Free Quote</span>
              <Send size={16} className="ml-2" />
            </>
          )}
        </button>
      </form>
      
    </motion.div>
  );
};

export default ContactForm;
