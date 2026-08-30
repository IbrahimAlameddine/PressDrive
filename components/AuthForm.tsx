"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "sign-up";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      action: isLogin ? "login" : "signup",
      username: String(formData.get("username") || "").trim(),
      email: String(formData.get("email") || "").trim().toLowerCase(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || ""),
      passwordConfirmation: String(formData.get("passwordConfirmation") || ""),
    };

    if (!isLogin && payload.password !== payload.passwordConfirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (isLogin && !payload.email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      if (isLogin) {
        const user = data.user;
        if (user && user.username) {
          localStorage.setItem("pressdrive_user", JSON.stringify(user));
          // Dispatch custom event to update Navbar immediately
          window.dispatchEvent(new Event("pressdrive-user-updated"));
        }

        setSuccess(data.message || "Login successful.");
        router.push("/");
      } else {
        setSuccess("Account created successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 700);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(255,208,21,0.08),transparent_38%),#090a0d] px-6 py-14 sm:px-10">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#191a1b] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <header className="mb-7">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">PressDrive account</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#f7f7f3]">{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm text-[#9699a1]">
            {isLogin ? "Sign in to manage your bookings and discover your next ride." : "Join PressDrive to book vehicles and connect with trusted drivers."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <label className="block text-xs font-semibold text-[#c6c7ca]">
              Username
              <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]" name="username" placeholder="Choose a username" required type="text" />
            </label>
          )}

          {isLogin && (
            <label className="block text-xs font-semibold text-[#c6c7ca]">
              Email
              <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]" name="email" placeholder="you@example.com" required type="email" />
            </label>
          )}

          {!isLogin && (
            <label className="block text-xs font-semibold text-[#c6c7ca]">
              Phone number
              <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]" name="phone" placeholder="+1234567890" required type="tel" />
            </label>
          )}

          {!isLogin && (
            <label className="block text-xs font-semibold text-[#c6c7ca]">
              Email address
              <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]" name="email" placeholder="you@example.com" required type="email" />
            </label>
          )}

          <label className="block text-xs font-semibold text-[#c6c7ca]">
            Password
            <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]" name="password" placeholder="At least 8 characters" required minLength={8} type="password" />
          </label>

          {!isLogin && (
            <label className="block text-xs font-semibold text-[#c6c7ca]">
              Confirm password
              <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]" name="passwordConfirmation" placeholder="Repeat your password" required minLength={8} type="password" />
            </label>
          )}

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}
          {success && <p className="text-sm font-medium text-green-400">{success}</p>}

          <button disabled={loading} className="h-11 w-full rounded-lg bg-[#ffd015] text-sm font-bold text-[#141414] transition hover:bg-[#ffe066] disabled:cursor-not-allowed disabled:opacity-70" type="submit">
            {loading ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Login" : "Create account"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#85878d]">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <Link className="font-semibold text-[#ffd015] hover:text-[#ffe066]" href={isLogin ? "/sign-up" : "/login"}>
            {isLogin ? "Create account" : "Login"}
          </Link>
        </p>
      </section>
    </main>
  );
}
