'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '@/utils/soundManager';

interface Memory {
  id: number;
  image: string;
  title: string;
  message: string;
  emoji: string;
}

const memories: Memory[] = [
  {
    id: 1,
    image: '/first-pic.jpeg',
    title: 'First pic',
    message: 'The moment I saw you, I knew my life would never be the same.',
    emoji: '💫',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x500/f43f5e/ffffff?text=Memory+2',
    title: 'First Walk together',
    message: 'Your laugh is my favorite sound in the entire world.',
    emoji: '😂',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x500/3b82f6/ffffff?text=Memory+3',
    title: 'Pleasant Surprise from gpt',
    message: 'Hours fly by when I\'m talking to you about everything and nothing.',
    emoji: '🌙',
  },
  {
    id: 4,
    image: 'https://placehold.co/400x500/06b6d4/ffffff?text=Memory+4',
    title: 'Adventures Together',
    message: 'Every place is more beautiful when you\'re by my side.',
    emoji: '✈️',
  },
  {
    id: 5,
    image: 'https://placehold.co/400x500/ec4899/ffffff?text=Memory+5',
    title: 'first date',
    message: 'Sometimes the best moments are the silent ones with you.',
    emoji: '🤫',
  },
  {
    id: 6,
    image: 'https://placehold.co/400x500/f43f5e/ffffff?text=Memory+6',
    title: 'hand holding',
    message: 'The way you care for others makes me love you even more.',
    emoji: '🤍',
  },
  {
    id: 7,
    image: 'https://placehold.co/400x500/3b82f6/ffffff?text=Memory+7',
    title: 'wee',
    message: 'Moving to our song, forgetting the rest of the world exists.',
    emoji: '💃',
  },
  {
    id: 8,
    image: 'https://placehold.co/400x500/8b5cf6/ffffff?text=Memory+8',
    title: 'first close moment',
    message: 'Every morning is perfect if it starts with you.',
    emoji: '☕',
  },
  {
    id: 9,
    image: 'https://placehold.co/400x500/ec4899/ffffff?text=Memory+9',
    title: 'private sharee moment',
    message: 'You inspire me to chase my dreams and believe in myself.',
    emoji: '⭐',
  },
  {
    id: 10,
    image: 'https://placehold.co/400x500/f43f5e/ffffff?text=Memory+10',
    title: 'Perfect Pic',
    message: 'With you, even rainy days feel like sunshine.',
    emoji: '🌧️',
  },
  {
    id: 11,
    image: 'https://placehold.co/400x500/3b82f6/ffffff?text=Memory+11',
    title: 'You and Me',
    message: 'When you smile, the whole universe smiles with you.',
    emoji: '😊',
  },
  {
    id: 12,
    image: 'https://placehold.co/400x500/06b6d4/ffffff?text=Memory+12',
    title: 'Us in public',
    message: 'You always know how to make my heart skip a beat.',
    emoji: '🎁',
  },
  {
    id: 13,
    image: 'https://placehold.co/400x500/ec4899/ffffff?text=Memory+13',
    title: 'Magic Moments',
    message: 'Watching you achieve your goals is my greatest joy.',
    emoji: '🚀',
  },
  {
    id: 14,
    image: 'https://placehold.co/400x500/f43f5e/ffffff?text=Memory+14',
    title: 'Tredicinal',
    message: 'Your presence is my safe place, my home.',
    emoji: '🏠',
  },
  {
    id: 15,
    image: 'https://placehold.co/400x500/3b82f6/ffffff?text=Memory+15',
    title: 'Uss',
    message: 'You are the strongest, most courageous person I know.',
    emoji: '💪',
  },
  {
    id: 16,
    image: 'https://placehold.co/400x500/8b5cf6/ffffff?text=Memory+16',
    title: 'Funny Moments',
    message: 'With you, I can dream bigger than ever before.',
    emoji: '✨',
  },
  {
    id: 17,
    image: 'https://placehold.co/400x500/ec4899/ffffff?text=Memory+17',
    title: 'Holding eachother',
    message: 'Every day with you, my love grows deeper and stronger.',
    emoji: '📈',
  },
  {
    id: 18,
    image: 'https://placehold.co/400x500/f43f5e/ffffff?text=Memory+18',
    title: 'baby',
    message: 'I could lose myself in your eyes forever.',
    emoji: '👀',
  },
  {
    id: 19,
    image: 'https://placehold.co/400x500/3b82f6/ffffff?text=Memory+19',
    title: 'Best Day in our Life',
    message: 'I want to build a thousand memories more with you.',
    emoji: '🔮',
  },
  {
    id: 20,
    image: 'https://placehold.co/400x500/ec4899/ffffff?text=Memory+20',
    title: 'My Everything',
    message: 'You are my beginning, my middle, and my happy ending.',
    emoji: '💕',
  },
];

