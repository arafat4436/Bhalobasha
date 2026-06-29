"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

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

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setResult(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }, 2500);
  };

  return (
    <div className="flex-1 p-6 flex flex-col">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-purple-600 mb-6 text-center flex justify-center items-center gap-2">
        <Calculator /> Fine Calculator ⚖️
      </h1>

      <AnimatePresence mode="wait">
        {!calculating && !result && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card p-6 flex flex-col gap-6"
          >
            <p className="text-sm font-bold mb-2">Select your recent crimes:</p>
            
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.ignored} onChange={e => setCrimes({...crimes, ignored: e.target.checked})} />
              <span className="font-semibold text-sm">Ignored my message?</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.forgot} onChange={e => setCrimes({...crimes, forgot: e.target.checked})} />
              <span className="font-semibold text-sm">Forgot to reply?</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.waited} onChange={e => setCrimes({...crimes, waited: e.target.checked})} />
              <span className="font-semibold text-sm">Made me wait?</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white/50 rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-purple-500" 
                checked={crimes.cute} onChange={e => setCrimes({...crimes, cute: e.target.checked})} />
              <span className="font-semibold text-sm">Being too cute?</span>
            </label>

            <button 
              onClick={handleCalculate}
              className="mt-4 bg-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-600"
            >
              Calculate Fine
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
            <p className="font-bold text-purple-600 animate-pulse">Reviewing Evidence...</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 flex flex-col items-center text-center gap-6"
          >
            <h2 className="text-xl font-bold">Calculation Result: GUILTY 🚨</h2>
            
            <div className="w-full bg-red-100 p-5 rounded-2xl border-2 border-red-300">
              <p className="text-xs uppercase font-black text-red-500 mb-4 tracking-widest">Total Penalty Owed</p>
              <ul className="text-left font-bold text-lg flex flex-col gap-3">
                <li className="flex justify-between border-b border-red-200 pb-2"><span>🫂 Hugs</span> <span>2</span></li>
                <li className="flex justify-between border-b border-red-200 pb-2"><span>😘 Kisses</span> <span>4</span></li>
                <li className="flex justify-between border-b border-red-200 pb-2"><span>🍦 Ice Cream</span> <span>1</span></li>
                <li className="flex justify-between text-red-600"><span>🙏 Apologies</span> <span>Unlimited</span></li>
              </ul>
            </div>

            <p className="text-sm italic font-semibold text-romantic-text/70 mt-2">
              Please pay your fines immediately. ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
