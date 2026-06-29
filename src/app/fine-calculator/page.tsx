"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { sendTelegramMessage } from "../actions/telegram";

export default function FineCalculator() {
  const router = useRouter();
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(false);

  const [crimes, setCrimes] = useState({
    ignored: false,
    forgot: false,
    waited: false,
    cute: false
  });

  const handleCalculate = async () => {
    setCalculating(true);
    
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 2500));
    
    // Prepare message based on selected crimes
    const selectedCrimes = [];
    if (crimes.ignored) selectedCrimes.push("আমার মেসেজ ইগনোর করেছো");
    if (crimes.forgot) selectedCrimes.push("রিপ্লাই দিতে ভুলে গেছো");
    if (crimes.waited) selectedCrimes.push("আমাকে অপেক্ষা করিয়েছো");
    if (crimes.cute) selectedCrimes.push("অতিরিক্ত কিউট হয়ে আছো");

    const crimeList = selectedCrimes.length > 0 ? selectedCrimes.join(", ") : "বিনা কারণে দুষ্টামি";
    const telegramMessage = `🚨 *নতুন জরিমানা অ্যালার্ট!* 🚨\n\nতোমার স্ত্রী তোমাকে জরিমানা করেছে!\n\n📌 অপরাধ: ${crimeList}\n💰 জরিমানা: ২ আলিঙ্গন, ৪ চুমু, ১ আইসক্রিম\n\nতাড়াতাড়ি পরিশোধ করো! ⚖️`;

    await sendTelegramMessage(telegramMessage);

    setCalculating(false);
    setResult(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="flex-1 p-6 flex flex-col">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-purple-600 mb-6 text-center flex justify-center items-center gap-2">
        <Calculator /> জরিমানা ক্যালকুলেটর ⚖️
      </h1>

      <AnimatePresence mode="wait">
        {!calculating && !result && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card p-6 flex flex-col gap-6"
          >
            <p className="text-sm font-bold mb-2">তোমার সাম্প্রতিক অপরাধগুলো বেছে নাও:</p>
            
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.ignored} onChange={e => setCrimes({...crimes, ignored: e.target.checked})} />
              <span className="font-semibold text-sm">আমার মেসেজ ইগনোর করেছো?</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.forgot} onChange={e => setCrimes({...crimes, forgot: e.target.checked})} />
              <span className="font-semibold text-sm">রিপ্লাই দিতে ভুলে গেছো?</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.waited} onChange={e => setCrimes({...crimes, waited: e.target.checked})} />
              <span className="font-semibold text-sm">আমাকে অপেক্ষা করিয়েছো?</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.cute} onChange={e => setCrimes({...crimes, cute: e.target.checked})} />
              <span className="font-semibold text-sm">অতিরিক্ত কিউট হয়ে আছো?</span>
            </label>

            <button 
              onClick={handleCalculate}
              className="mt-4 bg-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-600"
            >
              জরিমানা হিসাব করো
            </button>
          </motion.div>
        )}

        {calculating && (
          <motion.div
            key="calc"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card p-10 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="font-bold text-purple-600 animate-pulse">প্রমাণ যাচাই করা হচ্ছে...</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 flex flex-col items-center text-center gap-6"
          >
            <h2 className="text-xl font-bold">হিসাবের ফলাফল: দোষী 🚨</h2>
            
            <div className="w-full bg-red-100 p-5 rounded-2xl border-2 border-red-300">
              <p className="text-xs uppercase font-black text-red-500 mb-4 tracking-widest">মোট জরিমানার পরিমাণ</p>
              <ul className="text-left font-bold text-lg flex flex-col gap-3">
                <li className="flex justify-between border-b border-red-200 pb-2"><span>🫂 আলিঙ্গন</span> <span>২</span></li>
                <li className="flex justify-between border-b border-red-200 pb-2"><span>😘 চুমু</span> <span>৪</span></li>
                <li className="flex justify-between border-b border-red-200 pb-2"><span>🍦 আইসক্রিম</span> <span>১</span></li>
                <li className="flex justify-between text-red-600"><span>🙏 ক্ষমা প্রার্থনা</span> <span>অসীম</span></li>
              </ul>
            </div>

            <p className="text-sm italic font-semibold text-romantic-text/70 mt-2">
              দয়া করে অবিলম্বে জরিমানা পরিশোধ করো। ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
