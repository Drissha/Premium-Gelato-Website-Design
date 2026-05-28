import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import logo from '../../assets/images/logo.png';

export function GelatoNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundClass = isScrolled
    ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-pink-100/50'
    : 'bg-white/80 backdrop-blur-xl shadow-xl shadow-pink-100/50 md:bg-transparent md:shadow-none md:backdrop-blur-none';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-screen top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackgroundClass}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 min-w-0"
          >
            <div className="w-auto max-w-[160px] sm:max-w-[220px] shrink-0">
              <img
                src={logo}
                alt="Gelato Logo"
                className="h-10 w-auto object-contain sm:h-14 lg:h-16"
              />
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link
              to="/"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/products"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/about"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/locations"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              Locations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 bg-[length:200%_100%] hover:bg-right text-gray-700 px-6 lg:px-8 py-3 rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/60 transition-all duration-300"
            >
              <ShoppingBag size={18} />
              <span>Order Now</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto shrink-0 text-gray-700 hover:text-pink-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 flex flex-col gap-4">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Products', to: '/products' },
                  { label: 'About', to: '/about' },
                  { label: 'Locations', to: '/locations' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      className="text-gray-700 hover:text-pink-300 transition-colors font-medium py-2 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-reguler via-purple-reguler to-purple-200 text-gray-700 px-6 py-3 rounded-full shadow-lg mt-2"
                >
                  <ShoppingBag size={18} />
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
