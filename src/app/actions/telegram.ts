"use server";

export async function sendTelegramNotification(place: string, date: string, time: string) {
  const BOT_TOKEN = "8254105814:AAEXBzfXmLYRgE-fHbfLG-qVxpnEaDBQoWQ";
  const CHAT_ID = "1950215741";
  
  const message = `🚨 *নতুন ডেট অ্যালার্ট!* 🚨\n\nতোমার স্ত্রী ঘুরাঘুরির জন্য একটি ডেট ঠিক করেছে!\n\n📍 স্থান: ${place}\n📅 তারিখ: ${date}\n⏰ সময়: ${time}\n\nপ্রস্তুত হয়ে যাও! ❤️`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Telegram API Error:", error);
    return { success: false };
  }
}
