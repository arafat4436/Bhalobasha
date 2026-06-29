import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";

const font = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Our Little World ❤️",
  description: "A magical place just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {/* Mobile Frame Container */}
        <div className="w-full max-w-[430px] min-h-screen bg-romantic-cream/30 shadow-2xl relative overflow-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
