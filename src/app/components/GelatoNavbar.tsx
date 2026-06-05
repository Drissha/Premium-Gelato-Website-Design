import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useOrderModal } from "../components/useOrderModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
// @ts-ignore
import logo from '../../assets/images/logo.png';

export function GelatoNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { openModal } = useOrderModal();

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
  const productsLinks = [
    { label: 'All Products', to: '/products' },
    { label: 'Gelato', to: '/gelato' },
    { label: 'Pastry', to: '/pastry' },
  ];
  const [isProductsMobileOpen, setIsProductsMobileOpen] = useState(false);

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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-red-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative inline-flex items-center gap-1 text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group">
                  Products
                  <ChevronDown size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-red-200 group-hover:w-full transition-all duration-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-48 border-pink-100 bg-white/95 backdrop-blur-xl shadow-xl shadow-pink-100/40">
                {productsLinks.map((item) => (
                  <DropdownMenuItem key={item.to} asChild className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700 focus:bg-pink-50 focus:text-pink-400">
                    <Link to={item.to}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/about"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-red-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/locations"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              Locations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-red-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/blogs"
              className="relative text-gray-700 hover:text-pink-300 transition-all duration-300 font-medium group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-200 to-red-200 group-hover:w-full transition-all duration-300" />
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-reguler via-pink-200 to-pink-reguler bg-[length:200%_100%] hover:bg-right text-gray-700 px-6 lg:px-8 py-3 rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/60 transition-all duration-300"
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
                  { label: 'About', to: '/about' },
                  { label: 'Locations', to: '/locations' },
                  { label: 'Blog', to: '/blogs' },
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
                <div className="pt-1">
                  <button
                    className="flex w-full items-center justify-between text-gray-700 hover:text-pink-300 transition-colors font-medium py-2"
                    onClick={() => setIsProductsMobileOpen((current) => !current)}
                  >
                    <span>Products</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isProductsMobileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isProductsMobileOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 overflow-hidden"
                      >
                        {productsLinks.map((item, idx) => (
                          <motion.div
                            key={item.to}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              to={item.to}
                              className="text-gray-600 hover:text-pink-300 transition-colors font-medium py-2 block"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-reguler via-red-200 to-pink-200 text-gray-700 px-6 py-3 rounded-full shadow-lg mt-2"
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
