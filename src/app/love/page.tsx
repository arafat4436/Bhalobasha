"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WillYouLoveMe() {
  const router = useRouter();
  const [noClicks, setNoClicks] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);

  const handleNoHover = () => {
    setNoClicks((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setYesClicked(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6 w-full flex justify-between pr-12">
        <button onClick={() => router.push("/home")} className="p-2 bg-white/30 rounded-full">
          <ArrowLeft size={24} />
        </button>
      </div>

      {!yesClicked ? (
        <motion.div 
          className="text-center w-full flex flex-col items-center gap-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-3xl font-bold text-pink-600">তুমি কি আমাকে চিরকাল ভালোবাসবে? 🥺</h1>
          
          <div className="flex flex-col gap-6 w-full max-w-[200px] relative h-[200px]">
            <motion.button
              onClick={handleYesClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-pink-500 text-white font-bold py-4 rounded-full shadow-lg z-10"
            >
              হ্যাঁ ❤️
            </motion.button>

            {noClicks < 5 ? (
              <motion.button
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                animate={{
                  x: noClicks > 0 ? (Math.random() - 0.5) * 200 : 0,
                  y: noClicks > 0 ? (Math.random() - 0.5) * 200 : 0,
                  scale: 1 - (noClicks * 0.1),
                  rotate: noClicks * 15
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-full bg-gray-300 text-gray-700 font-bold py-4 rounded-full absolute top-[80px]"
              >
                না 💔
              </motion.button>
            ) : (
              <div className="absolute top-[80px] w-full text-center text-xs text-gray-400 font-semibold animate-pulse">
                এই অপশনটি চিরস্থায়ীভাবে বন্ধ করা হয়েছে।
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-8 flex flex-col items-center gap-4"
        >
          <span className="text-6xl">🥰</span>
          <h2 className="text-2xl font-bold text-pink-600">আমি জানতাম তুমি সঠিক উত্তরটাই বেছে নেবে ❤️</h2>
          <div className="mt-4 p-4 bg-pink-100 rounded-xl border border-pink-200">
            <p className="text-xs uppercase font-bold text-pink-500 mb-1">নতুন অর্জন</p>
            <p className="font-bold">চিরকাল একসাথে 🏆</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
