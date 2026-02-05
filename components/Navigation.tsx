'use client';

import { motion } from 'framer-motion';
import { Heart, ImageIcon, Home, Sparkles } from 'lucide-react';
import { soundManager } from '@/utils/soundManager';

interface NavigationProps {
  onSelectPath: (path: 'letter' | 'memories' | 'home') => void;
  currentPath: string;
}

export default function Navigation({ onSelectPath, currentPath }: NavigationProps) {
  const handleNavigation = (path: 'letter' | 'memories' | 'home') => {
    soundManager.playWhoosh();
    soundManager.playSparkle();
    onSelectPath(path);
  };

  if (currentPath === 'home') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="flex flex-col gap-4 md:flex-row justify-center items-center mt-8 px-4"
      >
        <motion.button
          whileHover={{ 
            scale: 1.08, 
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)',
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => handleNavigation('letter')}
          className="w-full md:w-64 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500/80 to-red-500/80 backdrop-blur-lg border border-pink-300/50 text-white font-bold text-lg shadow-xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="relative z-10"
          >
            <Heart className="w-6 h-6" />
          </motion.div>
          
          <span className="relative z-10">Read My Heart</span>

          {/* Floating sparkles on hover */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute"
              style={{
                left: `${30 + i * 20}%`,
                top: '-10px',
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </motion.div>
          ))}
        </motion.button>

        <motion.button
          whileHover={{ 
            scale: 1.08, 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => handleNavigation('memories')}
          className="w-full md:w-64 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-lg border border-blue-300/50 text-white font-bold text-lg shadow-xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="relative z-10"
          >
            <ImageIcon className="w-6 h-6" />
          </motion.div>
          
          <span className="relative z-10">Our Memories</span>

          {/* Floating sparkles on hover */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute"
              style={{
                left: `${30 + i * 20}%`,
                top: '-10px',
              }}
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
            </motion.div>
          ))}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
        x: 5,
      }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => soundManager.playHover()}
      onClick={() => handleNavigation('home')}
      className="fixed top-6 left-6 z-50 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold shadow-lg hover:bg-white/20 transition-all flex items-center gap-2 group"
    >
      <motion.div
        animate={{
          x: [-3, 0, -3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ←
      </motion.div>
      
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Home className="w-5 h-5" />
      </motion.div>
      
      <span>Back</span>

      {/* Sparkle trail */}
      <motion.div
        animate={{
          opacity: [0, 1, 0],
          x: [-20, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="absolute left-0 -translate-x-full"
      >
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </motion.div>
    </motion.button>
  );
}