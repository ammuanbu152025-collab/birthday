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

const sparkleEmojis = ['✨', '💫', '⭐'];

export default function CursorTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Increased delay from 50ms to 150ms for less frequency
      if (now - lastTimeRef.current < 150) return;
      lastTimeRef.current = now;

      // Only 30% chance to create sparkle
      if (Math.random() > 0.3) return;

      const newSparkle: Sparkle = {
        id: Math.random().toString(36),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 6,
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const now = Date.now();
      if (now - lastTimeRef.current < 150) return;
      lastTimeRef.current = now;

      if (Math.random() > 0.3) return;

      const newSparkle: Sparkle = {
        id: Math.random().toString(36),
        x: touch.clientX,
        y: touch.clientY,
        size: Math.random() * 12 + 6,
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
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
            opacity: 0.6,
            rotate: 0,
          }}
          animate={{
            y: sparkle.y - 40,
            scale: [0, 0.8, 0],
            opacity: [0.6, 0.8, 0],
            rotate: 180,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="fixed text-sm"
          style={{
            left: 0,
            top: 0,
            filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))',
          }}
        >
          {sparkle.emoji}
        </motion.div>
      ))}
    </div>
  );
}