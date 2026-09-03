
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosPost } from "@/lib/axios";

type User = {
  username: string;
  role?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadUser = () => {
    const savedUser = localStorage.getItem("pressdrive_user");

    if (!savedUser) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("pressdrive_user");
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("pressdrive-user-updated", loadUser);

    return () => {
      window.removeEventListener("pressdrive-user-updated", loadUser);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const logout = async () => {
    try {
      await axiosPost("/user", { action: "logout" });
    } catch {
      // Continue with local logout
    }

    localStorage.removeItem("pressdrive_user");
    setUser(null);
    window.dispatchEvent(new Event("pressdrive-user-updated"));
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse Vehicles" },
    { href: "/ai-assistant", label: "AI Assistant" },
  ];

  if (user?.role === "ADMIN" || user?.role === "PROVIDER") {
    links.push({ href: "/dashboard", label: "Dashboard" });
  }

  return (
    <header className="border-b border-white/5 bg-[#090a0d]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-[#f7f7f3]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd015] text-[#141414]">
            ↔
          </span>
          PressDrive
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 pb-1 text-xs font-semibold transition-colors hover:text-[#ffd015] ${
                isActive(link.href)
                  ? "border-[#ffd015] text-[#ffd015]"
                  : "border-transparent text-[#f7f7f3]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop User */}
        <div className="hidden items-center gap-2 text-xs font-semibold md:flex">
          {user ? (
            <>
              <span className="rounded-full border border-[#ffd015]/40 bg-[#ffd015]/10 px-3 py-2.5 text-[#ffd015]">
                {user.username}
              </span>

              <button
                onClick={logout}
                className="rounded-full border border-white/15 px-3 py-2.5 text-[#f7f7f3] hover:border-[#ffd015] hover:text-[#ffd015]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="rounded-full border border-white/15 px-3 py-2.5 text-[#f7f7f3] hover:border-[#ffd015] hover:text-[#ffd015] sm:px-5"
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                className="rounded-full bg-[#ffd015] px-3 py-2.5 text-[#141414] hover:bg-[#ffe066] sm:px-5"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          className="ml-auto rounded-full border border-white/10 p-2 text-[#f7f7f3] hover:border-[#ffd015] hover:text-[#ffd015] md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/5 bg-[#090a0d]/95 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${
                  isActive(link.href)
                    ? "bg-[#ffd015]/10 text-[#ffd015]"
                    : "text-[#f7f7f3] hover:bg-white/5 hover:text-[#ffd015]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-3">
              {user ? (
                <>
                  <span className="rounded-full border border-[#ffd015]/40 bg-[#ffd015]/10 px-3 py-2 text-center text-[#ffd015]">
                    {user.username}
                  </span>

                  <button
                    onClick={logout}
                    className="rounded-full border border-white/15 px-3 py-2.5 text-[#f7f7f3] hover:border-[#ffd015] hover:text-[#ffd015]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-up"
                    className="rounded-full border border-white/15 px-3 py-2.5 text-center text-[#f7f7f3] hover:border-[#ffd015] hover:text-[#ffd015]"
                  >
                    Sign Up
                  </Link>

                  <Link
                    href="/login"
                    className="rounded-full bg-[#ffd015] px-3 py-2.5 text-center font-semibold text-[#141414] hover:bg-[#ffe066]"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
