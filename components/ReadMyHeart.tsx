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

  const letterContent = `For my mama ponnu my Ammuu 💖 Dee

We've known each other since we were kids. For years you were a familiar smile in a crowd, a quiet light in the background of my life. We didn't spend much time then, but you were always there.

In college we started talking more small, random conversations that felt like the first notes of our song. And six months ago we made a promise: not a fling, not a wish, but a real vow to try for a life together.

You are soft and steady all at once. You feel things deeply, and you give care like it's breathing without asking for applause. That tenderness of yours is sacred to me. I see the way you worry, the way you fix what's broken, the way you hold people when they need it most. I notice you. I remember you. I feel lucky just to be near you.

I don't want a fairy tale. I want a true life with you messy, honest, warm. I imagine mornings where we wake up in the same light, where the first thing I see is your face. We'll share small rituals: making tea together, someone doing stupid thing and the other laughing, brushing each other's hair while we get ready, standing in the bathroom under the same warm water, laughing because shampoo gets in our eyes the kind of simple togetherness that becomes home.

I imagine walking to work side by side, one umbrella, quiet jokes, holding hands when the traffic crushes us, stealing little moments on the way.

I promise to be practical with you to plan with you, to be the steady one when you need sense, to make room for the future we want.

I promise to be emotional with you to hold you when tears come, to sit with you through every soft and stormy feeling, to celebrate your small victories like they are mine.

I will listen until you feel heard. I will protect your comfort and your dignity. I will make you feel safe enough to be the whole you the fierce, the gentle, the silly, the tired.

You deserve someone who notices the little things: the way your smile arrives slow, the way you tuck your hair behind your ear when you're thinking, the way you reach out for people. I will notice. I will return that care with patience, with honesty, with fun.

I will be the one who brings you warm water when your feet are cold, who learns your favourite song and sings it badly just to see you laugh, who remembers to call your mom and bring flowers for no reason.

You are my calm and my spark. You are my mama ponnu the girl from childhood who became the part of mine.

Six months in, my promise is simple and fierce: I will choose you. I will build small, true days with you. I will be practical when we need plans, and soft when we need comfort. I will love you in ways that matter.

Can I kiss you? Can I spend every ordinary, extraordinary morning with you?

Always yours,
Anbu(Barath Subiksha) 💕✨`;

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 p-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-red-200/30 to-purple-200/30"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgba(251, 207, 232, 0.3), rgba(254, 202, 202, 0.3), rgba(233, 213, 255, 0.3))',
            'linear-gradient(to bottom right, rgba(233, 213, 255, 0.3), rgba(251, 207, 232, 0.3), rgba(254, 202, 202, 0.3))',
            'linear-gradient(to bottom right, rgba(254, 202, 202, 0.3), rgba(233, 213, 255, 0.3), rgba(251, 207, 232, 0.3))',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0 
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 1, 0],
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      {showEnhancedEffects &&
        [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          >
            <Sparkles className="text-yellow-400" size={20} />
          </motion.div>
        ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(236, 72, 153, 0.3)',
              '0 0 40px rgba(236, 72, 153, 0.5)',
              '0 0 20px rgba(236, 72, 153, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 bg-clip-text text-transparent relative"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            My Heart, In Words
            
            {/* Animated hearts around title */}
            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{
                  left: i % 2 === 0 ? '-40px' : 'auto',
                  right: i % 2 === 1 ? '-40px' : 'auto',
                  top: i < 2 ? '0' : 'auto',
                  bottom: i >= 2 ? '0' : 'auto',
                }}
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              >
                💖
              </motion.span>
            ))}
          </motion.h1>

          <div className="flex justify-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => soundManager.playHover()}
              onClick={handleAudioToggle}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg hover:shadow-pink-500/50 transition-all flex items-center gap-2 relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: isAudioPlaying ? 360 : 0 }}
                transition={{ duration: 2, repeat: isAudioPlaying ? Infinity : 0, ease: 'linear' }}
              >
                {isAudioPlaying ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </motion.div>
              {isAudioPlaying ? 'Listening... 🎵' : 'Play My Voice 🎵'}
            </motion.button>
          </div>

          <audio
            ref={audioRef}
            src="/audio/my song.mp3"
            loop
            onPlay={() => {
              setIsAudioPlaying(true);
              soundManager.playChime();
            }}
            onPause={() => setIsAudioPlaying(false)}
          >
          </audio>

          <div className="max-h-[500px] overflow-y-auto pr-4 space-y-4 relative">
            {letterContent.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Floating sparkles in text area */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-pink-600 mt-6 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to read the complete message 💕 👇
          </motion.p>
        </div>
      </motion.div>

      {/* Pulsing heart in corner */}
      <motion.div
        className="fixed bottom-8 right-8 text-6xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        💖
      </motion.div>
    </div>
  );
}