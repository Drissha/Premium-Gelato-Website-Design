import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Clock3,
  MapPin,
  Phone,
  Search,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Bengawan, Braga, Maps, SMB, Villagio } from '../imageImports';

const buildDirectionLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const stores = [
  {
    id: 1,
    name: 'Letsgo Gelato Bengawan',
    city: 'Bandung',
    area: 'Bengawan',
    address: 'Jl. Bengawan No. 29, Kota Bandung',
    directionLink: buildDirectionLink('Letsgo Gelato Bengawan, Jl. Bengawan No. 29, Kota Bandung'),
    hours: 'Monday - Sunday: 10am-9pm',
    phone: '+1 (310) 555-0148',
    highlight: 'Featured Flagship',
    image: Bengawan,
  },
  {
    id: 2,
    name: 'Letsgo Gelato Braga',
    city: 'Bandung',
    area: 'Braga',
    address: 'Jl Braga No 67, Kota Bandung',
    directionLink: buildDirectionLink('Letsgo Gelato Braga, Jl Braga No 67, Kota Bandung'),
    hours: 'Monday - Sunday: 10am-10pm',
    phone: '+1 (213) 555-0172',
    highlight: 'Best for Evening Visits',
    image: Braga,
  },
  {
    id: 3,
    name: 'Letsgo Gelato Summarecon Bekasi',
    city: 'Bekasi',
    area: 'Summarecon Bekasi',
    address: 'SMB, Lt.2 Unit 2F-ic-19,, Jl. Boulevard Ahmad Yani, Bekasi Tengah',
    directionLink: buildDirectionLink('Letsgo Gelato Summarecon Bekasi, SMB, Lt.2 Unit 2F-ic-19, Jl. Boulevard Ahmad Yani, Bekasi Tengah'),
    hours: 'Monday - Sunday: 10am-10pm',
    phone: '+1 (310) 555-0189',
    highlight: 'Summer Favorite',
    image: SMB,
  },
  {
    id: 4,
    name: 'Letsgo Gelato Villaggio Outlets',
    city: 'Karawang',
    area: 'Karawang Timur',
    address: 'Summarecon Mall Villagio - unit F066, Karawang Timur',
    directionLink: buildDirectionLink('Letsgo Gelato Villaggio Outlets, Summarecon Mall Villagio, Karawang Timur'),
    hours: 'Monday - Sunday: 10am-9pm',
    phone: '+1 (310) 555-0189',
    highlight: 'Summer Favorite',
    image: Villagio,
  },
];


