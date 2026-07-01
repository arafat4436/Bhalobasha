"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MailOpen, RefreshCw, MessageCircleHeart } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { fetchLatestTelegramReply } from "../actions/telegram";

export default function ReadReply() {
  const router = useRouter();
  const [lastSentLetter, setLastSentLetter] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for the last sent letter
    const saved = localStorage.getItem("lastSentLetter");
    if (saved) {
      setLastSentLetter(saved);
    }
  }, []);

  const handleCheckReply = async () => {
    setIsChecking(true);
    setError(null);
    
    try {
      const response = await fetchLatestTelegramReply();
      if (response.success && response.text) {
        setReply(response.text);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#ffc0cb', '#ff69b4']
        });
      } else {
        setError("এখনো কোনো নতুন চিঠি আসেনি। হয়তো সে ব্যস্ত আছে! ❤️");
      }
    } catch (err) {
      setError("চেক করতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করো!");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex-1 p-6 flex flex-col relative h-full">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-rose-600 mb-6 text-center flex justify-center items-center gap-2">
        <MailOpen /> তার উত্তর
      </h1>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-8">
        {/* Context Section (What she wrote) */}
        <AnimatePresence>
          {lastSentLetter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 border-l-4 border-rose-300"
            >
              <p className="text-xs font-bold text-romantic-text/60 mb-2 uppercase tracking-wide">
                তুমি লিখেছিলে:
              </p>
              <p className="text-romantic-text font-semibold italic">
                "{lastSentLetter}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Down Arrow separator */}
        {lastSentLetter && (
          <div className="flex justify-center text-rose-300">
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowLeft size={24} className="-rotate-90" />
            </motion.div>
          </div>
        )}

        {/* Reply Section */}
        <AnimatePresence mode="wait">
          {!reply ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-10 gap-4"
            >
              <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-2">
                <MessageCircleHeart size={40} className="fill-rose-200" />
              </div>
              <p className="text-center text-romantic-text/80 text-sm px-4">
                সে কি কোনো উত্তর দিয়েছে? নিচে চেক করো!
              </p>
              
              {error && (
                <p className="text-center text-rose-500 text-sm font-semibold mt-2 px-4 bg-white/50 p-3 rounded-xl border border-rose-100">
                  {error}
                </p>
              )}

              <button 
                onClick={handleCheckReply}
                disabled={isChecking}
                className="mt-4 bg-rose-500 disabled:bg-rose-300 text-white font-bold py-3 px-8 rounded-full shadow-lg flex justify-center items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                {isChecking ? (
                  <span className="flex items-center gap-2">পাখির জন্য অপেক্ষা করছি... <RefreshCw size={18} className="animate-spin" /></span>
                ) : (
                  <>চিঠি চেক করো <RefreshCw size={18} /></>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reply"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass-card p-6 border-l-4 border-rose-500 bg-white/60"
            >
              <p className="text-xs font-bold text-rose-500 mb-4 uppercase tracking-wide">
                তার উত্তর:
              </p>
              <div className="text-romantic-text" style={{ fontFamily: "'Dancing Script', cursive, sans-serif", fontSize: "1.4rem", lineHeight: "1.8" }}>
                আমার ভালোবাসা,<br/><br/>
                {reply}<br/><br/>
                - ইতি, তোমার স্বামী ❤️
              </div>

              <button 
                onClick={handleCheckReply}
                disabled={isChecking}
                className="mt-8 text-rose-500 text-sm font-bold flex items-center justify-center gap-2 w-full p-2 rounded-xl hover:bg-white/50 transition-colors"
              >
                {isChecking ? <RefreshCw size={16} className="animate-spin" /> : "আবার চেক করো"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
