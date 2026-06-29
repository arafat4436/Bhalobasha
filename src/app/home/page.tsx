"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Heart, Calendar, Smile, ShieldAlert, Image as ImageIcon, Ticket, Quote, Gift, Activity, Trophy, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomeDashboard() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good Morning Sunshine ☀️");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning Sunshine ☀️");
    else if (hour < 18) setGreeting("Good Afternoon Beautiful 🌸");
    else setGreeting("Good Evening My Favorite Person 🌙");
  }, []);

  const features = [
    { title: "Will You Love Me?", icon: <Heart size={24} />, route: "/love", color: "text-red-500" },
    { title: "Ghuraghuri Planner", icon: <Calendar size={24} />, route: "/planner", color: "text-blue-500" },
    { title: "Mood Detector", icon: <Smile size={24} />, route: "/mood", color: "text-yellow-500" },
    { title: "Today's Hug Meter", icon: <Activity size={24} />, route: "/hug-meter", color: "text-green-500" },
    { title: "Fine Calculator", icon: <ShieldAlert size={24} />, route: "/fine-calculator", color: "text-purple-500" },

    { title: "Love Coupons", icon: <Ticket size={24} />, route: "/coupons", color: "text-orange-500" },
    { title: "Daily Quotes", icon: <Quote size={24} />, route: "/quotes", color: "text-teal-500" },
    { title: "Gift Box", icon: <Gift size={24} />, route: "/gift", color: "text-indigo-500" },
    { title: "Dashboard", icon: <Activity size={24} />, route: "/dashboard", color: "text-cyan-500" },
    { title: "Achievements", icon: <Trophy size={24} />, route: "/achievements", color: "text-amber-500" },
    { title: "Open When...", icon: <Mail size={24} />, route: "/open-when", color: "text-rose-500" },
    { title: "Final Letter", icon: <Heart size={24} />, route: "/ending", color: "text-red-600" },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto pb-12">
      <header className="glass-card p-6 flex flex-col gap-2 relative overflow-hidden">
        <motion.div 
          className="absolute -right-4 -top-4 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Heart size={100} />
        </motion.div>
        
        <h1 className="font-bold text-2xl text-pink-600 z-10">{greeting}</h1>
        <p className="text-sm text-romantic-text/80 z-10">Today&apos;s Mission: Smile & Be Happy</p>
        
        <div className="flex justify-between items-end mt-4 z-10">
          <div>
            <p className="text-xs text-romantic-text/60 uppercase font-bold tracking-wider">Status</p>
            <p className="font-bold text-lg">In Love ❤️</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-romantic-text/60 uppercase font-bold tracking-wider">Love Level</p>
            <p className="font-bold text-2xl text-pink-500">100%</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {features.map((item, idx) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => router.push(item.route)}
            className="glass-card p-4 aspect-square flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white/40 transition-colors"
          >
            <div className={`p-3 bg-white/50 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <span className="font-semibold text-sm text-romantic-text">{item.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
