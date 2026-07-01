"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

export default function Ending() {
  const router = useRouter();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000); // fade in envelope
    const t2 = setTimeout(() => setStage(2), 5000); // open letter
    const t3 = setTimeout(() => {
      setStage(3);
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.8 }, colors: ['#ff0000', '#ffc0cb', '#ff69b4'] });
    }, 7000); // text appears

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <AnimatePresence>
        {stage === 0 && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="text-white text-lg font-light tracking-widest animate-pulse"
          >
            ...
          </motion.div>
        )}

        {stage >= 1 && stage < 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-6xl"
          >
            ✉️
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm bg-[#fdfbf7] p-8 rounded-xl shadow-2xl relative"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e8e0d5 28px)', backgroundAttachment: 'local' }}
          >
            {stage >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <p className="text-slate-800 text-xl leading-[28px] pt-1" style={{ fontFamily: "var(--font-patrick-hand), cursive, sans-serif" }}>
                  আমার রাজকুমারী স্ত্রীর প্রতি,<br/><br/>
                  আমাদের ছোট্ট জগতটি ঘুরে দেখার জন্য তোমাকে ধন্যবাদ। এখানে আমি যা কিছু বানিয়েছি, তা আমার জীবনে তোমার গুরুত্বের খুব সামান্য একটা প্রতিফলন মাত্র।<br/><br/>
                  তুমিই আমার সুখ, তুমিই আমার শান্তি, এবং তুমিই আমার সবচেয়ে প্রিয় অ্যাডভেঞ্চার।<br/><br/>
                  আমি তোমাকে ভালোবাসি।<br/><br/>
                </p>
                <div className="text-right font-bold text-slate-800 mt-4 flex items-center justify-end gap-2">
                  চিরকাল তোমারই <Heart size={16} className="text-red-500 fill-red-500" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {stage >= 3 && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
          onClick={() => router.push("/home")}
          className="absolute bottom-8 bg-white/10 text-white/50 px-6 py-2 rounded-full hover:bg-white/20 transition-colors"
        >
          হোমে ফিরে যাও
        </motion.button>
      )}
    </div>
  );
}
