import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Star, Plus } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = ['All', 'Gelato', 'Pastry', 'Chocolate'];
const PRODUCTS_PER_PAGE = 8;

const allProducts = [
  // Gelato
  {
    id: 1,
    name: 'Strawberry Milkshake',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$7.50',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571990925439-2b6072445908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 2,
    name: 'Berry Yogurt',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free',
    price: '$6.50',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1602532769069-0e856a643e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 3,
    name: 'Unicorn',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$6.50',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1588685232180-8bb64cb4837a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 4,
    name: 'After Eight',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$6.00',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587653950445-77907aa6bdd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  // Sorbet
  {
    id: 5,
    name: 'Tiramisu Klasik',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Egg Free',
    price: '$5.50',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1689001896226-4bacda02550d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 6,
    name: 'Bubble Gum',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$6.50',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587372681603-5b99f6e49cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 7,
    name: 'Blueberry Cheesecake',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Egg Free',
    price: '$5.50',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1532678465554-94846274c297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  // Pastry
  {
    id: 8,
    name: 'Popcorn Caramel',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$8.50',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1769812343875-c40f9ec7f846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 9,
    name: 'Milky Way',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Egg Free',
    price: '$7.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1769812343628-81300c21753c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 10,
    name: 'Biscof',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Egg Free',
    price: '$6.50',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1764380746818-18c01e96df12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  // Chocolate
  {
    id: 11,
    name: 'Japanese Matcha',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$9.00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1772985809496-e2f12a22b1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 12,
    name: 'Sea Salt Caramel',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free, Egg Free',
    price: '$12.00',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1772985811111-c90aa569792b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 13,
    name: 'Vanilla Original',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free',
    price: '$7.50',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596962680524-5116314fb8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 14,
    name: 'Vanilla Almond Pralines',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Gluten Free',
    price: '$7.00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 15,
    name: 'Biscoff Cheese Cake',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Egg Free',
    price: '$7.50',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596962680524-5116314fb8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
  {
    id: 16,
    name: 'Matcha Brownie',
    category: 'Gelato',
    subcategory: 'Milk Based',
    description: 'Egg Free',
    price: '$7.00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    seasonal: false,
  },
];

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const availableSubCategories = useMemo(() => {
    const productsInCategory =
      activeCategory === 'All'
        ? allProducts
        : allProducts.filter((product) =>
            Array.isArray(product.category)
              ? product.category.includes(activeCategory)
              : product.category === activeCategory
          );

    return ['All', ...Array.from(new Set(productsInCategory.map((product) => product.subcategory).filter(Boolean)))];
  }, [activeCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => {
        if (Array.isArray(p.category)) {
          return p.category.includes(activeCategory);
        }

        return p.category === activeCategory;
      });
    }

    // Filter by sub-category
    if (activeSubCategory !== 'All') {
      filtered = filtered.filter((product) => product.subcategory === activeSubCategory);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [activeCategory, activeSubCategory, searchQuery, sortBy]);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [activeCategory, activeSubCategory, searchQuery, sortBy]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMoreProducts = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-pink-50/30 to-purple-50/30 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 text-gray-800">
            Our Premium
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              {' '}Collection
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Handcrafted Italian desserts made with love and the finest ingredients
          </p>
        </motion.section>

        {/* Search and Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 lg:mb-12 flex flex-col sm:flex-row gap-4"
        >
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for flavors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-gray-100 focus:border-pink-200 focus:outline-none transition-all text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="sm:w-64 relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-gray-100 focus:border-pink-200 focus:outline-none transition-all text-gray-700 appearance-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Category Filter Buttons */}
        <div className="flex flex-col sm:flex-row mb-8 gap-4 sm:gap-12 overflow-x-auto pb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Category</h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSubCategory('All');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 lg:px-8 py-3 lg:py-3.5 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 shadow-xl shadow-pink-200/50'
                      : 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sub Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sub Category</h2>
              
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {availableSubCategories.map((subCategory) => (
                <motion.button
                  key={subCategory}
                  onClick={() => setActiveSubCategory(subCategory)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    activeSubCategory === subCategory
                      ? 'bg-gradient-to-r from-purple-200 to-pink-200 text-gray-700 shadow-xl shadow-purple-200/50'
                      : 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {subCategory}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-gray-600"
        >
          Showing <span className="font-bold text-pink-300">{filteredProducts.length}</span> products
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery + sortBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {visibleProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Seasonal Badge */}
                  {product.seasonal && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-200 to-orange-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Seasonal
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-lg">
                    <Star size={14} fill="#FCD34D" className="text-yellow-400" />
                    <span className="font-bold text-sm">{product.rating}</span>
                  </div>

                  {/* Quick Add Button - Shows on Hover */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Plus size={20} strokeWidth={3} />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-pink-300 uppercase tracking-wider">
                      {Array.isArray(product.category)
                        ? product.category.join(' • ')
                        : product.category}
                    </span>
                    {product.subcategory && (
                      <span className="mt-2 inline-flex rounded-full bg-purple-100/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-700">
                        {product.subcategory}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Order Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🍦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </motion.div>
        )}

        {/* Show More / Show Less Button */}
        {filteredProducts.length > PRODUCTS_PER_PAGE && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setVisibleCount((current) =>
                  hasMoreProducts
                    ? Math.min(current + PRODUCTS_PER_PAGE, filteredProducts.length)
                    : PRODUCTS_PER_PAGE
                )
              }
              className="bg-white/80 backdrop-blur-md text-gray-700 px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200"
            >
              {hasMoreProducts ? 'Show More' : 'Show Less'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