export default function OurMemories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const goNext = () => {
    soundManager.playDing();
    soundManager.playSparkle();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const goPrev = () => {
    soundManager.playDing();
    soundManager.playSparkle();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleFlip = () => {
    soundManager.playChime();
    setIsFlipped(!isFlipped);
  };

  const currentMemory = memories[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            className="absolute text-3xl"
          >
            <Heart className="text-pink-400 fill-current" />
          </motion.div>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-4 font-dancing relative z-10"
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
          Our Beautiful Memories
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-pink-200 text-center mb-8 font-caveat relative z-10"
      >
        {currentIndex + 1} of {memories.length} precious moments 💕
      </motion.p>

      <div className="relative w-full max-w-sm h-auto mb-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
              rotateY: -90,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -50,
              rotateY: 90,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            onClick={handleFlip}
            onMouseEnter={() => soundManager.playHover()}
            className="cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              animate={{
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{ duration: 0.6 }}
              className="w-full relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                    '0 0 40px rgba(236, 72, 153, 0.6)',
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-pink-300/50 shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
<img
  src={currentMemory.image}
  alt={currentMemory.title}
  className="w-3/4 aspect-[9/16] object-cover mx-auto rounded-2xl"
/>
                  
                  {/* Animated emoji */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [-5, 5, -5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-4 right-4 text-5xl drop-shadow-lg"
                  >
                    {currentMemory.emoji}
                  </motion.div>

                  {/* Corner sparkles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute"
                      style={{
                        left: i % 2 === 0 ? '10px' : 'auto',
                        right: i % 2 === 1 ? '10px' : 'auto',
                        top: i < 2 ? '10px' : 'auto',
                        bottom: i >= 2 ? '10px' : 'auto',
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h2
                    animate={{
                      color: ['#ffffff', '#fce7f3', '#ffffff'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-2xl font-bold mb-2 font-dancing"
                  >
                    {currentMemory.title}
                  </motion.h2>
                  <p className="text-pink-100 font-caveat text-lg">
                    {currentMemory.message}
                  </p>
                </motion.div>
              </motion.div>

              {/* Back of card */}
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/90 to-red-500/90 backdrop-blur-lg rounded-3xl border-2 border-pink-300/50 p-6 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 text-white fill-current mb-4" />
                  </motion.div>
                  <p className="text-white font-caveat text-2xl text-center">
                    This memory is forever in my heart 💖
                  </p>
                  <p className="text-white/80 font-caveat text-lg mt-4">
                    Click again to see the memory
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 items-center justify-center flex-col md:flex-row w-full max-w-sm z-10">
        <motion.button
          whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => soundManager.playHover()}
          onClick={goPrev}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>

        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            animate={{
              width: `${((currentIndex + 1) / memories.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full relative"
          >
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => soundManager.playHover()}
          onClick={goNext}
          className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-pink-200 font-caveat text-lg z-10"
      >
        <motion.p
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap the card to flip it • Navigate with buttons 💕
        </motion.p>
      </motion.div>
    </motion.div>
  );
}