'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BirthdayLanding from './BirthdayLanding';
import ReadMyHeart from './ReadMyHeart';
import OurMemories from './OurMemories';
import Navigation from './Navigation';
import CursorTrail from './CursorTrail';
import LogoutButton from './Logoutbutton';
import SoundToggle, { SoundProvider } from './SoundToggle';
import { soundManager } from '@/utils/soundManager';

type PageView = 'home' | 'letter' | 'memories';

interface BirthdayAppContentProps {
  onLogout: () => void;
}

function BirthdayAppContent({ onLogout }: BirthdayAppContentProps) {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (path: PageView) => {
    setIsTransitioning(true);
    soundManager.playWhoosh();
    
    setTimeout(() => {
      setCurrentPage(path);
      setIsTransitioning(false);
      soundManager.playChime();
    }, 300);
  };

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      // Silent initialization - no sound played
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          ctx.resume();
        } catch (e) {
          console.log('Audio context initialization deferred');
        }
      }
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  return (
    <>
      <CursorTrail />
      <SoundToggle />
      <LogoutButton onLogout={onLogout} />
      
      {currentPage !== 'home' && (
        <Navigation
          currentPath={currentPage}
          onSelectPath={handleNavigate}
        />
      )}

      {/* Page transition overlay */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
            }}
            className="text-6xl"
          >
            ✨
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <BirthdayLanding onNavigate={handleNavigate} />
          </motion.div>
        )}
        
        {currentPage === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <ReadMyHeart />
          </motion.div>
        )}
        
        {currentPage === 'memories' && (
          <motion.div
            key="memories"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <OurMemories />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function BirthdayApp({ onLogout }: { onLogout: () => void }) {
  return (
    <SoundProvider>
      <BirthdayAppContent onLogout={onLogout} />
    </SoundProvider>
  );
}