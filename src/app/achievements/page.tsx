"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Lock, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Achievements() {
  const router = useRouter();

  const achievements = [
    { title: "Made Wife Smile", desc: "Opened the app today.", unlocked: true, icon: "😊" },
    { title: "Forever Together", desc: "Successfully clicked the YES button.", unlocked: true, icon: "❤️" },
    { title: "Master Planner", desc: "Planned a Ghuraghuri date.", unlocked: false, icon: "🗺️" },
    { title: "Master Explorer", desc: "Found the secret page.", unlocked: false, icon: "🕵️‍♀️" },
    { title: "Appreciated", desc: "Redeemed your first love coupon.", unlocked: false, icon: "🎟️" },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col overflow-y-auto pb-12">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-amber-600 mb-6 text-center flex justify-center items-center gap-2">
        <Trophy /> Achievements
      </h1>

      <div className="flex flex-col gap-4">
        {achievements.map((ach, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-2xl flex items-center gap-4 border-2 ${ach.unlocked ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60'}`}
          >
            <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-xl ${ach.unlocked ? 'bg-amber-200' : 'bg-gray-200'}`}>
              {ach.unlocked ? ach.icon : <Lock size={20} className="text-gray-400" />}
            </div>
            
            <div className="flex-1">
              <h3 className={`font-bold ${ach.unlocked ? 'text-amber-800' : 'text-gray-500'}`}>
                {ach.title}
              </h3>
              <p className={`text-xs ${ach.unlocked ? 'text-amber-600/80' : 'text-gray-400'}`}>
                {ach.desc}
              </p>
            </div>

            {ach.unlocked && <Star size={20} className="text-amber-400 fill-amber-400" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
