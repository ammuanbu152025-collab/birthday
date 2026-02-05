'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { soundManager } from '@/utils/soundManager';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  //@ts-ignore
  const { isAuthenticated, authenticate, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (authenticate(password)) {
      setIsUnlocking(true);
      soundManager.playSuccess();
      
      // Additional magical sounds during unlock
      setTimeout(() => soundManager.playShimmer(), 300);
    } else {
      setError('Wrong password, try again! ❤️');
      setPassword('');
      setShake(true);
      soundManager.playError();
      
      setTimeout(() => {
        setError('');
        setShake(false);
      }, 2000);
    }
  };

  const handleInputFocus = () => {
    soundManager.playChime();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (isAuthenticated) {
    //@ts-ignore
    return <>{typeof children === 'function' ? children({ onLogout: logout }) : children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0 
            }}
            animate={{
              y: -100,
              opacity: [0, 0.6, 0],
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            className="absolute text-4xl"
          >
            {['💕', '💖', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-50"
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex justify-center mb-8 relative z-10"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.5)',
                    '0 0 40px rgba(236, 72, 153, 0.8)',
                    '0 0 20px rgba(236, 72, 153, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full p-4 bg-gradient-to-br from-pink-500/20 to-red-500/20"
              >
                <Lock className="w-16 h-16 text-pink-300" />
              </motion.div>
              
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-2 -right-2"
              >
                <Heart className="w-8 h-8 text-red-400 fill-current drop-shadow-lg" />
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
                className="absolute -bottom-2 -left-2"
              >
                <Sparkles className="w-6 h-6 text-yellow-300 fill-current" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-white mb-2 font-dancing relative z-10"
          >
            A Special Surprise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-pink-200 mb-8 font-caveat text-xl relative z-10"
          >
            Enter the magic words to unlock...
          </motion.p>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4 relative z-10"
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.input
                type="password"
                value={password}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Enter password..."
                whileFocus={{ scale: 1.02 }}
                className="w-full px-6 py-4 rounded-2xl bg-white/20 border-2 border-pink-300/50 text-white placeholder-pink-200/70 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all text-lg"
                autoFocus
              />
              
              {/* Sparkle effects on input */}
              <motion.div
                animate={{
                  opacity: password.length > 0 ? [0, 1, 0] : 0,
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }}
                className="text-center text-red-300 font-caveat text-lg"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-pink-500/50 transition-all relative overflow-hidden"
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
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative z-10">Unlock My Surprise ✨</span>
            </motion.button>
          </motion.form>

          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mt-6 text-center relative z-10"
          >
            <span className="text-4xl drop-shadow-lg">💝</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Unlock animation */}
      {isUnlocking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 1.5, 1],
              rotate: [- 180, 180, 0],
            }}
            transition={{ duration: 1.2, type: 'spring' }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl"
            >
              🎉
            </motion.div>
          </motion.div>

          {/* Confetti burst */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1,
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 800,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 800,
                opacity: 0,
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute text-4xl"
            >
              {['❤️', '💕', '💖', '✨', '⭐'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}