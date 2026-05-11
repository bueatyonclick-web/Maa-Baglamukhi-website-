import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Flame } from "lucide-react";
import { apiPost } from "../../lib/api";

const sessionId = `pandit-${Math.random().toString(36).slice(2, 10)}`;

export default function AskPanditChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "🙏 Pranam, devotee. I am Pandit ji at Maa Baglamukhi Peeth. How may I guide you on your spiritual path today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    // Lock background page scrolling while chat is open.
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const send = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMsgs((m) => [...m, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await apiPost("/chat", { session_id: sessionId, message: userMsg });
      setMsgs((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (err) {
      const backendDetail = err?.response?.data?.detail;
      setMsgs((m) => [...m, {
        role: "assistant",
        content: backendDetail
          ? `🙏 ${backendDetail}`
          : "🙏 Pandit ji is in dhyana. Please try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 grid place-items-center shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-glow-pulse"
        data-testid="ask-pandit-fab"
      >
        <Flame className="w-7 h-7 text-ink-900" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 w-[92vw] max-w-md h-[600px] max-h-[80vh] rounded-2xl bg-ink-800 border border-saffron-500/30 shadow-2xl flex flex-col overflow-hidden"
            data-testid="pandit-chat"
          >
            <div className="flex items-center justify-between p-4 border-b border-saffron-500/15 bg-gradient-to-r from-saffron-700/15 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 grid place-items-center">
                  <Flame className="w-5 h-5 text-ink-900" />
                </div>
                <div>
                  <p className="font-serif text-white text-lg leading-none">Ask Pandit ji</p>
                  <p className="text-saffron-300/70 text-xs">Live · Spiritual Guidance</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white" data-testid="close-pandit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3"
              onWheelCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}
            >
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-saffron-500 text-ink-900 rounded-br-sm"
                        : "bg-ink-700 text-white/90 border border-saffron-500/15 rounded-bl-sm"
                    }`}
                    data-testid={`chat-msg-${i}`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-ink-700 border border-saffron-500/15 rounded-2xl rounded-bl-sm px-4 py-2.5 text-saffron-300 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-bounce [animation-delay:0.3s]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={send} className="p-3 border-t border-saffron-500/15 bg-ink-900/50">
              <div className="flex items-center gap-2 bg-ink-700 rounded-full px-4 py-2 border border-saffron-500/20 focus-within:border-saffron-400">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about mantras, pujas, pilgrimage..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
                  data-testid="pandit-input"
                />
                <button type="submit" disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-full bg-saffron-500 text-ink-900 grid place-items-center disabled:opacity-40"
                  data-testid="pandit-send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
