'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '@/utils/soundManager';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    soundManager.setMuted(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Play a confirmation sound when unmuting
    if (!newMutedState) {
      setTimeout(() => {
        soundManager.playChime();
      }, 100);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  const handleToggle = () => {
    if (!isMuted) {
      soundManager.playClick();
    }
    toggleMute();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
      whileHover={{ 
        scale: 1.15, 
        rotate: 5,
        boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)',
      }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-40 p-4 rounded-full bg-gradient-to-br from-pink-500/80 to-red-500/80 backdrop-blur-lg border-2 border-white/20 text-white shadow-lg hover:shadow-pink-500/50 transition-all"
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      <motion.div
        animate={{
          rotate: isMuted ? 0 : [0, -10, 10, -10, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: isMuted ? 0 : Infinity,
          repeatDelay: 3,
        }}
      >
        {isMuted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <VolumeX className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <Volume2 className="w-6 h-6" />
            
            {/* Sound waves animation */}
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 1.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full border-2 border-white"
            />
            <motion.div
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.5, 2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5,
              }}
              className="absolute inset-0 rounded-full border-2 border-white"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
      >
        {isMuted ? '🔇 Sound is off' : '🔊 Sound is on'}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-white/90" />
      </motion.div>
    </motion.button>
  );
}