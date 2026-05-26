import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Heart, Leaf, Users, Award, Sparkles, MapPin, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router';

const timelineEvents = [
  {
    year: '2009',
    title: 'The Dream Begins',
    description: 'Founded in the heart of Sicily by Master Gelato Maker Antonio Bellini, bringing generations of family tradition to life.',
    image: 'https://images.unsplash.com/photo-1764486601113-a6856cdce5fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  },
  {
    year: '2012',
    title: 'First International Award',
    description: 'Received the prestigious Gelato d\'Oro award in Rome, recognizing our commitment to traditional methods.',
    image: 'https://images.unsplash.com/photo-1769812343875-c40f9ec7f846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  },
  {
    year: '2018',
    title: 'Expansion & Innovation',
    description: 'Opened three new locations while introducing seasonal artisan flavors inspired by local ingredients.',
    image: 'https://images.unsplash.com/photo-1772290677193-b3d2ed5ffa57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  },
  {
    year: '2024',
    title: 'Sustainability Milestone',
    description: 'Achieved 100% renewable energy across all locations and zero-waste packaging commitment.',
    image: 'https://images.unsplash.com/photo-1717853411695-c9f844e1df46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  },
];

const ingredients = [
  {
    name: 'Sicilian Pistachios',
    origin: 'Bronte, Sicily',
    description: 'Hand-harvested green gold from volcanic slopes',
    image: 'https://images.unsplash.com/photo-1571990925439-2b6072445908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    gradient: 'from-green-200 to-emerald-300',
  },
  {
    name: 'Madagascar Vanilla',
    origin: 'Madagascar',
    description: 'Pure vanilla beans with rich, creamy notes',
    image: 'https://images.unsplash.com/photo-1587653950445-77907aa6bdd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    gradient: 'from-amber-200 to-yellow-300',
  },
  {
    name: 'Belgian Chocolate',
    origin: 'Belgium',
    description: 'Single-origin dark chocolate from sustainable farms',
    image: 'https://images.unsplash.com/photo-1772985809496-e2f12a22b1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    gradient: 'from-orange-200 to-amber-300',
  },
  {
    name: 'Fresh Local Berries',
    origin: 'Local Farms',
    description: 'Organic strawberries picked at peak ripeness',
    image: 'https://images.unsplash.com/photo-1602532769069-0e856a643e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    gradient: 'from-pink-200 to-rose-300',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    description: 'Every scoop is made with passion, care, and generations of family tradition.',
    gradient: 'from-pink-200 to-rose-300',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'No artificial flavors, colors, or preservatives. Just pure, authentic ingredients.',
    gradient: 'from-green-200 to-emerald-300',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Supporting local farmers and giving back to the communities we serve.',
    gradient: 'from-purple-200 to-violet-300',
  },
  {
    icon: Award,
    title: 'Excellence Always',
    description: 'Committed to the highest standards of quality and artisan craftsmanship.',
    gradient: 'from-blue-200 to-indigo-300',
  },
];

const team = [
  {
    name: 'Antonio Bellini',
    role: 'Founder & Master Gelato Maker',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    quote: 'Gelato is not just dessert—it\'s a celebration of life\'s sweet moments.',
  },
  {
    name: 'Sofia Romano',
    role: 'Head Pastry Chef',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    quote: 'Every pastry tells a story of tradition and innovation.',
  },
  {
    name: 'Marco Rossi',
    role: 'Chocolate Artisan',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    quote: 'Great chocolate requires patience, precision, and passion.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-pink-50/30 to-purple-50/30 pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-200/30 to-purple-200/20 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg mb-8"
            >
              <Sparkles className="text-pink-300" size={20} />
              <span className="font-semibold text-gray-700">Our Story</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">
              Crafted with
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                Passion & Tradition
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              From a small family recipe in Sicily to award-winning gelato loved by thousands,
              Dolce Vita brings the authentic taste of Italy to your neighborhood.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-pink-200/50 max-w-5xl mx-auto"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1772290677193-b3d2ed5ffa57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
              alt="Artisan gelato making"
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 via-transparent to-purple-200/10" />
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-200/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Founder Antonio Bellini"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Quote Overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                  <Quote className="text-pink-300 mb-3" size={32} />
                  <p className="text-gray-800 font-medium text-lg mb-2">
                    "Gelato is not just frozen dessert—it's a celebration of life's sweetest moments."
                  </p>
                  <p className="text-gray-600 text-sm">— Antonio Bellini, Founder</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sm font-bold text-pink-300 tracking-wider uppercase mb-4">
                The Founder
              </span>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 text-gray-800 leading-tight">
                A Legacy of
                <br />
                <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Italian Excellence
                </span>
              </h2>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Antonio Bellini grew up in a small village in Sicily, where his grandmother taught him
                  the ancient art of gelato making. At just 16, he apprenticed under Master Gelato Maker
                  Giuseppe Conti in Rome, learning techniques passed down through five generations.
                </p>
                <p>
                  After years of perfecting his craft, Antonio dreamed of bringing authentic Italian gelato
                  to a wider audience. In 2009, he opened the first Dolce Vita location with nothing but
                  his grandmother's recipes, a small gelato machine, and an unwavering commitment to quality.
                </p>
                <p>
                  Today, Dolce Vita has grown into a beloved brand, but Antonio still oversees every batch,
                  ensuring that each scoop meets the same exacting standards that made his grandmother's
                  gelato legendary in their Sicilian village.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white/60 via-purple-50/40 to-pink-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-purple-300 tracking-wider uppercase mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              Growing Together
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to international recognition
            </p>
          </motion.div>

          <div className="space-y-12 lg:space-y-20">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl">
                    <div className="inline-block bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 px-6 py-2 rounded-full font-bold text-lg mb-6">
                      {event.year}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-extrabold mb-4 text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Ingredients */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-pink-300 tracking-wider uppercase mb-4">
              Premium Quality
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              The Finest Ingredients
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              We source only the best ingredients from around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ingredients.map((ingredient, idx) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Origin Badge */}
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${ingredient.gradient} text-gray-700 px-4 py-2 rounded-full text-xs font-bold shadow-lg`}>
                    {ingredient.origin}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-extrabold mb-2 text-gray-800">{ingredient.name}</h3>
                  <p className="text-gray-600 text-sm">{ingredient.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white/60 via-pink-50/40 to-purple-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-purple-300 tracking-wider uppercase mb-4">
              Our Values
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              What We Believe In
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 shadow-lg`}>
                  <value.icon className="text-gray-600" size={32} />
                </div>

                <h3 className="text-2xl font-extrabold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>

                {/* Decorative blob */}
                <div className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${value.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block text-sm font-bold text-pink-300 tracking-wider uppercase mb-4">
              Meet Our Team
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-5 text-gray-800">
              Master Artisans
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind every delicious creation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Quote on image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <Quote className="text-pink-200 mb-2" size={24} />
                    <p className="text-white text-sm font-medium italic">{member.quote}</p>
                  </div>
                </div>

                <div className="p-8 text-center">
                  <h3 className="text-2xl font-extrabold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-pink-300 font-semibold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Experience */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white/60 via-purple-50/40 to-pink-50/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 flex items-center"
            >
              <div>
                <span className="inline-block text-sm font-bold text-pink-300 tracking-wider uppercase mb-4">
                  Customer Love
                </span>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-5 text-gray-800">
                  What People
                  <br />
                  <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Are Saying
                  </span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Thousands of happy customers enjoying authentic Italian gelato
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  text: 'Best gelato I\'ve ever had outside of Italy! The pistachio flavor is absolutely divine.',
                  author: 'Sarah M.',
                  rating: 5,
                },
                {
                  text: 'A family tradition now. We visit every Sunday and the quality never disappoints!',
                  author: 'Michael R.',
                  rating: 5,
                },
                {
                  text: 'The passion and care that goes into each scoop is evident. Truly artisan quality.',
                  author: 'Emma L.',
                  rating: 5,
                },
                {
                  text: 'From the moment you walk in, you feel the warmth and authenticity. Love this place!',
                  author: 'David K.',
                  rating: 5,
                },
              ].map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed italic">"{review.text}"</p>
                  <p className="text-gray-600 font-semibold">— {review.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-[3rem] p-12 lg:p-16 text-center overflow-hidden shadow-2xl"
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 text-gray-800">
                Visit Us Today
              </h2>
              <p className="text-xl lg:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
                Experience the authentic taste of Italy at one of our three locations
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-700 px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0"
                  >
                    Explore Our Menu
                    <ChevronRight size={20} />
                  </motion.button>
                </Link>
                <a href="/#locations">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0"
                  >
                    <MapPin size={20} />
                    Find a Store
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
