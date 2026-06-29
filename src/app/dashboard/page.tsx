"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertTriangle, Heart, Clock, BatteryCharging } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const metrics = [
    { title: "রিলেশনশিপ আপটাইম", value: "৯৯.৯৯%", icon: <Clock size={20} className="text-cyan-500" /> },
    { title: "লাভ স্টোরেজ", value: "আনলিমিটেড টিবি", icon: <Heart size={20} className="text-red-500" /> },
    { title: "বিশ্বাসের মাত্রা", value: "সর্বোচ্চ", icon: <CheckCircle size={20} className="text-green-500" /> },
    { title: "সুখের পরিমাণ", value: "১০০%", icon: <BatteryCharging size={20} className="text-yellow-500" /> },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col overflow-y-auto pb-12 bg-slate-50/50">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/50 shadow-sm rounded-full w-fit">
        <ArrowLeft size={24} className="text-slate-700" />
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        রিলেশনশিপ সিস্টেম
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              {m.icon}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.title}</p>
            <p className="text-lg font-black text-slate-700">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" /> 
          বাগ রিপোর্ট
        </h2>
        <div className="flex justify-between items-center py-2 border-b border-slate-50">
          <span className="font-semibold text-slate-600 text-sm">মোট বাগ পাওয়া গেছে</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">০ (নিখুঁত)</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <CheckCircle size={16} className="text-blue-500" /> 
          জ্ঞাত সমস্যা
        </h2>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="font-bold text-slate-700 text-sm">সমস্যা #০০১: অতিরিক্ত কিউট</p>
          <p className="text-xs text-slate-500 mt-1">স্ট্যাটাস: সমাধানযোগ্য নয়। চিরকাল কিউটই থাকবে।</p>
        </div>
      </div>
    </div>
  );
}
