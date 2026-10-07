import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import api from "../api";

const GREETING = {
  role: "assistant",
  text: "Hi! 👋 I'm an AI assistant. Ask me about projects, skills, experience or how to get in touch.",
};

const SUGGESTIONS = ["What projects has he built?", "What are his skills?", "How can I contact him?"];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    const next = [...messages, { role: "user", text: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // don't send the greeting, only the real conversation
      const res = await api.post("/api/chat", { messages: next.slice(1) });
      setMessages([...next, { role: "assistant", text: res.data.reply }]);
    } catch (error) {
      const msg =
        error.response?.data?.reply ||
        "Something went wrong. Please try again in a moment.";
      setMessages([...next, { role: "assistant", text: msg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="card fixed bottom-24 right-4 z-[998] flex h-[480px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden sm:right-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-blue-600/20 px-4 py-3">
              <div>
                <p className="font-bold">Ask AI</p>
                <p className="text-xs text-slate-400">Answers from this portfolio</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 ${
                      m.role === "user" ? "bg-blue-600" : "bg-white/10"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {loading && (
                <p className="w-fit rounded-2xl bg-white/10 px-4 py-2 text-slate-400">Typing…</p>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-blue-300 hover:bg-white/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2 border-t border-white/10 p-3"
            >
              <input
                className="input"
                placeholder="Ask something…"
                maxLength={500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" disabled={loading} className="btn px-4 disabled:opacity-50" aria-label="Send">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Open AI chat"
        className="fixed bottom-6 right-4 z-[998] rounded-full bg-blue-600 p-4 shadow-2xl hover:bg-blue-500 sm:right-6"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}

export default ChatWidget;
