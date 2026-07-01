import type { Metadata } from "next";
import { Inter, Patrick_Hand } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const patrickHand = Patrick_Hand({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-patrick-hand" 
});

export const metadata: Metadata = {
  title: "আমাদের ছোট্ট জগত ❤️",
  description: "A special place for my beautiful wife",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${patrickHand.variable} bg-romantic-bg text-romantic-text min-h-screen flex justify-center items-center`}>
        {/* Mobile container constraint for desktop viewing */}
        <div className="w-full h-full max-w-[430px] sm:h-[90vh] sm:rounded-3xl sm:shadow-2xl overflow-hidden relative bg-gradient-to-br from-pink-100 to-rose-50 border-4 border-white/50 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
