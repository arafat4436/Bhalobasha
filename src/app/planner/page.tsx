"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Planner() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ place: "", date: "", time: "" });

  const places = [
    "Coffee ☕", "Restaurant 🍽️", "Long Drive 🚗", 
    "Movie 🍿", "Sea 🌊", "Hill ⛰️", 
    "Shopping 🛍️", "Anywhere With You ❤️"
  ];

  const handlePlace = (p: string) => {
    setData({ ...data, place: p });
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // In a real app, save to localStorage here
    localStorage.setItem("ghuraghuri-plan", JSON.stringify(data));
  };

  return (
    <div className="flex-1 p-6 flex flex-col">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">Ghuraghuri Planner 🗺️</h1>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-center mb-2">Where do you want to go?</h2>
            <div className="grid grid-cols-2 gap-3">
              {places.map(p => (
                <button
                  key={p}
                  onClick={() => handlePlace(p)}
                  className="glass-card p-4 text-sm font-semibold hover:bg-pink-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit}
            className="glass-card p-6 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-pink-600 bg-pink-50 p-3 rounded-lg">
              <MapPin size={20} />
              <span className="font-bold">{data.place}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold flex items-center gap-2"><CalendarIcon size={16}/> Date</label>
              <input 
                type="date" required
                value={data.date} onChange={e => setData({...data, date: e.target.value})}
                className="p-3 rounded-xl border border-pink-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold flex items-center gap-2"><Clock size={16}/> Time</label>
              <input 
                type="time" required
                value={data.time} onChange={e => setData({...data, time: e.target.value})}
                className="p-3 rounded-xl border border-pink-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <button type="submit" className="bg-pink-500 text-white font-bold p-4 rounded-xl mt-4 hover:bg-pink-600 transition-colors">
              Confirm Date
            </button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-6 mt-10"
          >
            <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
              <div className="bg-red-500 h-10 w-full"></div>
              <div className="flex-1 flex items-center justify-center text-4xl font-bold text-gray-800">
                {data.date ? new Date(data.date).getDate() : "14"}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-pink-600">It's a Date!</h2>
            <p className="text-lg text-romantic-text italic">
              "I'll be waiting for this day more than you know. ❤️"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
