import { motion } from 'motion/react';

interface FloatingIceCreamIconProps {
  delay?: number;
  className?: string;
}

export function FloatingIceCreamIcon({ delay = 0, className = '' }: FloatingIceCreamIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      className={className}
    >
      <motion.svg
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        width="80"
        height="100"
        viewBox="0 0 80 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Ice cream scoops */}
        <circle cx="40" cy="35" r="20" fill="url(#pink-gradient)" opacity="0.9" />
        <circle cx="40" cy="20" r="18" fill="url(#purple-gradient)" opacity="0.9" />
        <circle cx="40" cy="8" r="15" fill="url(#blue-gradient)" opacity="0.9" />

        {/* Cone */}
        <path
          d="M 25 45 L 40 90 L 55 45 Z"
          fill="url(#cone-gradient)"
        />

        {/* Cone pattern */}
        <path
          d="M 30 50 L 35 60 M 35 50 L 40 60 M 40 50 L 45 60 M 45 50 L 50 60
             M 28 60 L 33 70 M 33 60 L 38 70 M 38 60 L 43 70 M 43 60 L 48 70 M 48 60 L 52 70
             M 31 70 L 36 80 M 36 70 L 41 80 M 41 70 L 46 80"
          stroke="#D97706"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Highlights */}
        <circle cx="35" cy="10" r="4" fill="white" opacity="0.6" />
        <circle cx="45" cy="23" r="3" fill="white" opacity="0.5" />
        <circle cx="35" cy="38" r="5" fill="white" opacity="0.4" />

        {/* Gradients */}
        <defs>
          <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F9A8D4" />
          </linearGradient>
          <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
          <linearGradient id="cone-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
