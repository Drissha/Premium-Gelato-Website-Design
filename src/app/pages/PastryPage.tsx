import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Search, SlidersHorizontal, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { useOrderModal } from "../components/useOrderModal";
import { getProducts, unwrapList } from "../lib/api";
import { normalizeProduct, type NormalizedProduct } from "../lib/normalize";
import { ApiLoadingState } from "../components/ApiLoadingState";
import { BengawanCust, Brownies, Cookie, Cookie2, Cookies, Croissant } from "../imageImports";

const PRODUCTS_PER_PAGE = 8;
const PASTRY_CATEGORY = 'pastry';

const isPastryProduct = (product: NormalizedProduct) => {
  const categories = Array.isArray(product.category)
    ? product.category
    : String(product.category)
        .split(',')
        .map((category) => category.trim())
        .filter(Boolean);

  return categories.some((category) => category.toLowerCase().includes(PASTRY_CATEGORY));
};

const pastryCarouselSlides = [
  {
    id: 1,
    title: 'Brownies',
    description: 'Flaky layers, warm aroma, and that fresh-baked bakery feel.',
    image: Brownies,
    badge: 'Freshly Baked',
    accent: 'from-[#5b3b28]/70 via-[#5b3b28]/20 to-transparent',
  },
  {
    id: 2,
    title: 'Signature Cookies',
    description: 'Chewy, crisp, and made to pair perfectly with gelato.',
    image: Cookie,
    badge: 'Fan Favorite',
    accent: 'from-[#9a5b3f]/70 via-[#9a5b3f]/20 to-transparent',
  },
  {
    id: 3,
    title: 'Desert',
    description: 'A rich pastry pairing for your next gelato treat.',
    image: Cookie2,
    badge: 'Special Pick',
    accent: 'from-[#8c4d44]/70 via-[#8c4d44]/20 to-transparent',
  },
] as const;

export function PastryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { openModal } = useOrderModal();

  useEffect(() => {
    let isActive = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getProducts({
          perPage: 30,
          status: 1,
          search: searchQuery.trim(),
        });
        const items = unwrapList(response).map((product, index) => normalizeProduct(product, index));
        const pastryItems = items.filter(isPastryProduct);

        if (isActive) {
          setProducts(pastryItems);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load pastry products.');
          setProducts([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      isActive = false;
      window.clearTimeout(timer);
    };
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

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
  }, [products, searchQuery, sortBy]);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [searchQuery, sortBy]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMoreProducts = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-pink-50/30 to-purple-50/30 pt-24 pb-20">
      <div className="max-w-7xl sm:mt-20 mx-auto px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-gray-700 shadow-lg shadow-pink-100/50">
            <Star className="text-pink-300" size={16} fill="#F9A8D4" />
            Pastry Collection
          </span>
          <h1 className="mt-6 text-4xl lg:text-6xl font-extrabold mb-4 text-gray-800">
            Our Premium
            <span className="bg-gradient-to-r from-blue-reguler via-pink-reguler to-pink-200 bg-clip-text text-transparent">
              {' '}Pastry
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Freshly baked pastries, buttery layers, and sweet treats made to pair perfectly with gelato
          </p>
        </motion.section>

        <CategoryCarousel
          eyebrow="Featured Carousel"
          title="Swipe Through Our Pastry Highlights"
          description="From buttery layers to sweet bites, here’s a quick preview before you search."
          slides={pastryCarouselSlides}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 lg:mb-12 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-gray-100 focus:border-pink-200 focus:outline-none transition-all text-gray-700 placeholder-gray-400"
            />
          </div>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-gray-600"
        >
          Showing <span className="font-bold text-blue-reguler">{filteredProducts.length}</span> pastry products
        </motion.div>

        {error && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        )}

        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={searchQuery + sortBy}
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
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {product.seasonal && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-200 to-orange-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        Seasonal
                      </div>
                    )}

                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-lg">
                      <Star size={14} fill="#FCD34D" className="text-yellow-400" />
                      <span className="font-bold text-sm">{product.rating}</span>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-200 to-red-200 text-gray-700 p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Plus size={20} strokeWidth={3} />
                    </motion.button>
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-center">
                      <span className="text-xs font-semibold text-blue-reguler uppercase tracking-wider">
                        Pastry
                      </span>
                      {product.subcategory && (
                        <span className="mt-2 ms-auto inline-flex rounded-full bg-blue-100/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-reguler">
                          {product.subcategory}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="text-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openModal}
                        className="cursor-pointer bg-gradient-to-r from-pink-200 via-pink-reguler to-rose-200 text-gray-700 px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {loading && (
          <div className="mb-8">
            <div className="w-full max-w-7xl">
              <ApiLoadingState
                title="Loading pastry"
                message="Fetching the latest pastry catalog..."
                cards={8}
                lines={0}
              />
            </div>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🍰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No pastry found</h3>
            <p className="text-gray-600">Try adjusting your search query</p>
          </motion.div>
        )}

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
