"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OpenWhen() {
  const router = useRouter();
  const [openLetter, setOpenLetter] = useState<string | null>(null);

  const letters = [
    { title: "খুলবে যখন তোমার মন খারাপ থাকবে", content: "ওহে রাজকুমারী, যেই কারণেই তোমার মন খারাপ হোক না কেন, জেনে রেখো আমি তোমার পাশে আছি। তুমি আমার চেনা সবচেয়ে শক্তিশালী মানুষ। আমি তোমাকে ভালোবাসি।", locked: false },
    { title: "খুলবে যখন তুমি আমাকে মিস করবে", content: "আমিও তোমাকে মিস করছি! চোখ বন্ধ করো আর একটা বিশাল, উষ্ণ আলিঙ্গনের কথা ভাবো। আমি খুব তাড়াতাড়ি তোমার কাছে আসছি।", locked: false },
    { title: "খুলবে যখন আমাদের ঝগড়া হবে", content: "আমাকে মাফ করে দিও। আমরা একটা দল, এবং আমাদের ভালোবাসা যেকোনো ঝগড়ার চেয়ে অনেক বড়। চলো সব ভুলে গিয়ে একসাথে ভালো কিছু খাই।", locked: false },
    { title: "খুলবে আমাদের বিবাহবার্ষিকীতে", content: "শুভ বিবাহবার্ষিকী আমার ভালোবাসা! তোমার সাথে প্রতিটি বছর আরও সুন্দর হয়ে উঠছে।", locked: true },
    { title: "খুলবে তোমার জন্মদিনে", content: "মহাবিশ্বের সবচেয়ে আশ্চর্যজনক স্ত্রীকে শুভ জন্মদিন! তোমার সব ভালো কিছু প্রাপ্য।", locked: true },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col relative">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit relative z-10">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-rose-600 mb-6 text-center relative z-10">খুলবে যখন... 💌</h1>

      <div className="grid grid-cols-1 gap-4 relative z-10">
        {letters.map((letter, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: letter.locked ? 1 : 1.02 }}
            whileTap={{ scale: letter.locked ? 1 : 0.98 }}
            onClick={() => !letter.locked && setOpenLetter(letter.content)}
            className={`p-5 rounded-2xl flex items-center justify-between border-2 ${letter.locked ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-70' : 'bg-rose-50 border-rose-200 cursor-pointer shadow-sm hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <Mail size={20} className={letter.locked ? "text-gray-400 min-w-[20px]" : "text-rose-500 min-w-[20px]"} />
              <span className={`font-semibold text-sm ${letter.locked ? "text-gray-500" : "text-rose-700"}`}>
                {letter.title}
              </span>
            </div>
            {letter.locked && <Lock size={16} className="text-gray-400" />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openLetter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setOpenLetter(null)}
          >
            <div 
              className="bg-[#fdfbf7] border border-[#e8e0d5] shadow-2xl rounded-lg p-8 max-w-sm w-full relative"
              style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e8e0d5 28px)', backgroundAttachment: 'local' }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-slate-800 text-lg leading-[28px] pt-1" style={{ fontFamily: "var(--font-patrick-hand), cursive, sans-serif" }}>
                {openLetter}
              </p>
              <div className="mt-8 text-right font-bold text-slate-800">
                - চিরকাল তোমারই
              </div>
              <button 
                onClick={() => setOpenLetter(null)}
                className="mt-8 bg-slate-800 text-white px-6 py-2 rounded-full font-bold w-full"
              >
                আবার খামে ভরে রাখো
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
