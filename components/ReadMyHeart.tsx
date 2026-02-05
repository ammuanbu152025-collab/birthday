'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '@/utils/soundManager';

export default function ReadMyHeart() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: string; delay: number }[]>([]);
  const [showEnhancedEffects, setShowEnhancedEffects] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const letterContent = `My Dearest Ammu,

As I sit here thinking about you on this special day, I'm overwhelmed with gratitude for having you in my life.

You are the spark that lights up my darkest days, the warmth that makes everything feel right, and the reason my heart beats a little faster every single day.

Your smile could light up a thousand rooms. Your laugh is the sweetest melody I've ever heard. Your kindness and compassion inspire me to be a better person every single day.

Every moment with you feels like a beautiful dream that I never want to wake up from. From the smallest conversations to the biggest adventures, every second spent with you is treasured.

On this birthday, I want you to know that you are not just loved—you are ADORED. You deserve all the happiness in the world, and I promise to spend every day making sure you know just how special you are to me.

Thank you for being you. Thank you for choosing me. Thank you for filling my life with love, laughter, and endless joy.

You are my greatest blessing, my sweetest dream, and my forever.

Happy Birthday to the most amazing woman I know.

With all my love,
Your Anbu 💕`;

  useEffect(() => {
    soundManager.playShimmer();
    
    const hearts = Array.from({ length: 12 }, (_, i) => ({
      id: Math.random().toString(36),
      delay: i * 0.4,
    }));
    setFloatingHearts(hearts);

    const timer = setTimeout(() => {
      if (audioRef.current && !isAudioPlaying) {
        audioRef.current.play().catch(() => {
          console.log('Audio autoplay prevented by browser');
        });
        setIsAudioPlaying(true);
      }
    }, 1000);

    // Heartbeat sound effect
    const heartbeatInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        soundManager.playHeartbeat();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(heartbeatInterval);
    };
  }, [isAudioPlaying]);

  const handleAudioToggle = () => {
    soundManager.playClick();
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio play prevented');
        });
        setIsAudioPlaying(true);
        soundManager.playChime();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Floating hearts */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ 
                opacity: 0, 
                x: Math.random() * window.innerWidth,
                y: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: window.innerHeight + 100,
                x: Math.random() * 200 - 100,
                scale: [0, 1, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                delay: heart.delay,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
              className="fixed pointer-events-none"
              style={{
                left: Math.random() * window.innerWidth,
                top: -50,
              }}
            >
              <Heart className="w-8 h-8 text-red-400 fill-current" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Sparkles */}
        {showEnhancedEffects && [...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
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
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
            }}
            className="absolute"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl border border-pink-300/30 p-6 md:p-10 shadow-2xl relative z-10"
      >
        {/* Animated border glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(236, 72, 153, 0.3)',
              '0 0 60px rgba(236, 72, 153, 0.6)',
              '0 0 20px rgba(236, 72, 153, 0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
        />

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-6 font-dancing relative"
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 20px rgba(236, 72, 153, 0.5)',
                '0 0 40px rgba(236, 72, 153, 0.8)',
                '0 0 20px rgba(236, 72, 153, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            My Heart, In Words
          </motion.span>
          
          {/* Animated hearts around title */}
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={i}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-2xl"
              style={{
                left: `${20 + i * 20}%`,
                top: i % 2 === 0 ? '-30px' : 'auto',
                bottom: i % 2 === 1 ? '-30px' : 'auto',
              }}
            >
              💖
            </motion.span>
          ))}
        </motion.h1>

        <div className="mb-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => soundManager.playHover()}
            onClick={handleAudioToggle}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg hover:shadow-pink-500/50 transition-all flex items-center gap-2 relative overflow-hidden"
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
              animate={isAudioPlaying ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-5 h-5 relative z-10" />
              ) : (
                <VolumeX className="w-5 h-5 relative z-10" />
              )}
            </motion.div>
            
            <span className="relative z-10">
              {isAudioPlaying ? 'Listening... 🎵' : 'Play My Voice 🎵'}
            </span>
          </motion.button>
          
          <audio
            ref={audioRef}
            loop
            onPlay={() => {
              setIsAudioPlaying(true);
              soundManager.playChime();
            }}
            onPause={() => setIsAudioPlaying(false)}
          >
            <source src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=" type="audio/wav" />
          </audio>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-96 md:h-[500px] overflow-y-auto pr-4 custom-scrollbar relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            {letterContent.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-lg leading-relaxed text-pink-100 font-caveat mb-4"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Floating sparkles in text area */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`text-sparkle-${i}`}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -30],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1.2,
              }}
              className="absolute pointer-events-none"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 80}%`,
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-pink-200"
          >
            Scroll to read the complete message 💕
          </motion.p>
          
          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-2"
          >
            <span className="text-2xl">👇</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Pulsing heart in corner */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-20 left-6 text-6xl z-0"
      >
        💖
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(236, 72, 153, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(236, 72, 153, 0.6), rgba(244, 63, 94, 0.6));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(236, 72, 153, 0.8), rgba(244, 63, 94, 0.8));
        }
      `}</style>
    </motion.div>
  );
}