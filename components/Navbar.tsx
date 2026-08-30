"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type UserSession = {
  id: number;
  username: string;
  email: string;
  phone: string;
  name?: string | null;
  role?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const homeIsActive = pathname === "/";
  const browseIsActive = pathname.startsWith("/browse");
  const [user, setUser] = useState<UserSession | null>(null);
  const isDashboardVisible = user?.role === "ADMIN" || user?.role === "PROVIDER";

  useEffect(() => {
    const updateUser = () => {
      const savedUser = localStorage.getItem("pressdrive_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser) as UserSession);
        } catch {
          localStorage.removeItem("pressdrive_user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    updateUser();
    
    // Listen for storage changes (cross-tab/window)
    window.addEventListener("storage", updateUser);
    
    // Listen for custom login event (same tab)
    window.addEventListener("pressdrive-user-updated", updateUser);
    
    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("pressdrive-user-updated", updateUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("pressdrive_user");
    setUser(null);
    window.dispatchEvent(new Event("pressdrive-user-updated"));
  };

  return (
    <header className="border-b border-white/5 bg-[#090a0d]/95">
      <div className="relative mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3 sm:px-10 md:flex-nowrap md:gap-6 md:py-0">
        <Link className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#f7f7f3]" href="/">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd015] text-[#141414]" aria-hidden="true">
            ↔
          </span>
          PressDrive
        </Link>

        <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-xs font-semibold text-[#f7f7f3] md:flex">
          <Link className={`border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015] ${homeIsActive ? "text-[#ffd015]" : "text-[#f7f7f3]"}`} href="/">
            Home
          </Link>
          <Link className={`border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015] ${browseIsActive ? "text-[#ffd015]" : "text-[#f7f7f3]"}`} href="/browse">
            Browse Vehicles
          </Link>
          <Link className={`border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015] ${pathname === "/ai-assistant" ? "text-[#ffd015]" : "text-[#f7f7f3]"}`} href="/ai-assistant">
            AI Assistant
          </Link>
          {isDashboardVisible && (
            <Link className={`border-b-2 border-transparent pb-1 transition hover:border-[#ffd015] hover:text-[#ffd015] ${pathname.startsWith("/dashboard") ? "text-[#ffd015]" : "text-[#f7f7f3]"}`} href="/dashboard">
              Dashboard
            </Link>
          )}
        </nav>

        <nav aria-label="Mobile navigation" className="order-3 flex w-full items-center gap-5 overflow-x-auto border-t border-white/5 pt-3 text-xs font-semibold text-[#f7f7f3] md:hidden">
          <Link className={`${homeIsActive ? "text-[#ffd015]" : "text-[#f7f7f3]"} whitespace-nowrap`} href="/">
            Home
          </Link>
          <Link className={`${browseIsActive ? "text-[#ffd015]" : "text-[#f7f7f3]"} whitespace-nowrap`} href="/browse">
            Browse Vehicles
          </Link>
          <Link className={`${pathname === "/ai-assistant" ? "text-[#ffd015]" : "text-[#f7f7f3]"} whitespace-nowrap`} href="/ai-assistant">
            AI Assistant
          </Link>
          {isDashboardVisible && (
            <Link className={`${pathname.startsWith("/dashboard") ? "text-[#ffd015]" : "text-[#f7f7f3]"} whitespace-nowrap`} href="/dashboard">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 text-xs font-semibold">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#ffd015]/40 bg-[#ffd015]/10 px-3 py-2.5 text-[#ffd015]">
                {user.username}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/15 px-3 py-2.5 text-[#f7f7f3] transition hover:border-[#ffd015] hover:text-[#ffd015]"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link className="rounded-full border border-white/15 px-3 py-2.5 text-[#f7f7f3] transition hover:border-[#ffd015] hover:text-[#ffd015] sm:px-5" href="/sign-up">
                Sign Up
              </Link>
              <Link className="rounded-full bg-[#ffd015] px-3 py-2.5 text-[#141414] transition hover:bg-[#ffe066] sm:px-5" href="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}