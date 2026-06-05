import { FloatingGelatoShapes } from "../components/FloatingGelatoShapes";
import { PremiumCarousel } from "../components/PremiumCarousel";
import { FloatingIceCreamIcon } from "../components/FloatingIceCreamIcon";
import { ApiLoadingState } from "../components/ApiLoadingState";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  IceCream,
  Cake,
  Candy,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Users,
  Heart,
  Clock,
  Check,
  Lightbulb,
  BadgeCheck,
  Image,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { getLocations, getProducts, getPromotions, unwrapList, unwrapNestedList } from "../lib/api";
import { Gelato, Cookies, Choco, Our, logo, Bengawan, Braga, Tsm, Villagio } from "../imageImports";
import { normalizeLocation, normalizeProduct, normalizePromotion, type NormalizedLocation, type NormalizedProduct, type NormalizedPromotion } from "../lib/normalize";
// @ts-ignore
import "../../styles/globals.css";
import { Link } from "react-router";

const HERO_ROTATION_MS = 4500;
const PROMOTION_IMAGE_KEYS = [
  "image",
  "image_url",
  "thumbnail",
  "thumbnail_url",
  "photo",
  "cover_image",
  "cover",
  "banner",
  "banner_image",
  "images",
  "promo_image",
  "hero_image",
  "file",
  "path",
  "url",
];

const buildDirectionLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const resolveLocationImage = (store: NormalizedLocation, fallbackIndex = 0) => {
  const key = `${store.name} ${store.city} ${store.area}`.toLowerCase();

  if (key.includes("bengawan")) return Bengawan;
  if (key.includes("braga")) return Braga;
  if (key.includes("smb") || key.includes("summarecon") || key.includes("bekasi")) return Villagio;
  if (key.includes("villagio") || key.includes("villaggio") || key.includes("karawang")) return Villagio;

  const fallbackImages = [Tsm, Bengawan, Villagio];
  return fallbackImages[fallbackIndex % fallbackImages.length];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const extractPromotionRecords = (value: unknown, depth = 0, records: Record<string, unknown>[] = []): Record<string, unknown>[] => {
  if (depth > 4) {
    return records;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => extractPromotionRecords(item, depth + 1, records));
    return records;
  }

  if (!isRecord(value)) {
    return records;
  }

  const hasImageField = PROMOTION_IMAGE_KEYS.some((key) => {
    const candidate = value[key];
    if (typeof candidate === "string") {
      return candidate.trim().length > 0;
    }

    if (Array.isArray(candidate)) {
      return candidate.some((item) => typeof item === "string" && item.trim().length > 0);
    }

    return false;
  });

  if (hasImageField) {
    records.push(value);
  }

  Object.values(value).forEach((candidate) => {
    if (Array.isArray(candidate) || isRecord(candidate)) {
      extractPromotionRecords(candidate, depth + 1, records);
    }
  });

  return records;
};

