"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gift as GiftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function GiftBox() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [reward, setReward] = useState<string | null>(null);

  const rewards = [
    "💌 একটি ভালোবাসার চিঠি: তুমিই আমার সবকিছু।",
    "🤣 মজার রোস্ট: তুমি এখনও নাক ডাকো, কিন্তু আমি তোমাকে ভালোবাসি।",
    "🎟️ ফ্রি ম্যাসাজ কুপন তোমার ওয়ালেটে যোগ হয়েছে!",
    "✨ তুমি আনুষ্ঠানিকভাবে পৃথিবীর সবচেয়ে কিউট মানুষ।",
    "📸 একটি গোপন স্মৃতি উন্মুক্ত হলো!"
  ];

  const handleOpen = () => {
    setOpened(true);
    setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#818cf8', '#6366f1', '#4f46e5', '#fff']
    });
  };

  return (
    <div className="flex-1 p-6 flex flex-col justify-center items-center relative">
      <div className="absolute top-6 left-6 z-10">
        <button onClick={() => router.push("/home")} className="p-2 bg-white/30 rounded-full w-fit">
          <ArrowLeft size={24} />
        </button>
      </div>

      <h1 className="text-2xl font-bold text-indigo-600 mb-12 absolute top-20">দৈনিক গিফট বক্স 🎁</h1>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="box"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={handleOpen}
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <div className="w-48 h-48 bg-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-indigo-400 relative overflow-hidden">
              <div className="absolute w-8 h-full bg-indigo-300"></div>
              <div className="absolute h-8 w-full bg-indigo-300"></div>
              <GiftIcon size={80} className="text-white z-10" />
            </div>
            <p className="font-bold text-indigo-600 animate-pulse">খুলতে ট্যাপ করো!</p>
          </motion.div>
        ) : (
          <motion.div
            key="reward"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card p-8 flex flex-col items-center text-center gap-6 border-indigo-200"
          >
            <span className="text-5xl">✨</span>
            <h2 className="text-xl font-bold text-indigo-600">সারপ্রাইজ!</h2>
            <p className="text-lg font-semibold text-romantic-text bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              {reward}
            </p>
            <button 
              onClick={() => router.push("/home")}
              className="mt-4 bg-indigo-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
            >
              দারুণ!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
