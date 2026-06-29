"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WillYouLoveMe() {
  const router = useRouter();
  const [noClicks, setNoClicks] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoInteraction = () => {
    if (noClicks === 0) {
      setNoPosition({ x: Math.random() * 100 - 50, y: Math.random() * -100 - 50 });
    } else if (noClicks === 1) {
      setNoPosition({ x: Math.random() * 100 - 50, y: Math.random() * 100 });
    } else if (noClicks === 2) {
      setNoPosition({ x: Math.random() * 150 - 75, y: Math.random() * 150 - 75 });
    }
    setNoClicks(prev => prev + 1);
  };

  const handleYes = () => {
    setYesClicked(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb']
    });
  };

  return (
    <div className="flex-1 p-6 flex flex-col relative overflow-hidden">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        {!yesClicked ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-8"
          >
            <h1 className="text-3xl font-bold text-pink-600">Will You Love Me Forever? 🥺</h1>
            
            <div className="flex items-center justify-center gap-6 relative w-full h-40">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg z-20"
              >
                YES ❤️
              </motion.button>

              {noClicks < 4 ? (
                <motion.button
                  animate={{ 
                    x: noPosition.x, 
                    y: noPosition.y,
                    scale: noClicks >= 2 ? 0.8 : 1,
                    rotate: noClicks >= 3 ? 180 : 0
                  }}
                  onHoverStart={handleNoInteraction}
                  onClick={handleNoInteraction}
                  className="bg-white text-pink-500 px-8 py-3 rounded-full font-bold shadow-lg absolute right-4 transition-transform z-10"
                >
                  NO 💔
                </motion.button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-10 text-xs text-red-500 bg-white/80 p-2 rounded-lg"
                >
                  "This feature has been permanently disabled."
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex-1 flex flex-col items-center justify-center text-center gap-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Heart size={100} className="text-pink-500 fill-pink-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-pink-600">
              I knew you&apos;d choose the correct answer ❤️
            </h2>
            <div className="bg-yellow-100 border-2 border-yellow-400 text-yellow-800 p-4 rounded-xl mt-4">
              <p className="text-xs uppercase font-bold tracking-wider mb-1">Achievement Unlocked</p>
              <p className="font-bold text-lg">Forever Together 🏆</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
