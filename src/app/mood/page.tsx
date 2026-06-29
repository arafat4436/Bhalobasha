"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MoodChecker() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { emoji: "😄", label: "খুশি", response: "ইয়ে! তোমাকে খুশি দেখতে পারাই আমার সবচেয়ে প্রিয় কাজ! সবসময় এভাবেই হাসতে থেকো! ✨" },
    { emoji: "😢", label: "মন খারাপ", response: "ওহ না! তোমাকে ১,০০০ টা ভার্চুয়াল আলিঙ্গন পাঠাচ্ছি! আমি সবসময় তোমার পাশেই আছি, ভালোবাসা। 🫂❤️" },
    { emoji: "😠", label: "রাগী", response: "লোড হচ্ছে...\nজরুরী স্বামী পাঠানো হচ্ছে...\nখুব তাড়াতাড়ি পৌঁছে যাব! ❤️🏃‍♂️💨" },
    { emoji: "😴", label: "ঘুম ঘুম", response: "ঘুমানোর সময় হয়ে গেছে! গিয়ে বিশ্রাম নাও, সুন্দরী। মিষ্টি স্বপ্ন! 🛌🌙" },
    { emoji: "🤩", label: "উত্তেজিত", response: "আমি তোমার এই এনার্জি খুব ভালোবাসি! চলো একসাথে মজার কিছু করি! 🎉" },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-pink-600 mb-2 text-center">মুড ডিটেক্টর 📡</h1>
      <p className="text-center text-sm text-romantic-text/80 mb-8">আমার সুন্দরী স্ত্রীর আজ কেমন লাগছে?</p>

      <div className="grid grid-cols-2 gap-4">
        {moods.map(mood => (
          <motion.button
            key={mood.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood.label)}
            className="glass-card p-6 flex flex-col items-center gap-2 hover:bg-white/40"
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className="font-bold text-romantic-text">{mood.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedMood(null)}
          >
            <motion.div 
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-4"
              onClick={e => e.stopPropagation()}
            >
              <span className="text-6xl">{moods.find(m => m.label === selectedMood)?.emoji}</span>
              <h3 className="text-xl font-bold">
                {moods.find(m => m.label === selectedMood)?.response.split("\n").map((line, i) => (
                  <span key={i}>{line}<br/></span>
                ))}
              </h3>
              <button 
                onClick={() => setSelectedMood(null)}
                className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full font-bold"
              >
                বন্ধ করো
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
