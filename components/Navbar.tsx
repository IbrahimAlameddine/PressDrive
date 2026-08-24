"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/5 bg-[#090a0d]/95">
      <div className="relative mx-auto flex min-h-16 max-w-7xl items-center px-6 sm:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-white"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd015] text-black">
            ↔
          </span>
          PressDrive
        </Link>

        {/* Navigation */}
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
          
          <Link
            href="/"
            className={`border-b-2 border-transparent px-1 pb-1 text-sm font-semibold transition ${
              pathname === "/"
                ? "border-[#ffd015] text-[#ffd015]"
                : "text-white hover:border-[#ffd015] hover:text-[#ffd015]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/browse"
            className={`border-b-2 border-transparent px-1 pb-1 text-sm font-semibold transition ${
              pathname.startsWith("/browse")
                ? "border-[#ffd015] text-[#ffd015]"
                : "text-white hover:border-[#ffd015] hover:text-[#ffd015]"
            }`}
          >
            Browse Vehicles
          </Link>

          <Link
            href="/ai"
            className={`border-b-2 border-transparent px-1 pb-1 text-sm font-semibold transition ${
              pathname.startsWith("/ai")
                ? "border-[#ffd015] text-[#ffd015]"
                : "text-white hover:border-[#ffd015] hover:text-[#ffd015]"
            }`}
          >
            AI Assistant
          </Link>

        </nav>
      </div>
    </header>
  );
}