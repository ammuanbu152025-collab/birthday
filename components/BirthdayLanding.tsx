'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star } from 'lucide-react';
import Navigation from './Navigation';
import { soundManager } from '@/utils/soundManager';

interface BirthdayLandingProps {
  onNavigate?: (path: 'letter' | 'memories') => void;
}

export default function BirthdayLanding({ onNavigate }: BirthdayLandingProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial entrance sound
    setTimeout(() => soundManager.playShimmer(), 200);
    setTimeout(() => soundManager.playSuccess(), 500);

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Play pop sound occasionally with confetti
      if (Math.random() < 0.3) {
        soundManager.playPop();
      }

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ef4444', '#3b82f6', '#ec4899', '#f43f5e'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ef4444', '#3b82f6', '#ec4899', '#f43f5e'],
      });
    }, 250);

    setTimeout(() => {
      setShowContent(true);
      soundManager.playChime();
    }, 500);

    // Ambient background sounds
    const ambientInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        soundManager.playAmbientNote();
      }
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(ambientInterval);
    };
  }, []);

  const handleConfettiClick = () => {
    soundManager.playPop();
    soundManager.playSparkle();
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8, x: 0.9 },
      colors: ['#ef4444', '#3b82f6', '#ec4899'],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        ))}
      </div>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl w-full relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              duration: 1,
            }}
            className="text-center mb-12 relative"
          >
            {/* Animated hearts around title */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute"
                style={{
                  left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                }}
              >
                <Heart className="w-6 h-6 text-pink-400 fill-current" />
              </motion.div>
            ))}

            <motion.h1
              animate={{
                textShadow: [
                  '0 0 20px rgba(236, 72, 153, 0.5)',
                  '0 0 40px rgba(236, 72, 153, 0.8)',
                  '0 0 20px rgba(236, 72, 153, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl md:text-7xl font-bold text-white font-dancing mb-4"
            >
              Happy Birthday
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h2
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-red-300 to-pink-300 bg-clip-text text-transparent font-dancing"
                style={{ backgroundSize: '200% 200%' }}
              >
                My Ammu Subiksha Barath
              </motion.h2>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.5)',
                    '0 0 60px rgba(236, 72, 153, 0.8)',
                    '0 0 20px rgba(236, 72, 153, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="rounded-3xl overflow-hidden border-4 border-pink-300/50 relative"
              >
                <motion.img
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  src="https://placehold.co/400x600/ec4899/ffffff?text=Ammu+💕"
                  alt="Ammu Subiksha Barath"
                  className="w-64 h-96 md:w-80 md:h-[480px] object-cover"
                />

                {/* Floating sparkles around image */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-12 h-12 text-yellow-300 fill-current drop-shadow-lg" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -bottom-4 -left-4"
              >
                <Sparkles className="w-12 h-12 text-pink-300 fill-current drop-shadow-lg" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-10, 10, -10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              >
                <span className="text-4xl drop-shadow-lg">👑</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block"
            >
              <motion.p
                animate={{
                  textShadow: [
                    '0 0 10px rgba(252, 231, 243, 0.5)',
                    '0 0 20px rgba(252, 231, 243, 0.8)',
                    '0 0 10px rgba(252, 231, 243, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl md:text-3xl font-caveat text-pink-200 mb-4"
              >
                You light up my world like nobody else ✨
              </motion.p>
            </motion.div>

            <div className="flex justify-center gap-4 text-4xl mt-8">
              {['❤️', '💙', '💕', '💖', '💝', '💗'].map((emoji, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.5, 
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    delay: 2 + index * 0.1,
                    duration: 0.5,
                  }}
                  onMouseEnter={() => soundManager.playSparkle()}
                  className="cursor-pointer"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <Navigation
            currentPath="home"
            onSelectPath={(path) => {
              soundManager.playWhoosh();
              if (onNavigate && path !== 'home') {
                onNavigate(path as 'letter' | 'memories');
              }
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg text-white/80 font-caveat"
            >
              Click the buttons above to explore more surprises...
            </motion.p>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-4"
            >
              <span className="text-3xl">👆</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 3, type: 'spring' }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => soundManager.playHover()}
          onClick={handleConfettiClick}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all font-bold"
        >
          <motion.span
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            More Confetti! 🎉
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}