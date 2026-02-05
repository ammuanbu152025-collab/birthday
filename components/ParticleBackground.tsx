'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/utils/soundManager';

interface Particle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  color: string;
}

const emojis = ['❤️', '💙', '💋', '✨', '💕', '💖', '🌟', '⭐'];
const colors = ['text-red-500', 'text-blue-500', 'text-pink-500', 'text-purple-500'];

export default function ParticleBackground({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.closest('button') || target.closest('input')) {
      return;
    }

    const newParticle: Particle = {
      id: Math.random().toString(36),
      x: e.clientX,
      y: e.clientY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setParticles((prev) => [...prev, newParticle]);
    
    // Play sparkle sound
    soundManager.playSparkle();

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 2000);
  }, []);

  return (
    <div
      onClick={handleClick}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #0a1929, #1e3a5f, #7c2d4d, #b91c4a)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Animated background elements */}
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
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                ['rgba(236, 72, 153, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(244, 63, 94, 0.3)'][i % 3]
              } 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Click particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - 15,
              y: particle.y - 15,
              scale: 0,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              y: particle.y - 100,
              scale: [0, 1.5, 1],
              opacity: [1, 1, 0],
              rotate: [0, 360, 720],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className={`fixed pointer-events-none text-3xl ${particle.color}`}
            style={{ 
              zIndex: 9999,
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 200,
                Math.random() * window.innerHeight,
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
            className="absolute text-2xl"
          >
            {emojis[i % emojis.length]}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Pulsing corner hearts */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="fixed top-10 right-10 text-6xl pointer-events-none"
        style={{ zIndex: 1 }}
      >
        💖
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
        }}
        className="fixed bottom-10 left-10 text-6xl pointer-events-none"
        style={{ zIndex: 1 }}
      >
        💕
      </motion.div>
    </div>
  );
}