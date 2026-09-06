import AiAssistantClient from "../../components/AiAssistantClient";

export const metadata = {
  title: "AI Assistant | PressDrive",
  description: "Find the right vehicle for your next trip.",
};

export default function AiAssistantPage() {
  return (
    <main className="flex-1 bg-[#090a0d]">
      <section className="border-b border-white/5 bg-[#0d0e10]">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 md:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">Smart recommendation</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#f7f7f3] sm:text-5xl">AI Assistant</h1>
          <p className="mt-2 text-sm text-[#858994]">Tell us about your trip — we will find your best match.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10 md:py-10">
        <AiAssistantClient />
      </div>
    </main>
  );
}