export function LocationsPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [featuredStoreIndex, setFeaturedStoreIndex] = useState(0);
  const [showAllStores, setShowAllStores] = useState(false);

  const cityOptions = ['All', ...Array.from(new Set(stores.map((store) => store.city)))];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFeaturedStoreIndex((prev) => (prev + 1) % stores.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase()) ||
        store.area.toLowerCase().includes(search.toLowerCase());

      const matchesCity = cityFilter === 'All' || store.city === cityFilter;
      return matchesSearch && matchesCity;
    });
  }, [search, cityFilter]);

  const visibleStores = showAllStores ? filteredStores : filteredStores.slice(0, 3);

  useEffect(() => {
    setShowAllStores(false);
  }, [search, cityFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-reguler/10 via-white to-blue-reguler/10 pt-24 pb-20 text-gray-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 lg:px-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white/80 p-8 shadow-2xl shadow-blue-100/60 lg:p-12"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(224,242,254,0.72),rgba(224,231,255,0.78))]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18) 0 14px, transparent 15px), radial-gradient(circle at 80% 30%, rgba(99,102,241,0.18) 0 16px, transparent 17px), linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px, 44px 44px, 30px 30px, 30px 30px' }} />
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-blue-reguler shadow-md shadow-blue-100/70">
                <Sparkles size={16} /> Store Location
              </span>
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-gray-800 lg:text-6xl">
                Find Your Nearest Gelato Shop.
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 lg:text-xl">
                Discover our artisanal gelato cafe locations, opening hours, facilities, and the perfect place to enjoy your next sweet escape.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-gradient-to-r from-pink-reguler via-blue-reguler to-blue-reguler px-6 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-100/70">View Menu</button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.85),rgba(240,249,255,0.92))] p-5 shadow-xl shadow-blue-100/60"
            >
                <ImageWithFallback
                    src={Maps}
                    alt="Gelato Crew"
                    className="w-full sm:h-full  object-cover rounded-[1.5rem]"
                />
            </motion.div>
          </div>
        </motion.section>

        {/* Store locator */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="rounded-[2rem] bg-white/85 p-6 shadow-2xl shadow-blue-100/60"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-blue-reguler">Store Locations</p>
                <h2 className="text-2xl font-bold text-gray-800">Search and filter locations</h2>
              </div>
            </div>

            <label className="mb-4 block text-sm font-semibold text-gray-700">Search by area or address</label>
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by neighborhood or address"
                className="w-full rounded-full border border-pink-reguler/30 bg-pink-reguler/10 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-reguler/40 focus:ring-2 focus:ring-blue-reguler/20"
              />
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">Filter by city</label>
            <div className="flex flex-wrap gap-2">
              {cityOptions.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setCityFilter(city)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    cityFilter === city
                      ? 'bg-gradient-to-r from-pink-reguler via-blue-reguler to-blue-reguler text-gray-800 shadow-lg shadow-blue-100/70'
                      : 'bg-pink-reguler/15 text-gray-700 hover:bg-pink-reguler/25'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="rounded-[2rem] bg-white/85 p-6 shadow-2xl shadow-blue-100/60"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-blue-reguler">Featured Store</p>
                <h2 className="text-2xl font-bold text-gray-800">{stores[featuredStoreIndex].name}</h2>
              </div>
              <span className="rounded-full bg-gradient-to-r from-pink-reguler/25 to-blue-reguler/20 px-3 py-1 text-xs font-semibold text-gray-700">Most loved</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-center">
              <img src={stores[featuredStoreIndex].image} alt={stores[featuredStoreIndex].name} className="h-64 w-full rounded-[1.5rem] object-cover shadow-xl" />
              <div className="space-y-4 rounded-[1.5rem] bg-gradient-to-br from-pink-reguler/15 to-blue-reguler/15 p-5 shadow-inner">
                
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-blue-reguler" /> {stores[featuredStoreIndex].address}</li>
                  <li className="flex items-start gap-3"><Clock3 size={16} className="mt-0.5 text-blue-reguler" /> {stores[featuredStoreIndex].hours}</li>
                  <li className="flex items-start gap-3"><Phone size={16} className="mt-0.5 text-blue-reguler" /> {stores[featuredStoreIndex].phone}</li>
                </ul>
                <a
                  href={stores[featuredStoreIndex].directionLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-reguler via-blue-reguler to-blue-reguler px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-100/70"
                >
                  Get directions <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Interactive cards */}
        <section className="grid gap-6 lg:grid-cols-3">
          {visibleStores.map((store, index) => (
            <motion.article
              key={store.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-[2rem] bg-white/85 p-5 shadow-2xl shadow-blue-100/60"
            >
              <img src={store.image} alt={store.name} className="h-44 w-full rounded-[1.4rem] object-cover" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="rounded-full bg-pink-reguler/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-reguler">{store.city}</span>
                <span className="text-xs text-gray-500">{store.area}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-gray-800">{store.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{store.highlight}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 text-blue-reguler" /> {store.address}</li>
                <li className="flex items-start gap-2"><Clock3 size={15} className="mt-0.5 text-blue-reguler" /> {store.hours}</li>
              </ul>
              <a
                href={store.directionLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-reguler via-blue-reguler to-blue-reguler px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-100/70"
              >
                Directions <ArrowRight size={15} />
              </a>
            </motion.article>
          ))}
        </section>

        {filteredStores.length > 3 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllStores((prev) => !prev)}
              className="rounded-full bg-white/85 px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-100/70 transition hover:-translate-y-0.5 hover:bg-white"
            >
              {showAllStores ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}

        
      </div>
    </div>
  );
}
