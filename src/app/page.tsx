"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <Heart size={80} className="text-pink-500 fill-pink-500" />
            </motion.div>
            <h2 className="text-xl font-semibold text-romantic-text/80 animate-pulse">
              Preparing something special...
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 glass-card p-10"
          >
            <h1 className="text-3xl font-bold text-pink-600">
              Welcome, Beautiful ❤️
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/home")}
              className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-pink-600 transition-colors"
            >
              Start Adventure
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
