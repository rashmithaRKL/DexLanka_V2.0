import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Home, Package, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useUserAuth } from '@/context/UserAuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    // { name: 'Project', path: '/project-view' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Packages', path: '/packages' },
    { name: 'Templates', path: '/templates' },
    { name: 'Contact', path: '/contact' },
  ];

  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const { isAuthenticated, user } = useUserAuth();

  const bottomNavItems = useMemo(
    () => [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Services', path: '/services', icon: Briefcase },
      { name: 'Packages', path: '/packages', icon: Package },
      { name: 'Cart', path: '/cart', icon: ShoppingCart },
      {
        name: isAuthenticated ? 'Profile' : 'Sign In',
        path: isAuthenticated ? '/profile' : '/signin',
        icon: User,
      },
    ],
    [isAuthenticated]
  );

  const isPathActive = (targetPath: string) => {
    if (targetPath === '/') return location.pathname === '/';
    return location.pathname.startsWith(targetPath);
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <>
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="dex-span">Dex</span>
            <span className="lanka-span">Lanka</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-white hover:text-dexRed transition-colors duration-300 ease-in-out animated-underline ${location.pathname === link.path
                ? 'font-medium after:w-full'
                : 'font-normal'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="relative text-white hover:text-dexRed transition-colors duration-300"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-dexRed text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </div>
          </Link>
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-white hover:text-dexRed transition-colors duration-300"
            >
              <User size={20} />
              <span className="text-sm">{user?.full_name.split(' ')[0] || 'Profile'}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="text-white hover:text-dexRed transition-colors duration-300 text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="md:hidden text-white focus:outline-none transition-transform duration-200 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          aria-label="Toggle menu"
          {...(isOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out glass ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-white hover:text-dexRed transition-colors duration-300 py-2 ${location.pathname === link.path ? 'font-medium' : 'font-normal'
                }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="text-white hover:text-dexRed transition-colors duration-300 py-2 flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-dexRed text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="text-white hover:text-dexRed transition-colors duration-300 py-2 flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-white hover:text-dexRed transition-colors duration-300 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-dexRed transition-colors duration-300 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

    </nav>

      {/* Mobile/Tablet Bottom Navigation (App style) */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <div>
            <div className="relative bg-[#04060f]/95 backdrop-blur-xl border-t border-white/10 px-1 py-2 flex items-stretch justify-between gap-1 w-full shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
              {bottomNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isPathActive(item.path);

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(item.path);
                    }}
                    className="relative flex-1 flex flex-col items-center justify-end py-2 text-[11px] font-medium focus:outline-none"
                    aria-label={item.name}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navActiveCard"
                        className="absolute inset-0 mx-2 rounded-[20px] bg-white/5 border border-white/10"
                        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                      />
                    )}

                    <div className="relative flex flex-col items-center gap-1 z-[1]">
                      {isActive && (
                        <motion.span
                          layoutId="navActiveIcon"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-dexRed shadow-lg"
                          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        >
                          <Icon size={18} />
                        </motion.span>
                      )}
                      {!isActive && (
                        <span className="flex items-center justify-center w-10 h-10 rounded-full text-white/70">
                          <Icon size={18} />
                        </span>
                      )}
                      <span className={`${isActive ? 'text-white font-semibold' : 'text-white/60 font-medium'}`}>
                        {item.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Navbar;
