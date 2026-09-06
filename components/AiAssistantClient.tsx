"use client";

import { FormEvent, useState } from "react";
import Icon from "./Icon";
import type { ChatMessage } from "@/lib/openai";

interface ChatResponse {
  status?: number;
  data?: { reply?: string };
  message?: string;
}

export default function AiAssistantClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! Where are you planning to travel?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = (await response.json()) as ChatResponse;

      if (response.status === 503 && payload.message) {
        setMessages([...nextMessages, { role: "assistant", content: payload.message }]);
        return;
      }

      if (!response.ok || payload.status !== 200 || !payload.data?.reply) {
        throw new Error(payload.message || "The assistant could not reply.");
      }

      setMessages([...nextMessages, { role: "assistant", content: payload.data.reply }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant could not reply.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="rounded-2xl border border-[#292d35] bg-[#191a1b] p-5 sm:p-6" aria-label="AI assistant conversation">
        <div className="min-h-64 space-y-4 text-xs">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#ffd015] text-[#151515]"><Icon name="sparkles" className="h-4 w-4" /></span>
              )}
              <p className={`max-w-[85%] rounded-xl px-4 py-3 ${message.role === "user" ? "bg-[#ffd015] text-[#151515]" : "bg-[#2a2b2e] text-[#b0b2b8]"}`}>{message.content}</p>
            </div>
          ))}
          {isLoading && <p className="pl-11 text-[#858994]">Thinking...</p>}
          {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-red-200">{error}</p>}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 rounded-xl border border-[#292d35] bg-[#191a1b] p-2">
        <input aria-label="Your answer" value={input} onChange={(event) => setInput(event.target.value)} disabled={isLoading} placeholder="Type your answer or question..." className="min-w-0 flex-1 bg-transparent px-2 text-xs text-[#f7f7f3] outline-none placeholder:text-[#686b74] disabled:opacity-60" />
        <button type="submit" disabled={isLoading || !input.trim()} className="rounded-lg bg-[#ffd015] px-4 py-2.5 text-[10px] font-bold text-[#151515] transition hover:bg-[#ffe05b] disabled:cursor-not-allowed disabled:opacity-50">{isLoading ? "Sending..." : "Send"}</button>
      </form>
    </>
  );
}