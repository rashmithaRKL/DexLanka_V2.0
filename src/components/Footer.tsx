import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl, whatsappMessages } from '@/data/site';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/gallery' },
    { name: 'Packages', path: '/packages' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const localServices = [
    { name: 'Website Development', path: '/website-development-sri-lanka' },
    { name: 'E-Commerce Development', path: '/ecommerce-website-development-sri-lanka' },
    { name: 'Mobile App Development', path: '/mobile-app-development-sri-lanka' },
    { name: 'POS System', path: '/pos-system-sri-lanka' },
    { name: 'Inventory System', path: '/inventory-management-system-sri-lanka' },
    { name: 'Custom Software', path: '/custom-software-development-sri-lanka' },
    { name: 'UI/UX Design', path: '/services' },
    { name: 'Website Maintenance', path: '/packages' },
  ];

  const industryLinks = [
    { name: 'Restaurant Websites', path: '/restaurant-websites' },
    { name: 'Shop Websites', path: '/shop-websites' },
    { name: 'Salon Websites', path: '/salon-websites' },
    { name: 'Clinic Websites', path: '/clinic-websites' },
    { name: 'Travel Agency Websites', path: '/travel-agency-websites' },
    { name: 'Personal Brand Websites', path: '/personal-brand-websites' },
  ];

  const internationalServices = [
    { name: 'React + Supabase Agency', path: '/react-supabase-development-agency' },
    { name: 'SaaS MVP Development', path: '/saas-mvp-development' },
    { name: 'Admin Dashboards', path: '/admin-dashboard-development' },
    { name: 'Laravel to React Migration', path: '/laravel-to-react-migration' },
    { name: 'Startup Web Apps', path: '/startup-web-app-development' },
    { name: 'Hire React Developer', path: '/hire-react-developer-sri-lanka' },
  ];

  const renderLinks = (links: Array<{ name: string; path: string }>) => (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link to={link.path} className="text-gray-400 hover:text-white transition-colors inline-flex min-w-0 items-center group">
            <ArrowRight size={14} className="mr-2 text-dexRed transition-transform group-hover:translate-x-1" />
            <span className="break-words">{link.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="bg-darkBlue pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          <div className="space-y-6 min-w-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="dex-span">Dex</span>
                <span className="lanka-span">Lanka</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              DexLanka Software Solutions builds modern websites, e-commerce stores, mobile apps, POS systems, inventory systems,
              and custom business software for Sri Lankan businesses and international startups.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61574091291394" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-dexRed transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/dexlanka" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-dexRed transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/dex_lanka/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-dexRed transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@Rashmitha_RK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-dexRed transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            {renderLinks(quickLinks)}
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-lg mb-6">Local Services</h3>
            {renderLinks(localServices)}
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-lg mb-6">Industry Links</h3>
            {renderLinks(industryLinks)}
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-lg mb-6">International Services</h3>
            {renderLinks(internationalServices)}
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin size={20} className="text-dexRed shrink-0 mt-1 mr-3" />
                <span className="text-gray-400 break-words">{BUSINESS_INFO.location}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-dexRed shrink-0 mr-3" />
                <a href={`tel:${BUSINESS_INFO.phoneHref}`} className="text-gray-400 hover:text-white transition-colors break-words">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle size={20} className="text-dexRed shrink-0 mr-3" />
                <a href={getWhatsAppUrl(whatsappMessages.homepage)} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-dexRed shrink-0 mr-3" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-gray-400 hover:text-white transition-colors break-words">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">&copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-gray-500 hover:text-white transition-colors">
                Terms / Refund / Cancellation
              </Link>
              <a href="/sitemap.xml" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
