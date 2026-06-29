"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const router = useRouter();
  const [loadingText, setLoadingText] = useState("বিশেষ কিছুর প্রস্তুতি চলছে...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText("স্বাগতম, রাজকুমারী ❤️");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-8">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart size={120} className="text-pink-500 fill-pink-500 drop-shadow-xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-black text-pink-600 mb-2 font-serif tracking-wide">
          Our Little World
        </h1>
        <p className="text-sm font-semibold text-romantic-text/80 h-6">
          {loadingText}
        </p>
      </motion.div>

      {loadingText === "স্বাগতম, রাজকুমারী ❤️" && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => router.push("/home")}
          className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform active:scale-95"
        >
          শুরু করি
        </motion.button>
      )}
    </div>
  );
}
