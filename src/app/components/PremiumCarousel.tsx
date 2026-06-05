import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Blackforest,
  Blueberry,
  Bublegum,
  ChocoChashew,
  ChocoSorbet,
  CoffeeNut,
} from "../imageImports";
import type { NormalizedProduct } from "../lib/normalize";
// @ts-ignore
import "../../styles/globals.css";

const bestSellers = [
  {
    id: 1,
    name: "BlackForest",
    description: "Chocolate, cherries, and cream-rich, indulgent and classic",
    image: Blackforest,
    rating: 4.9,
    price: "$7.50",
    color: "from-pink-reguler via-red-200 to-red-200",
  },
  {
    id: 2,
    name: "Blueberry Cheesecake",
    description: "Tangy blueberry swirl with creamy cheesecake twist",
    image: Blueberry,
    rating: 5.0,
    price: "$6.50",
    color: "from-red-200 via-red-200 to-pink-reguler",
  },
  {
    id: 3,
    name: "Bublegum",
    description:
      "Sweet, fun, and nostalgic-just like your favorite childhood treat",
    image: Bublegum,
    rating: 4.8,
    price: "$6.50",
    color: "from-pink-reguler via-pink-reguler to-orange-200",
  },
  {
    id: 4,
    name: "Choco Chashew",
    description:
      "Creamy chocolate gelato with crunchy cashew bits for extra indulgence",
    image: ChocoChashew,
    rating: 4.7,
    price: "$5.50",
    color: "from-yellow-200 via-yellow-200 to-pink-reguler",
  },
  {
    id: 5,
    name: "Choco Sorbet",
    description:
      "A refreshing, dairy-free chocolate expreience-rich and smooth",
    image: ChocoSorbet,
    rating: 4.9,
    price: "$6.50",
    color: "from-pink-reguler via-pink-reguler to-red-200",
  },
  {
    id: 6,
    name: "Coffee Nut",
    description: "Bold Coffee flavor paired with a nutty crunch in every scoop",
    image: CoffeeNut,
    rating: 4.6,
    price: "$6.00",
    color: "from-red-200 via-red-200 to-pink-reguler",
  },
];

type PremiumCarouselProps = {
  items?: NormalizedProduct[];
};

const fallbackColors = [
  "from-pink-reguler via-red-200 to-red-200",
  "from-red-200 via-red-200 to-pink-reguler",
  "from-pink-reguler via-pink-reguler to-orange-200",
  "from-yellow-200 via-yellow-200 to-pink-reguler",
  "from-pink-reguler via-pink-reguler to-red-200",
  "from-red-200 via-red-200 to-pink-reguler",
];

export function PremiumCarousel({ items }: PremiumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const carouselItems =
    items && items.length > 0
      ? items.map((item, index) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          rating: item.rating,
          color: fallbackColors[index % fallbackColors.length],
        }))
      : bestSellers;

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [carouselItems.length]);

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
      if (nextIndex < 0) nextIndex = carouselItems.length - 1;
      if (nextIndex >= carouselItems.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    if (carouselItems.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const visibleItems = [
    carouselItems[currentIndex],
    carouselItems[(currentIndex + 1) % carouselItems.length],
    carouselItems[(currentIndex + 2) % carouselItems.length],
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 h-fit md:grid-cols-3 gap-6 lg:gap-8">
        {visibleItems.map((item, idx) => (
          <motion.div
            key={`${item.id}-${currentIndex}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group relative rounded-[2rem] items-center overflow-hidden transition-all duration-500 hover:-translate-y-3"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] items-center md:h-[60%] sm:h-[30%] w-full overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full rounded-[2rem] h-90 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 transition-opacity duration-500" />

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
            <div className="p-6 lg:p-7 flex flex-col items-center text-center">
              <h3 className="font-bold text-xl text-blue-reguler lg:text-2xl mb-2 text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base mb-5 leading-relaxed">
                {item.description}
              </p>

              {/* <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-extrabold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                >
                  {item.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${item.color} text-white p-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <Plus size={22} strokeWidth={3} />
                </motion.button>
              </div> */}
            </div>

            {/* Decorative element */}
            <div
              className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300 group"
        >
          <ChevronLeft
            size={24}
            className="text-gray-700 group-hover:text-pink-300 transition-colors"
          />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-2.5">
          {carouselItems.map((_, idx) => (
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
                    ? "w-10 bg-gradient-to-r from-pink-reguler to-red-200"
                    : "w-2.5 bg-gray-300 group-hover:bg-pink-200"
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
          <ChevronRight
            size={24}
            className="text-gray-700 group-hover:text-pink-300 transition-colors"
          />
        </motion.button>
      </div>
    </div>
  );
}
