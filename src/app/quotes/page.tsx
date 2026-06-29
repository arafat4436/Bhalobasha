"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Quote as QuoteIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DailyQuotes() {
  const router = useRouter();
  const [quote, setQuote] = useState("");

  const quotes = [
    "তুমি আমার সবচেয়ে প্রিয় নোটিফিকেশন। 📱",
    "যেখানে তুমি আছো, সেটাই আমার কাছে বাড়ি। 🏡",
    "আমি প্রতিটা জন্মেই শুধু তোমাকেই বেছে নেব। ✨",
    "আমার জীবনের সেরা সিদ্ধান্ত: তোমাকে বিয়ে করা। 💍",
    "তুমি আমার আজকের দিন এবং আগামী সব আগামীকাল। ❤️",
    "আমি তোমাকে পিজ্জার চেয়েও বেশি ভালোবাসি। আর এটা অনেক বড় একটা কথা। 🍕",
    "প্রতিটা প্রেমের গল্পই সুন্দর, তবে আমাদের গল্পটা আমার সবচেয়ে প্রিয়। 📖",
    "আমি প্রতিদিন তোমার প্রেমে আরও বেশি করে পড়ি। 🥰",
    "তুমি আর আমি যেন মেড ফর ইচ আদার। 🥜",
    "তোমার সাথে থাকাই আমার সবচেয়ে প্রিয় জায়গা। 🌍"
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

        <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 mb-4">আজকের উক্তি</h2>
        
        <p className="text-2xl font-bold text-teal-800 leading-relaxed italic z-10">
          "{quote}"
        </p>

        <div className="mt-8 bg-teal-50 border-teal-200 border p-3 rounded-xl w-full">
          <p className="text-xs uppercase font-bold text-teal-500 mb-1">বিয়ে আপডেট:</p>
          <p className="font-bold text-teal-700">জীবনের সেরা সিদ্ধান্ত। ❤️</p>
        </div>
      </motion.div>
    </div>
  );
}
