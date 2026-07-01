"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PenTool, Send, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { sendTelegramMessage } from "../actions/telegram";

export default function WriteLetter() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    const telegramMessage = `💌 *নতুন প্রেমের চিঠি!* 💌\n\nতোমার স্ত্রী তোমাকে একটি চিঠি পাঠিয়েছে:\n\n"${message.trim()}"\n\n- ইতি, তোমার ভালোবাসা ❤️`;
    
    await sendTelegramMessage(telegramMessage);
    
    setIsSending(false);
    setSent(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ffc0cb', '#ff69b4']
    });
  };

  return (
    <div className="flex-1 p-6 flex flex-col relative h-full">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-rose-600 mb-6 text-center flex justify-center items-center gap-2">
        <PenTool /> আমাকে কিছু লেখো
      </h1>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="compose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col gap-4"
          >
            <div className="glass-card flex-1 p-6 flex flex-col">
              <p className="text-sm font-bold text-romantic-text/80 mb-4">
                তোমার মনে যা আছে, লিখে ফেলো...
              </p>
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আমি তোমাকে অনেক ভালোবাসি..."
                className="flex-1 w-full bg-white/50 rounded-2xl p-4 text-romantic-text font-semibold focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                style={{ fontFamily: "'Dancing Script', cursive, sans-serif", fontSize: "1.2rem", lineHeight: "1.8" }}
              />
            </div>

            <button 
              onClick={handleSend}
              disabled={!message.trim() || isSending}
              className="mt-2 bg-rose-500 disabled:bg-rose-300 text-white font-bold py-4 rounded-full shadow-lg flex justify-center items-center gap-2"
            >
              {isSending ? (
                <span className="animate-pulse flex items-center gap-2">পাখির মাধ্যমে পাঠানো হচ্ছে... 🕊️</span>
              ) : (
                <>
                  পাঠিয়ে দাও <Send size={20} />
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-6"
          >
            <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-4">
              <Heart size={48} className="fill-rose-500" />
            </div>
            <h2 className="text-3xl font-black text-rose-600">চিঠি পৌঁছে গেছে!</h2>
            <p className="text-romantic-text font-semibold">
              তোমার কথাগুলো সরাসরি তার কাছে পাঠানো হয়েছে। সে নিশ্চয়ই খুব খুশি হবে! 🥰
            </p>
            <button 
              onClick={() => {
                setMessage("");
                setSent(false);
              }}
              className="mt-6 bg-white/50 text-rose-600 font-bold py-3 px-8 rounded-full border-2 border-rose-200"
            >
              আরেকটি লেখো
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
