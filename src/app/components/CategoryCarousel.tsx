import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';

export type CategoryCarouselSlide = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  badge: string;
  accent: string;
};

type CategoryCarouselProps = {
  eyebrow: string;
  title: string;
  description: string;
  slides: CategoryCarouselSlide[];
};

export function CategoryCarousel({ eyebrow, title, description, slides }: CategoryCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();
    api.on('select', updateCurrent);
    api.on('reInit', updateCurrent);

    return () => {
      api.off('select', updateCurrent);
      api.off('reInit', updateCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (!api || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [api, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-10 lg:mb-14"
    >
      <div className="mb-6 text-center">
        <span className="inline-block text-sm font-bold text-blue-300 tracking-wider uppercase mb-3">
          {eyebrow}
        </span>
        <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 text-gray-800">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <Carousel opts={{ align: 'start', loop: true }} setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="basis-full">
              <div className="group relative overflow-hidden rounded-[2rem] bg-white/80 backdrop-blur-md shadow-xl shadow-pink-100/50 border border-white/50">
                <div className="relative h-[360px] overflow-hidden">
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${slide.accent}`} />

                  {/* <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 shadow-lg">
                    {slide.badge}
                  </div> */}

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                    <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
                      {slide.title}
                    </h3>
                    {/* <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow-md">
                      {slide.description}
                    </p> */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-3 hidden h-11 w-11 border-white/60 bg-white/90 shadow-xl text-gray-700 hover:bg-white md:flex" />
        <CarouselNext className="-right-3 hidden h-11 w-11 border-white/60 bg-white/90 shadow-xl text-gray-700 hover:bg-white md:flex" />
      </Carousel>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => api?.scrollTo(index)}
            className="group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-10 bg-gradient-to-r from-pink-reguler to-blue-reguler'
                  : 'w-2.5 bg-gray-300 group-hover:bg-pink-200'
              }`}
            />
          </button>
        ))}
      </div>
    </motion.section>
  );
}
