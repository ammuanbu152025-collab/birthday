'use client';

import { motion } from 'framer-motion';
import { LogOut, Heart } from 'lucide-react';
import { soundManager } from '@/utils/soundManager';
import { useState } from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    soundManager.playClick();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    soundManager.playWhoosh();
    soundManager.playShimmer();
    onLogout();
  };

  const handleCancel = () => {
    soundManager.playHover();
    setShowConfirm(false);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
        }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => soundManager.playHover()}
        onClick={handleLogoutClick}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-red-500/80 to-pink-500/80 backdrop-blur-lg border-2 border-white/20 text-white shadow-lg hover:shadow-red-500/50 transition-all group"
        title="Logout"
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <LogOut className="w-5 h-5" />
        </motion.div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
        >
          Logout 👋
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-white/90" />
        </motion.div>
      </motion.button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleCancel}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-sm w-full border-2 border-white/20 shadow-2xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex justify-center mb-6"
            >
              <Heart className="w-16 h-16 text-red-400 fill-current" />
            </motion.div>

            <h3 className="text-2xl font-bold text-white text-center mb-4 font-dancing">
              Leaving Already?
            </h3>

            <p className="text-pink-200 text-center mb-8 font-caveat text-lg">
              Are you sure you want to logout? 💔
            </p>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => soundManager.playHover()}
                onClick={handleCancel}
                className="flex-1 py-3 rounded-full bg-white/20 border-2 border-white/40 text-white font-bold hover:bg-white/30 transition-all"
              >
                Stay 💕
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => soundManager.playHover()}
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-red-500/50 transition-all"
              >
                Logout 👋
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}