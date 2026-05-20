import { motion } from 'motion/react';

export function FloatingGelatoShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft gradient blobs */}
      <motion.div
        className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-reguler/40 to-pink-100/30 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/4 right-10 w-80 h-80 bg-gradient-to-br from-purple-reguler/40 to-blue-200/30 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-yellow-100/40 to-orange-100/30 rounded-full blur-3xl"
        animate={{
          y: [0, 35, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-56 h-56 bg-gradient-to-br from-emerald-100/40 via-teal-100/30 to-cyan-100/30 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-60 h-60 bg-gradient-to-br from-rose-200/40 to-pink-200/30 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
