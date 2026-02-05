'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💖', '💕'];

export default function CursorTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 50) return;
      lastTimeRef.current = now;

      const newSparkle: Sparkle = {
        id: Math.random().toString(36),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 20 + 8,
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1000);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const now = Date.now();
      if (now - lastTimeRef.current < 50) return;
      lastTimeRef.current = now;

      const newSparkle: Sparkle = {
        id: Math.random().toString(36),
        x: touch.clientX,
        y: touch.clientY,
        size: Math.random() * 20 + 8,
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{
            x: sparkle.x,
            y: sparkle.y,
            scale: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: sparkle.y - 80,
            scale: [0, 1.2, 0],
            opacity: [1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          className="fixed text-2xl"
          style={{
            left: 0,
            top: 0,
            filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: 2,
            }}
            style={{
              transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
            }}
          >
            {sparkle.emoji}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}