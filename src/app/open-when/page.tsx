"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OpenWhen() {
  const router = useRouter();
  const [openLetter, setOpenLetter] = useState<string | null>(null);

  const letters = [
    { title: "Open when you're sad", content: "Hey beautiful, whatever is making you sad right now, just know that I am here for you. You are the strongest person I know. I love you.", locked: false },
    { title: "Open when you miss me", content: "I miss you too! Close your eyes and imagine a big, warm hug. I'll be with you soon.", locked: false },
    { title: "Open after an argument", content: "I'm sorry. We are a team, and our love is bigger than any argument. Let's make up and eat some good food.", locked: false },
    { title: "Open on our anniversary", content: "Happy Anniversary my love! Every year gets better and better with you.", locked: true },
    { title: "Open on your birthday", content: "Happy Birthday to the most amazing wife in the universe! You deserve everything.", locked: true },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col relative">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit relative z-10">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-rose-600 mb-6 text-center relative z-10">Open When... 💌</h1>

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
              <Mail size={20} className={letter.locked ? "text-gray-400" : "text-rose-500"} />
              <span className={`font-semibold ${letter.locked ? "text-gray-500" : "text-rose-700"}`}>
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
              <p className="text-slate-800 text-lg leading-[28px] pt-1" style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}>
                {openLetter}
              </p>
              <div className="mt-8 text-right font-bold text-slate-800">
                - Forever Yours
              </div>
              <button 
                onClick={() => setOpenLetter(null)}
                className="mt-8 bg-slate-800 text-white px-6 py-2 rounded-full font-bold w-full"
              >
                Put back in envelope
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
