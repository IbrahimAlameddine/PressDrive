'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/cars", label: "Cars" },
  { href: "/dashboard/bookings", label: "Bookings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f7f7f3]">
      <div className="mx-auto my-auto flex w-full flex-col gap-6 px-4 py-6 md:flex-row md:items-start md:px-6 lg:px-8">
        <aside className="w-full shrink-0 rounded-2xl border border-white/10 bg-[#141518] shadow-2xl shadow-black/20 md:sticky md:top-6 md:w-72">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffd015] text-lg font-bold text-[#141414]">
              ↔
            </span>
            <div>
              <p className="text-sm font-bold text-[#f7f7f3]">PressDrive</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9699a1]">
                Admin
              </p>
            </div>
          </div>

          <nav className="space-y-2 p-4">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "border border-[#ffd015]/30 bg-[#ffd015]/10 text-[#ffd015]"
                      : "border border-transparent text-[#f7f7f3] hover:border-white/10 hover:bg-white/5 hover:text-[#ffd015]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0d0e10] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-6 flex items-center justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffd015] transition hover:text-[#ffe066]"
            >
              <span aria-hidden="true">←</span>
              Back home
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
