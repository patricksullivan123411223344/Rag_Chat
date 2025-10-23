"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatSection() {
  const [messages, setMessages] = useState([
    { role: "system", text: "Welcome to your RAG assistant." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.output },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "system", text: "⚠️ Connection error — backend offline?" },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
      <div className="flex flex-col w-full max-w-3xl h-[80vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 text-sm text-zinc-400 uppercase tracking-wide">
          Local RAG Interface
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`max-w-[75%] p-3 rounded-xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600/80 ml-auto"
                  : msg.role === "system"
                  ? "text-zinc-400 italic text-center mx-auto"
                  : "bg-zinc-800/80 text-zinc-100"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center p-4 border-t border-zinc-800 bg-zinc-900">
          <input
            className="flex-1 bg-zinc-800 rounded-xl px-4 py-2 text-sm outline-none text-zinc-200 placeholder:text-zinc-500"
            placeholder="Ask your notes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-600 hover:bg-blue-700 rounded-xl p-2 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
