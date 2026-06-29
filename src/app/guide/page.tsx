"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    num: "১",
    title: "তুমি কি আমাকে ভালোবাসবে? ❤️",
    desc: "আমি জানি উত্তরটা কী, তবুও প্রশ্নটা করতে ভালো লাগে। \"না\" বোতামটা ধরতে পারবে না — আমি নিশ্চিত করেছি! 😄",
  },
  {
    num: "২",
    title: "ঘুরাঘুরি প্ল্যানার 🗺️",
    desc: "কোথাও যেতে চাইলে আমাকে বলতে হবে না — এখানে জায়গা, তারিখ আর সময় ঠিক করো। আমি সঙ্গে সঙ্গে জানতে পারব।",
  },
  {
    num: "৩",
    title: "আমাকে চিঠি লেখো 💌",
    desc: "মনে যা আসে, আমাকে লিখে ফেলো। লম্বা হোক বা ছোট — আমি পড়ব। \"পাঠিয়ে দাও\" চাপলেই কথাটা আমার কাছে এসে যাবে।",
  },
  {
    num: "৪",
    title: "মুড ডিটেক্টর 😊",
    desc: "আজকে কেমন আছো? আমি সবসময় জানতে চাই। এখানে তোমার মন বেছে নাও — আমি দেখতে পাব।",
  },
  {
    num: "৫",
    title: "আজকের আলিঙ্গন মিটার 🤗",
    desc: "আজকে কতটা আলিঙ্গন চাও? স্লাইডার টেনে বলো। আমি হিসাব রাখব!",
  },
  {
    num: "৬",
    title: "জরিমানা ক্যালকুলেটর ⚖️",
    desc: "আমি কি কোনো ভুল করেছি? এখানে টিক দিয়ে আমার জরিমানা ঠিক করে দাও। আমি মেনে নেব! 😂",
  },
  {
    num: "৭",
    title: "লাভ কুপন 🎟️",
    desc: "তোমার জন্য কিছু বিশেষ কুপন রেখেছি। ট্যাপ করে দেখো কী পেলে — আর আমাকে দেখিয়ে রিডিম করো!",
  },
  {
    num: "৮",
    title: "প্রতিদিনের উক্তি 💬",
    desc: "প্রতিদিন একটা করে কথা রেখেছি তোমার জন্য। ভুলে যেও না পড়তে।",
  },
  {
    num: "৯",
    title: "গিফট বক্স 🎁",
    desc: "প্রতিদিন একটা সারপ্রাইজ আছে। বাক্সটা খোলো!",
  },
  {
    num: "১০",
    title: "ড্যাশবোর্ড 📊",
    desc: "আমাদের সম্পর্কের একটা মজার রিপোর্ট। দেখলেই হাসি আসবে।",
  },
  {
    num: "১১",
    title: "অর্জনসমূহ 🏆",
    desc: "অ্যাপ ব্যবহার করতে করতে পুরস্কার পাবে। কতটুকু আনলক করলে দেখো!",
  },
  {
    num: "১২",
    title: "খুলবে যখন... 💌",
    desc: "মন খারাপ হলে, আমাকে মিস করলে — এই চিঠিগুলো আমি আগেই লিখে রেখেছি তোমার জন্য।",
  },
  {
    num: "১৩",
    title: "শেষ চিঠি ❤️",
    desc: "সবশেষে এটা খোলো। তোমার জন্য একটা বিশেষ কিছু অপেক্ষা করছে।",
  },
];

export default function Guide() {
  const router = useRouter();

  return (
    <div className="flex-1 p-6 flex flex-col overflow-y-auto pb-12">
      <button onClick={() => router.push("/home")} className="mb-6 p-2 bg-white/30 rounded-full w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-2xl font-bold text-pink-600 mb-2 text-center flex justify-center items-center gap-2">
        <BookOpen /> ভালোবাসা, এটা পড়ো
      </h1>
      <p className="text-center text-sm text-romantic-text/70 mb-8">
        এই অ্যাপটা আমি তোমার জন্য বানিয়েছি। তুমি যখনই একা থাকবে, বা মনে করবে আমাকে কিছু বলতে চাও — এখানে আসবে।
      </p>

      <div className="flex flex-col gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 flex gap-4 items-start"
          >
            <div className="w-9 h-9 flex-shrink-0 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black text-sm">
              {f.num}
            </div>
            <div>
              <h2 className="font-bold text-romantic-text text-sm mb-1">{f.title}</h2>
              <p className="text-xs text-romantic-text/70 leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 glass-card p-6 text-center border-pink-200">
        <p className="text-sm font-semibold text-romantic-text/80 italic leading-relaxed">
          এই পুরো অ্যাপটা আমার তোমাকে ভালোবাসার একটা ছোট্ট প্রমাণ।<br />ভালো থেকো, রাজকুমারী। ❤️
        </p>
      </div>
    </div>
  );
}
