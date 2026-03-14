import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

type ChatMsg = { role: "user" | "ai"; content: string };

const INITIAL_MESSAGES: ChatMsg[] = [
  { role: "user", content: "My blood sugar was 180 after lunch" },
  { role: "ai", content: "That's slightly high, Priya. Since you have Type 2 Diabetes, try a brisk 15-minute walk after meals. For dinner swap white rice with 2 rotis. Shall I update your plan? 🌿" },
  { role: "user", content: "Yes please update it" },
  { role: "ai", content: "Done! Updated dinner to: 2 Rotis + Dal Tadka + Cucumber Raita = 440cal. Better for blood sugar control. Remember Metformin tonight! 💊" },
  { role: "user", content: "What should I eat for breakfast?" },
  { role: "ai", content: "For Diabetes + PCOS I recommend Oats Upma with vegetables — 240cal. Low glycemic index, high fiber. Avoid white bread and sugary cereals. Want me to add this to your Monday plan? 🥣" },
];

const QUICK_PROMPTS = [
  "What should I eat today? 🍱",
  "Is my blood sugar okay? 🩺",
  "Suggest a workout 🏃",
  "Find cheap medicine 💊",
  "PCOS diet tips 🌿",
  "Period cramp remedies 🌸",
];

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've noted that, Priya. Based on your PCOS profile, I recommend keeping your fiber intake high today. Would you like a recipe for a high-fiber Indian snack? 🌾",
        "Great question! For your Diabetes management, try to keep portions small and eat every 3-4 hours. Sprouted moong dal makes an excellent hostel snack! 🥗",
        "Based on your profile, I'd suggest a 20-minute brisk walk after dinner. It helps with both blood sugar control and PCOS symptoms. Shall I set a reminder? 🏃‍♀️",
        "For PCOS, foods rich in omega-3 like flaxseeds and walnuts are very helpful. Add a spoon of flaxseed powder to your morning curd! 🥜",
      ];
      setMessages(prev => [...prev, { role: "ai", content: responses[Math.floor(Math.random() * responses.length)] }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col bg-background border border-border rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img src="/healix-logo.png" className="w-8 h-8 brightness-0 invert" alt="" />
          <div>
            <h3 className="text-primary-foreground font-bold text-sm">Healix AI</h3>
            <p className="text-primary-foreground/70 text-[10px]">Powered by Gemini AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-healix-button rounded-full animate-pulse" />
          <span className="text-primary-foreground text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted scrollbar-healix">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-card border border-border flex-shrink-0 flex items-center justify-center">
                  <img src="/healix-logo.png" className="w-5 h-5" alt="" />
                </div>
              )}
              <div className={`p-4 text-sm leading-relaxed shadow-sm
                ${msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-[18px_18px_4px_18px]"
                  : "bg-background border border-border text-foreground rounded-[18px_18px_18px_4px]"}`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex-shrink-0 flex items-center justify-center">
                <img src="/healix-logo.png" className="w-5 h-5" alt="" />
              </div>
              <div className="bg-background border border-border rounded-2xl p-4 flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 bg-background border-t border-border shrink-0">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          {QUICK_PROMPTS.map(chip => (
            <button
              key={chip}
              onClick={() => sendMessage(chip)}
              className="whitespace-nowrap px-4 py-1.5 rounded-full border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask Healix anything..."
            className="flex-1 bg-card border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-12"
          />
          <button
            onClick={() => sendMessage()}
            className="w-12 h-12 bg-healix-button text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
