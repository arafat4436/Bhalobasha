"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar as CalIcon, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Planner() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const places = ["কফি ☕", "রেস্টুরেন্ট 🍽️", "লং ড্রাইভ 🚗", "সিনেমা 🍿", "সমুদ্র 🌊", "পাহাড় ⛰️", "শপিং 🛍️", "তোমার সাথে যেকোনো জায়গায় ❤️"];

  const confirmDate = () => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setStep(3);
  };

  return (
    <div className="flex-1 p-6 flex flex-col">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-blue-600 mb-8 text-center flex justify-center items-center gap-2">
        ঘুরাঘুরি প্ল্যানার 🗺️
      </h1>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4 text-center">কোথায় যেতে চাও?</h2>
            <div className="grid grid-cols-2 gap-3">
              {places.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPlace(p); setStep(2); }}
                  className="glass-card py-4 px-2 text-sm font-bold text-romantic-text hover:bg-blue-50 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-center mb-2">কখন যাবো?</h2>
            
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold flex items-center gap-2"><CalIcon size={16}/> তারিখ</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-3 rounded-xl bg-white/50 border border-white focus:outline-blue-400" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold flex items-center gap-2"><Clock size={16}/> সময়</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="p-3 rounded-xl bg-white/50 border border-white focus:outline-blue-400" />
              </div>
            </div>

            <button 
              onClick={confirmDate}
              disabled={!date || !time}
              className="mt-4 bg-blue-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-full shadow-lg"
            >
              নিশ্চিত করো
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center gap-6 mt-10">
            <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <CalIcon size={48} />
            </div>
            <h2 className="text-3xl font-black text-blue-600">এটা আমাদের ডেট!</h2>
            <div className="glass-card p-6 w-full text-left space-y-3">
              <p className="flex items-center gap-3 font-semibold"><MapPin size={20} className="text-blue-500"/> {place}</p>
              <p className="flex items-center gap-3 font-semibold"><CalIcon size={20} className="text-blue-500"/> {date}</p>
              <p className="flex items-center gap-3 font-semibold"><Clock size={20} className="text-blue-500"/> {time}</p>
            </div>
            <p className="text-sm text-romantic-text/80 font-semibold italic mt-4">
              "তুমি ধারণাও করতে পারবে না, আমি এই দিনটার জন্য কতটা অপেক্ষা করব। ❤️"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
