"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HugMeter() {
  const router = useRouter();
  const [value, setValue] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex-1 p-6 flex flex-col">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-pink-600 mb-8 text-center">আজকের আলিঙ্গন মিটার 🫂</h1>
      
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card p-6 flex flex-col items-center gap-8"
          >
            <h2 className="text-lg font-bold text-center">তুমি আমাকে এখন কতটা মিস করছো?</h2>
            
            <div className="w-full flex flex-col gap-4">
              <input 
                type="range" min="0" max="100" 
                value={value} onChange={e => setValue(parseInt(e.target.value))}
                className="w-full h-4 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-xs font-bold text-romantic-text/60">
                <span>তেমন না</span>
                <span>অনেক বেশি!</span>
              </div>
            </div>

            <button 
              onClick={() => setSubmitted(true)}
              className="w-full bg-pink-500 text-white py-3 rounded-full font-bold text-lg hover:bg-pink-600"
            >
              নিশ্চিত করো
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 flex flex-col items-center text-center gap-6"
          >
            <h2 className="text-3xl font-bold text-red-500">ভুল। ❌</h2>
            <div className="bg-pink-100 p-4 rounded-xl w-full border border-pink-300">
              <p className="text-sm font-semibold uppercase text-pink-500 mb-1">সঠিক উত্তর:</p>
              <p className="text-4xl font-black text-pink-600 tracking-widest">অসীম ❤️</p>
            </div>
            <p className="text-sm text-romantic-text/80 italic">চেষ্টা ভালো ছিল। যাও, তোমার অসীম আলিঙ্গনগুলো নিয়ে নাও! 🤗</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
