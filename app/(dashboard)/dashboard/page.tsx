export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 sm:px-10">
      <div className="rounded-2xl border border-white/10 bg-[#191a1b] p-8 shadow-2xl shadow-black/30">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">Dashboard</p>
        <h1 className="text-3xl font-extrabold text-[#f7f7f3]">Provider / Admin Panel</h1>
        <p className="mt-3 max-w-xl text-sm text-[#a6a9ad]">
          This is the protected dashboard area for providers and admins.
        </p>
      </div>
    </main>
  );
}
