'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = 'Filling with love...',
}: LoadingStateProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-6"
      >
        <Heart className="w-24 h-24 text-red-500 fill-current" />
      </motion.div>

      <motion.p
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-xl text-pink-200 font-caveat"
      >
        {message}
      </motion.p>

      <motion.div className="mt-8 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-3 h-3 rounded-full bg-pink-400"
          />
        ))}
      </motion.div>
    </div>
  );
}