const dedupePromotionRecords = (records: Record<string, unknown>[]) => {
  const seen = new Set<string>();

  return records.filter((record) => {
    const key = String(
      record.id ??
      record.slug ??
      record.image ??
      record.image_url ??
      record.banner ??
      record.banner_image ??
      record.title ??
      record.name ??
      ""
    );

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

export default function App() {
  const [promotionSlides, setPromotionSlides] = useState<NormalizedPromotion[]>([]);
  const [fanFavoriteProducts, setFanFavoriteProducts] = useState<NormalizedProduct[]>([]);
  const [homepageLocations, setHomepageLocations] = useState<NormalizedLocation[]>([]);
  const [loadingPromotions, setLoadingPromotions] = useState(true);
  const [loadingFanFavorites, setLoadingFanFavorites] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadPromotions = async () => {
      setLoadingPromotions(true);

      try {
        const response = await getPromotions();
        const listItems = unwrapNestedList(response);
        const directItems = extractPromotionRecords(response);
        const sourceItems = dedupePromotionRecords(
          directItems.length > 0
            ? directItems
            : listItems.filter(isRecord)
        );
        const items = sourceItems.map((promotion, index) => normalizePromotion(promotion, index));
        const validItems = items.filter((item) => Boolean(item.image));

        if (isActive && validItems.length > 0) {
          setPromotionSlides(validItems);
          setActiveSlideIndex(0);
        }
      } catch {
        if (isActive) {
          setPromotionSlides([]);
          setActiveSlideIndex(0);
        }
      } finally {
        if (isActive) {
          setLoadingPromotions(false);
        }
      }
    };

    loadPromotions();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadLocations = async () => {
      setLoadingLocations(true);

      try {
        const response = await getLocations();
        const items = unwrapList(response)
          .map((location, index) => normalizeLocation(location, index))
          .slice(0, 3);

        if (isActive) {
          setHomepageLocations(items);
        }
      } catch {
        if (isActive) {
          setHomepageLocations([]);
        }
      } finally {
        if (isActive) {
          setLoadingLocations(false);
        }
      }
    };

    loadLocations();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadFanFavorites = async () => {
      setLoadingFanFavorites(true);

      try {
        const response = await getProducts({
          perPage: 20,
          status: 1,
          search: "",
        });

        const items = unwrapList(response)
          .map((product, index) => normalizeProduct(product, index))
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);

        if (isActive) {
          setFanFavoriteProducts(items);
        }
      } catch {
        if (isActive) {
          setFanFavoriteProducts([]);
        }
      } finally {
        if (isActive) {
          setLoadingFanFavorites(false);
        }
      }
    };

    loadFanFavorites();

    return () => {
      isActive = false;
    };
  }, []);

  const heroSlides = useMemo(
    () => promotionSlides,
    [promotionSlides]
  );

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % heroSlides.length);
    }, HERO_ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-pink-50/30 to-pink-reguler/30">

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20"
      >
        <FloatingGelatoShapes />

        {/* Floating Ice Cream Illustrations */}
        <FloatingIceCreamIcon
          delay={0.5}
          className="absolute top-32 right-12 hidden lg:block opacity-20 hover:opacity-40 transition-opacity"
        />
        <FloatingIceCreamIcon
          delay={0.8}
          className="absolute bottom-32 left-16 hidden lg:block opacity-15 hover:opacity-30 transition-opacity scale-75"
        />
        <FloatingIceCreamIcon
          delay={1.1}
          className="absolute top-1/2 right-1/4 hidden xl:block opacity-10 hover:opacity-25 transition-opacity scale-50"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg shadow-pink-100/50 mb-6"
            >
              <Sparkles className="text-pink-300" size={18} />
              <span className="text-sm font-semibold text-gray-700">
                Hapiness in every scoop!!!
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 lg:mb-8 leading-[1.1] tracking-tight">
              Let's Go
              <br />
              <span className="bg-gradient-to-r from-blue-reguler via-red-200 to-pink-reguler bg-clip-text text-transparent">
                Gelato!
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Scoop up happiness with every bite of our Gelato crafted with love
              and the finest ingredients.authentic flavors that will have you
              smiling from the first spoonful to the last. It's all about fun,
              flavor, and indulging in a little cup of joy!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer bg-gradient-to-r from-blue-reguler via-pink-200 to-pink-reguler bg-[length:200%_100%] hover:bg-right text-gray-700 px-8 lg:px-10 py-4 lg:py-5 rounded-full text-base lg:text-lg font-bold shadow-2xl shadow-pink-200/50 hover:shadow-pink-300/60 transition-all duration-500"
                >
                    Our Products
                </motion.button>
            </Link>
            <Link to="/locations">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-white/80 backdrop-blur-md text-gray-700 px-8 lg:px-10 py-4 lg:py-5 rounded-full text-base lg:text-lg font-bold hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border-2 border-gray-100 hover:border-pink-200"
              >
                Find Store
              </motion.button>
            </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 lg:mt-16"
            >
              {[
                { icon: Check, label: "Halal Certified" },
                { icon: Lightbulb, label: "Local Unique Flavors" },
                { icon: BadgeCheck, label: "High Quality Local Ingredients" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-reguler to-pink-200 mb-2 shadow-lg">
                    <stat.icon className="text-pink-300" size={20} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-pink-200/50">
              <div className="relative w-full h-[500px] lg:h-[650px]">
                {loadingPromotions ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <ApiLoadingState
                      title="Loading promotions"
                      message="Fetching hero banners..."
                      cards={1}
                      lines={0}
                    />
                  </div>
                ) : heroSlides.length > 0 ? (
                  heroSlides.map((slide, index) => {
                    const isActive = index === activeSlideIndex;

                    return (
                      <motion.div
                        key={slide.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.02 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      >
                        <ImageWithFallback
                          src={slide.image}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-white/40 to-blue-100/40" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-pink-reguler/10 via-transparent to-pink-200/10" />
            </div>

            {/* Floating Badge - 100% Natural */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-pink-200/50 max-w-[200px]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-pink-reguler to-pink-200 rounded-2xl p-3.5">
                  <Sparkles className="text-pink-300" size={28} />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-gray-800">
                    High Quality
                  </p>
                  <p className="text-gray-600 text-sm">Ingredients</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge - Fresh Daily */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-pink-200/50"
            >
              <div className="text-center">
                <div className="bg-gradient-to-br from-pink-reguler to-blue-200 rounded-2xl p-3 mb-2 inline-block">
                  <Clock className="text-pink-300" size={24} />
                </div>
                <p className="font-extrabold text-sm text-gray-800">
                  Fresh Daily
                </p>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-pink-reguler/30 to-pink-200/30 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-gradient-to-br from-blue-reguler/30 to-cyan-200/30 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="flavors" className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-blue-300 tracking-wider uppercase mb-4">
              Premium Selection
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              OUR PRODUCTS
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our premium selection of desserts crafted with passion
            </p>
          </motion.div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-6">
            {[
              {
                icon: IceCream,
                title: "Gelato",
                description:
                  "Scoop up happiness with every bite of our Gelato Cups, made with the freshest milk for that irresistibly smooth and creamy texture. Packed with natural ingredients, each cup is bursting with pure, authentic flavors that will have you smiling from the first spoonful to the last.",
                image: Gelato,
                gradient: "from-blue-reguler via-blue-200 to-rose-200",
                shadowColor: "shadow-pink-200/50",
              },
              {
                icon: Cake,
                title: "Pastry",
                description:
                  "Get ready for a bite of pure happiness with our delicious mix of cookies, croissants, and other delightful pastries! From the buttery, flaky goodness of our croissants to the sweet crunch of our cookies, every bite is a celebration of flavor. Perfect for sharing (or keeping all to yourself).",
                image: Cookies,
                gradient:
                  "from-pink-200 via-pink-reguler to-rose-200",
                shadowColor: "shadow-pink-200/50",
              }
              
            ].map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Floating Icon */}
                  <div
                    className={`absolute top-6 right-6 bg-gradient-to-br ${category.gradient} rounded-2xl p-4 shadow-xl ${category.shadowColor}`}
                  >
                    <category.icon className="text-gray-600" size={28} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-2xl text-blue-reguler lg:text-3xl font-extrabold mb-2 text-gray-800">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-5 text-sm lg:text-base">
                    {category.description}
                  </p>
                  <Link to={`/${category.title.toLowerCase()}`}>
                    <button
                      className={`bg-gradient-to-r text-pink-300 bg-clip-text font-bold text-base group-hover:underline transition-all`}
                    >
                      Explore Collection →
                    </button>
                  </Link>
                </div>

                {/* Decorative Blob */}
                <div
                  className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white/60 via-pink-50/40 to-pink-reguler/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-blue-300 tracking-wider uppercase mb-4">
              Fan Favorites
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              What's Your Favorite?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our most loved flavors by gelato enthusiasts worldwide
            </p>
          </motion.div>
          {loadingFanFavorites ? (
            <ApiLoadingState
              title="Loading fan favorites"
              message="Fetching the most loved products..."
              cards={3}
              lines={0}
            />
          ) : (
            <PremiumCarousel items={fanFavoriteProducts} />
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-[3rem] bg-transparent overflow-hidden">
                <ImageWithFallback
                  src={Our}
                  alt="Artisan gelato making"
                  className="w-full h-[550px] lg:h-[700px] object-contain"
                />
                <div className="absolute inset-0 bg-transparent" />
              </div>

              {/* Decorative blob */}
              <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-gradient-to-br from-pink-200/40 to-pink-200/40 rounded-full blur-3xl" />
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sm font-bold text-blue-300 tracking-wider uppercase mb-4">
                Our Heritage
              </span>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 lg:mb-8 text-gray-800 leading-tight">
                About
                <br />
                <span className="bg-gradient-to-r from-blue-reguler via-pink-reguler to-pink-reguler bg-clip-text text-transparent">
                  Let's go Gelato
                </span>
              </h2>

              <div className="space-y-5 mb-10">
                <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                  <span className="font-bold text-pink-300">
                    Let’s Go Gelato
                  </span>{" "}
                  is a well-established chain with 18 stores, operating since
                  2016 and serving regions from North Sumatra to East Java,
                  Indonesia.
                </p>
                <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                  Targeting the family market, we provide Gelato, sorbets,
                  Pastry. Our products are crafted from locally sourced,
                  high-quality ingredients, featuring low fat and low sugar
                  content, while being rich in fiber and protein.
                </p>
              </div>

              {/* button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full from-blue-reguler via-pink-reguler to-pink-reguler bg-gradient-to-r text-gray-700 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base`}
              >
                Learn More
              </motion.button>

              {/* Stats Grid */}
              {/* <div className="grid grid-cols-3 gap-6 lg:gap-8">
                {[
                  { number: '15+', label: 'Years', sublabel: 'Experience' },
                  { number: '50k+', label: 'Happy', sublabel: 'Customers' },
                  { number: '30+', label: 'Unique', sublabel: 'Flavors' },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                    className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg"
                  >
                    <p className="text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-pink-200 via-pink-reguler to-pink-reguler bg-clip-text text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mb-1">
                      {stat.number}
                    </p>
                    <p className="text-gray-600 text-xs lg:text-sm font-semibold">{stat.label}</p>
                    <p className="text-gray-500 text-xs">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section
        id="locations"
        className="py-20 lg:py-32 bg-gradient-to-br from-white/60 via-pink-50/40 to-pink-reguler/40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-blue-300 tracking-wider uppercase mb-4">
              Find Us
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              Visit Our Stores
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience delicious gelato at our beautiful locations
            </p>
          </motion.div>

          {loadingLocations ? (
            <ApiLoadingState
              title="Loading locations"
              message="Fetching store addresses and directions..."
              cards={3}
              lines={0}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-start">
              {homepageLocations.map((location, idx) => (
                <div
                  className="h-fit rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative group"
                  key={location.id}
                >
                  <ImageWithFallback
                    src={location.image || resolveLocationImage(location, idx)}
                    alt={location.name}
                    className="w-full h-70 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white/80 backdrop-blur-sm rounded-[2rem] h-fit flex flex-col justify-center p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl  mb-6 shadow-xl`}
                    >
                      <MapPin className="text-blue-reguler" size={32} />
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-extrabold mb-5 text-gray-800">
                      {location.name}
                    </h3>

                    <div className="space-y-4 text-gray-600 mb-8">
                      <p className="text-sm lg:text-base leading-relaxed">
                        {location.address}
                      </p>
                      <p className="text-sm font-semibold text-pink-300">
                        {location.city}
                      </p>
                    </div>

                    <motion.a
                      href={location.directionLink || buildDirectionLink(`${location.name}, ${location.address}`)}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex w-full items-center justify-center rounded-2xl border-2 border-blue-reguler py-4 text-sm font-bold text-pink-300 shadow-lg transition-all duration-300 hover:shadow-xl lg:text-base"
                    >
                      Get Directions
                    </motion.a>

                    {/* Decorative blob */}
                    <div
                      className={`absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-blue-reguler via-pink-reguler to-pink-reguler rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          )}
          <motion.div
              whileHover={{ y: -10, x: -5 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-12 text-sm font-semibold text-blue-reguler transition-colors hover:translate-x-1 duration-300"
              >
                <Link to="/locations">
                  <span className="flex flex-col items-center gap-1 text-xl font-bold">
                    View All Locations
                    <ChevronDown size={30} />
                  </span>
                </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 lg:py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-reguler/10 to-pink-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-reguler/10 to-cyan-200/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img src={logo} alt="Gelato Logo" className="w-50 h-20 object-contain" />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Let’s Go Gelato is a well-established chain with 18 stores,
                operating since 2016 and serving regions from North Sumatra to
                East Java, Indonesia.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 hover:bg-gradient-to-br hover:from-pink-reguler hover:to-pink-200 transition-all duration-300 shadow-lg"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-extrabold text-lg mb-5 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-400">
                {["Home", "Flavors", "About", "Locations"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-pink-200 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-extrabold text-lg mb-5 text-white">
                Support
              </h4>
              <ul className="space-y-3 text-gray-400">
                {["FAQ", "Contact Us", "Catering", "Careers"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-pink-200 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-extrabold text-lg mb-5 text-white">
                Newsletter
              </h4>
              <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                Subscribe for special offers and new flavors!
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:border-pink-200 focus:bg-white/15 transition-all text-white placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-pink-reguler to-pink-200 px-6 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-gray-700"
                >
                  <Mail size={18} />
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Let's GO Gelato. All rights reserved. Made with{" "}
              <span className="text-pink-300">❤</span> and gelato.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
