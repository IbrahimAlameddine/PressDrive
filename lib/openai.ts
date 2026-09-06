import OpenAI from "openai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

// Lazy singleton: the OpenAI SDK throws at construction time if apiKey is
// empty, so building this eagerly at module load would crash `next build`
// / any import of this file whenever OPENAI_API_KEY isn't set yet. Deferring
// construction to first use means only an actual chat request fails.
export function getOpenAI(): OpenAI {
  if (!globalForOpenAI.openai) {
    globalForOpenAI.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return globalForOpenAI.openai;
}

/**
 * System prompt grounding the /chat assistant in this app's domain so it
 * declines questions outside it. Keep in sync with the actual feature set
 * (see prisma/schema.prisma for the source of truth on data shape).
 */
export const CHAT_SYSTEM_PROMPT = `You are the support assistant for DaftraPOS, a clinic scheduling admin app.

The app manages three things:
- Doctors: name, specialty, and a status (ACTIVE, PENDING, or INACTIVE). Only ACTIVE doctors are shown publicly.
- Patients: name, age, email, phone.
- Appointments: link one Patient to one Doctor on a date.

Answer only questions about this app: what it does, how its Doctors/Patients/Appointments features work, and how to use them. You do not have access to live database records, so never invent specific data (names, dates, counts) — explain the feature instead.

If asked anything outside this app's scope (general knowledge, other topics, coding help, etc.), politely decline and steer back to what the app can help with.`;
