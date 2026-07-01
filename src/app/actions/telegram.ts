"use server";

export async function sendTelegramMessage(message: string) {
  const BOT_TOKEN = "8254105814:AAEXBzfXmLYRgE-fHbfLG-qVxpnEaDBQoWQ";
  const CHAT_ID = "1950215741";
  
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

    if (!response.ok) throw new Error("Failed to send message");
    return { success: true };
  } catch (error) {
    console.error("Telegram API Error:", error);
    return { success: false };
  }
}

export async function sendTelegramNotification(place: string, date: string, time: string) {
  const message = `🚨 *নতুন ডেট অ্যালার্ট!* 🚨\n\nতোমার স্ত্রী ঘুরাঘুরির জন্য একটি ডেট ঠিক করেছে!\n\n📍 স্থান: ${place}\n📅 তারিখ: ${date}\n⏰ সময়: ${time}\n\nপ্রস্তুত হয়ে যাও! ❤️`;
  return sendTelegramMessage(message);

}

export async function fetchLatestTelegramReply() {
  const BOT_TOKEN = "8254105814:AAEXBzfXmLYRgE-fHbfLG-qVxpnEaDBQoWQ";
  const CHAT_ID = "1950215741";
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`, {
      // Force no-cache so we always get the latest data
      cache: 'no-store'
    });
    
    if (!response.ok) throw new Error("Failed to fetch updates");
    
    const data = await response.json();
    if (!data.ok || !data.result || data.result.length === 0) {
      return { success: false, text: null };
    }
    
    // Get all messages sent by the husband TO the bot
    const husbandMessages = data.result
      .filter((update: any) => 
        update.message && 
        update.message.chat.id.toString() === CHAT_ID && 
        update.message.from.id.toString() === CHAT_ID &&
        update.message.text
      );
      
    if (husbandMessages.length === 0) {
      return { success: false, text: null };
    }
    
    // Get the absolute latest message text
    const latestMessage = husbandMessages[husbandMessages.length - 1].message.text;
    
    return { success: true, text: latestMessage };
  } catch (error) {
    console.error("Telegram Fetch Error:", error);
    return { success: false, text: null };
  }
}
