"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Coupons() {
  const router = useRouter();
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const coupons = [
    { id: 1, title: "ফ্রি আলিঙ্গন", desc: "যেকোনো সময় ব্যবহারযোগ্য। কোনো প্রশ্ন করা হবে না।" },
    { id: 2, title: "মুভি নাইট", desc: "তুমি মুভি পছন্দ করবে, আমি পপকর্ন আনব।" },
    { id: 3, title: "কফি ডেট", desc: "আমার ট্রিট। চলো তোমার প্রিয় কফি খেয়ে আসি।" },
    { id: 4, title: "একসাথে সকালের নাস্তা", desc: "তুমি আরাম করো, আমি নাস্তা বানাব।" },
    { id: 5, title: "আনলিমিটেড আদর", desc: "একটি পুরো সন্ধ্যার আদরের জন্য বৈধ।" },
    { id: 6, title: "ম্যাসাজ কুপন", desc: "একটি ৩০ মিনিটের ব্যাক বা ফুট ম্যাসাজের জন্য।" },
  ];

  const handleRedeem = (id: number) => {
    if (redeemed.includes(id)) return;
    setRedeemed([...redeemed, id]);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="flex-1 p-6 flex flex-col overflow-y-auto pb-12">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">লাভ কুপন 🎟️</h1>

      <div className="flex flex-col gap-4">
        {coupons.map((coupon, i) => {
          const isRedeemed = redeemed.includes(coupon.id);
          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border-2 border-dashed ${isRedeemed ? 'bg-gray-100 border-gray-300' : 'bg-orange-50 border-orange-400 shadow-md'}`}
            >
              <div className="p-5 flex flex-col gap-2">
                <h3 className={`font-bold text-lg ${isRedeemed ? 'text-gray-400 line-through' : 'text-orange-600'}`}>{coupon.title}</h3>
                <p className={`text-sm ${isRedeemed ? 'text-gray-400' : 'text-orange-800/80'}`}>{coupon.desc}</p>
                
                <button 
                  onClick={() => handleRedeem(coupon.id)}
                  disabled={isRedeemed}
                  className={`mt-4 py-2 font-bold rounded-lg uppercase tracking-wider text-sm transition-all ${isRedeemed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                  {isRedeemed ? "ব্যবহৃত" : "এখন ব্যবহার করো"}
                </button>
              </div>

              {isRedeemed && (
                <div className="absolute top-2 right-2 text-green-500 bg-white rounded-full">
                  <CheckCircle2 size={32} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
