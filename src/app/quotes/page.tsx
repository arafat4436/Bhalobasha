"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Quote as QuoteIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DailyQuotes() {
  const router = useRouter();
  const [quote, setQuote] = useState("");

  const quotes = [
    "You're my favorite notification. 📱",
    "Home is wherever you're standing. 🏡",
    "I'd still choose you in every lifetime. ✨",
    "Best decision ever: Marrying you. 💍",
    "You are my today and all of my tomorrows. ❤️",
    "I love you more than pizza. And that's saying a lot. 🍕",
    "Every love story is beautiful, but ours is my favorite. 📖",
    "I fall for you more and more every day. 🥰",
    "You are the peanut butter to my jelly. 🥜",
    "Together with you is my favorite place to be. 🌍"
  ];

  useEffect(() => {
    // Pick random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="flex-1 p-6 flex flex-col justify-center">
      <div className="absolute top-6 left-6 z-10">
        <button onClick={() => router.push("/home")} className="p-2 bg-white/30 rounded-full w-fit">
          <ArrowLeft size={24} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-10 flex flex-col items-center text-center gap-6 relative overflow-hidden"
      >
        <QuoteIcon size={60} className="text-teal-200 absolute -top-4 -left-4 opacity-50 rotate-180" />
        <QuoteIcon size={60} className="text-teal-200 absolute -bottom-4 -right-4 opacity-50" />

        <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 mb-4">Daily Love Quote</h2>
        
        <p className="text-2xl font-bold text-teal-800 leading-relaxed italic z-10">
          "{quote}"
        </p>

        <div className="mt-8 bg-teal-50 border-teal-200 border p-3 rounded-xl w-full">
          <p className="text-xs uppercase font-bold text-teal-500 mb-1">Marriage Update:</p>
          <p className="font-bold text-teal-700">Best decision ever. ❤️</p>
        </div>
      </motion.div>
    </div>
  );
}
