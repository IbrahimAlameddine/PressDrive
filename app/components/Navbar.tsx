"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const homeIsActive = pathname === "/";
  const browseIsActive = pathname.startsWith("/browse");

  return (
    <header className="border-b border-white/5 bg-[#090a0d]/95">
      <div className="relative mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-6 sm:px-10">
        <Link className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#f7f7f3]" href="/">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd015] text-[#141414]" aria-hidden="true">
            ↔
          </span>
          PressDrive
        </Link>

        <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-xs font-semibold text-[#f7f7f3] md:flex">
          <Link className={`border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015] ${homeIsActive ? "text-[#ffd015]" : "text-[#f7f7f3]"}`} href="/">Home</Link>
          <Link className={`border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015] ${browseIsActive ? "text-[#ffd015]" : "text-[#f7f7f3]"}`} href="/browse">Browse Vehicles</Link>
          <a className="border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015]" href="#features">AI Assistant</a>
        </nav>


      </div>
    </header>
  );
}