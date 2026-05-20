import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const bestSellers = [
  {
    id: 1,
    name: 'Pistachio Siciliano',
    description: 'Premium Sicilian pistachios with a touch of honey',
    image: 'https://images.unsplash.com/photo-1571990925439-2b6072445908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    rating: 4.9,
    price: '$7.50',
    color: 'from-green-200 to-emerald-300',
  },
  {
    id: 2,
    name: 'Fragola Fresca',
    description: 'Fresh strawberries with vanilla bean swirls',
    image: 'https://images.unsplash.com/photo-1602532769069-0e856a643e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    rating: 5.0,
    price: '$6.50',
    color: 'from-pink-reguler to-rose-300',
  },
  {
    id: 3,
    name: 'Cioccolato Noir',
    description: 'Rich Belgian dark chocolate blend',
    image: 'https://images.unsplash.com/photo-1588685232180-8bb64cb4837a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    rating: 4.8,
    price: '$6.50',
    color: 'from-amber-200 to-orange-300',
  },
  {
    id: 4,
    name: 'Limone Sorbet',
    description: 'Zesty Amalfi lemons with fresh mint',
    image: 'https://images.unsplash.com/photo-1689001896226-4bacda02550d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    rating: 4.7,
    price: '$5.50',
    color: 'from-yellow-200 to-amber-300',
  },
  {
    id: 5,
    name: 'Mango Passione',
    description: 'Tropical mango with passion fruit ripple',
    image: 'https://images.unsplash.com/photo-1587372681603-5b99f6e49cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    rating: 4.9,
    price: '$6.50',
    color: 'from-orange-200 to-yellow-300',
  },
  {
    id: 6,
    name: 'Vaniglia Classica',
    description: 'Madagascar vanilla bean with caramel notes',
    image: 'https://images.unsplash.com/photo-1587653950445-77907aa6bdd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    rating: 4.6,
    price: '$6.00',
    color: 'from-amber-200 to-yellow-200',
  },
];

export function PremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = bestSellers.length - 1;
      if (nextIndex >= bestSellers.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleItems = [
    bestSellers[currentIndex],
    bestSellers[(currentIndex + 1) % bestSellers.length],
    bestSellers[(currentIndex + 2) % bestSellers.length],
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {visibleItems.map((item, idx) => (
          <motion.div
            key={`${item.id}-${currentIndex}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group relative bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-500 hover:-translate-y-3"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Rating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-lg"
              >
                <Star size={16} fill="#FCD34D" className="text-yellow-400" />
                <span className="font-bold text-sm">{item.rating}</span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-7">
              <h3 className="font-bold text-xl lg:text-2xl mb-2 text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base mb-5 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-3xl font-extrabold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${item.color} text-white p-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <Plus size={22} strokeWidth={3} />
                </motion.button>
              </div>
            </div>

            {/* Decorative element */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
          </motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300 group"
        >
          <ChevronLeft size={24} className="text-gray-700 group-hover:text-pink-300 transition-colors" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-2.5">
          {bestSellers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="group"
            >
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-10 bg-gradient-to-r from-pink-reguler to-purple-200'
                    : 'w-2.5 bg-gray-300 group-hover:bg-pink-200'
                }`}
              />
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300 group"
        >
          <ChevronRight size={24} className="text-gray-700 group-hover:text-pink-300 transition-colors" />
        </motion.button>
      </div>
    </div>
  );
}
