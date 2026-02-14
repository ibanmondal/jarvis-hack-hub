import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const faqData: { question: string; answer: string }[] = [
  { question: "When is the hackathon?", answer: "CLH Hackathon 2026 is a 48-hour event. Exact dates will be announced soon — stay tuned on our registration page!" },
  { question: "How do I register?", answer: "Head to the Register page, fill in your team details, choose a problem track, and upload your payment screenshot to confirm." },
  { question: "What are the tracks?", answer: "We have 4 tracks: Artificial Intelligence, Web Development, Cybersecurity, and Open Innovation. Check the Tracks page for details." },
  { question: "What is the team size?", answer: "Teams can have 2 to 4 members. Solo participation is not allowed." },
  { question: "Is there a registration fee?", answer: "Yes, a nominal registration fee applies per team. Details are on the Registration page." },
  { question: "What do I need to bring?", answer: "Bring your laptop, charger, and enthusiasm! Food and Wi-Fi will be provided at the venue." },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hey! I'm the CLH Assistant. Pick a question below or type one!" },
  ]);
  const [input, setInput] = useState("");

  const handleQuestion = (q: string, a: string) => {
    setMessages((prev) => [...prev, { from: "user", text: q }, { from: "bot", text: a }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const query = input.toLowerCase();
    setInput("");
    const match = faqData.find((f) => query.includes(f.question.split(" ").slice(1, 3).join(" ").toLowerCase()));
    const answer = match ? match.answer : "Sorry, I can only help with hackathon FAQs. Try picking a question below!";
    setMessages((prev) => [...prev, { from: "user", text: input }, { from: "bot", text: answer }]);
  };

  const unanswered = faqData.filter((f) => !messages.some((m) => m.from === "user" && m.text === f.question));

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/30 transition-all duration-300 animate-glow-pulse"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[70vh] flex flex-col glass-strong rounded-xl border border-primary/20 shadow-2xl shadow-primary/10 animate-fade-in">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-heading text-xs tracking-[0.15em] text-primary">CLH ASSISTANT</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[45vh]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] text-sm px-3 py-2 rounded-lg ${
                    m.from === "user"
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "bg-card/60 text-foreground border border-border/20"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick questions */}
          {unanswered.length > 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {unanswered.slice(0, 3).map((f, i) => (
                <button
                  key={i}
                  onClick={() => handleQuestion(f.question, f.answer)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-primary/25 text-primary/80 hover:bg-primary/10 transition-colors"
                >
                  {f.question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border/30 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question…"
              className="flex-1 bg-background/50 border border-border/30 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
            />
            <button onClick={handleSend} className="text-primary hover:text-primary/80 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
