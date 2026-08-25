import Icon from "../../components/Icon";

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
        <section className="rounded-2xl border border-[#292d35] bg-[#191a1b] p-5 sm:p-6" aria-label="AI assistant conversation">
          <div className="min-h-64 text-xs">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#ffd015] text-[#151515]"><Icon name="sparkles" className="h-4 w-4" /></span>
              <p className="rounded-xl bg-[#2a2b2e] px-4 py-3 text-[#b0b2b8]">Hi! Where are you planning to travel?</p>
            </div>
          </div>
        </section>

        <form className="mt-4 flex items-center gap-2 rounded-xl border border-[#292d35] bg-[#191a1b] p-2">
          <input aria-label="Your answer" placeholder="Type your answer or question..." className="min-w-0 flex-1 bg-transparent px-2 text-xs text-[#f7f7f3] outline-none placeholder:text-[#686b74]" />
          <button type="submit" className="rounded-lg bg-[#ffd015] px-4 py-2.5 text-[10px] font-bold text-[#151515] transition hover:bg-[#ffe05b]">Send</button>
        </form>
      </div>
    </main>
  );
}