
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkBlue pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="dex-span">Dex</span>
                <span className="lanka-span">Lanka</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Premium software solutions tailored to your business needs. We build digital experiences that transform companies.
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

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Packages', path: '/packages' },
                { name: 'Contact', path: '/contact' },
                { name: 'Terms and Conditions', path: '/terms-and-conditions' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <ArrowRight size={14} className="mr-2 text-dexRed transition-transform group-hover:translate-x-1" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Web Development',
                'Mobile Apps',
                'UI/UX Design',
                'E-Commerce',
                'Desktop Applications',
                'Digital Marketing',
              ].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                    <ArrowRight size={14} className="mr-2 text-dexRed transition-transform group-hover:translate-x-1" />
                    <span>{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin size={20} className="text-dexRed shrink-0 mt-1 mr-3" />
                <span className="text-gray-400">
                  Meegoda, Homagama, Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-dexRed shrink-0 mr-3" />
                <a href="tel:+94123456789" className="text-gray-400 hover:text-white transition-colors">
                  +94 70 558 8789
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-dexRed shrink-0 mr-3" />
                <a href="mailto:info@dexlanka.com" className="text-gray-400 hover:text-white transition-colors">
                  info@dexlanka.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">
              &copy; {currentYear} DexLanka. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms-and-conditions" className="text-gray-500 hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
