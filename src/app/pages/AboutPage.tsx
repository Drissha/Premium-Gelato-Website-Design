import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Heart, Leaf, Users, Award, Sparkles, MapPin, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router';
import { Bengawan, BengawanCust, Cone, Crew, Croissant, Cup, Gelatocup, Villagio } from '../imageImports';

const timelineEvents = [
  {
    content: 'CONCEPT',
    title: 'Our Concept and Product',
    description: "Let's Go Gelato is the first Gelateria (Gelato Shop) in Bandung that offers more than 50 flavors of Gelato and Sorbet every day.",
    image: Gelatocup,
  },
  {
    content: 'OUTLET',
    title: 'Growth and Popularity',
    description: "It has grown to over 15 outlets, spread from Medan to Surabaya. The demand for Let's Go Gelato’s flavors has turned out to be huge.",
    image: Crew,
  },
  {
    content: 'FACILITY',
    title: 'Establishment of Production Facility',
    description: 'Established in June 2016, at Bengawan Street No. 29, Bandung, the business continued to grow until 2022.',
    image: Bengawan,
  },
  {
    content: 'FUTURE',
    title: 'Looking Ahead',
    description: "Let's Go Gelato is committed to continuously developing its business in terms of product quality, service, and the number of outlets, so that more people can enjoy \"Happiness in every scoop\" Let's Go Gelato style.",
    image: Cup,
  },
  {
    content: 'Approach',
    title: 'Our Approach to Gelato',
    description: "From the very beginning, Letsgo Gelato has embraced a simple philosophy: use high-quality ingredients, source them locally whenever possible, and create flavours that excite Indonesian taste buds. We are not afraid to introduce bold combinations, inspired by our travels, culinary trends, and of course, our love for all things uniquely Indonesian.",
    image: BengawanCust,
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
              Happiness
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                in Every Scoop
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              from a love story - a love for gelato and a passion for creating happy memories.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-pink-200/50 max-w-5xl mx-auto"
          >
            {/* <ImageWithFallback
              src={Cup}
              alt="Gelato Crew"
              className="w-full sm:h-[300px] lg:h-[600px] object-cover"
            /> */}
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
                  src={Villagio}
                  alt="Hero-about"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Quote Overlay */}
                {/* <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                  <Quote className="text-pink-300 mb-3" size={32} />
                  <p className="text-gray-800 font-medium text-lg mb-2">
                    "Gelato is not just frozen dessert—it's a celebration of life's sweetest moments."
                  </p>
                  <p className="text-gray-600 text-sm">— Antonio Bellini, Founder</p>
                </div> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sm font-bold text-pink-300 tracking-wider uppercase mb-4">
                our stories
              </span>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 text-gray-800 leading-tight">
                A Dream Scooped 
                <br />
                <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  into Reality
                </span>
              </h2>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Letsgo Gelato wasn't born in a boardroom; it was born from a love story - a love for gelato and a passion for creating happy memories. In 2016, Hendrikus and his wife, Aprilia, noticed a gap in the Indonesian gelato market. While international chains dominated the premium segment, they longed for fresh, locally-made gelato bursting with unmistakable natural flavours and a luxuriously smooth texture.
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
                key={event.content}
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
                      {event.content}
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
                <Link to="/locations">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0"
                  >
                    <MapPin size={20} />
                    Find a Store
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
