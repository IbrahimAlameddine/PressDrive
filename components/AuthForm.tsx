"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { axiosPost, ApiError } from "@/lib/axios";

type AuthMode = "login" | "sign-up";

type AuthRequest = {
  action: "login" | "signup";
  username: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
};

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

const signUpSchema = z
  .object({
    username: z.string().trim().min(1, "Username is required."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    phone: z.string().trim().min(1, "Phone number is required."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === "login";
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      username: String(formData.get("username") || "").trim(),
      email: String(formData.get("email") || "")
        .trim()
        .toLowerCase(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || ""),
      confirmPassword: String(formData.get("passwordConfirmation") || ""),
    };

    const schema = isLogin ? loginSchema : signUpSchema;
    const validation = schema.safeParse(values);

    if (!validation.success) {
      const nextErrors: typeof fieldErrors = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (typeof fieldName === "string") {
          nextErrors[fieldName as keyof typeof nextErrors] = issue.message;
        }
      });

      setError("");
      setSuccess("");
      setFieldErrors(nextErrors);
      return;
    }

    setError("");
    setSuccess("");
    setFieldErrors({});
    setLoading(true);

    const payload: AuthRequest = {
      action: isLogin ? "login" : "signup",
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
      passwordConfirmation: values.confirmPassword,
    };

    try {
      const response = await axiosPost<AuthRequest, User>("/user", payload);

      if (isLogin) {
        const user = response.data;

        if (user) {
          localStorage.setItem("pressdrive_user", JSON.stringify(user));
          window.dispatchEvent(new Event("pressdrive-user-updated"));
        }

        setSuccess(response.message || "Login successful.");
        router.push("/");
      } else {
        setSuccess("Account created successfully. Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 700);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(255,208,21,0.08),transparent_38%),#090a0d] px-6 py-14 sm:px-10">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#191a1b] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <header className="mb-7">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd015]">
            PressDrive account
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#f7f7f3]">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>

          <p className="mt-2 text-sm text-[#9699a1]">
            {isLogin
              ? "Sign in to manage your bookings and discover your next ride."
              : "Join PressDrive to book vehicles and connect with trusted drivers."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="block text-xs font-semibold text-[#c6c7ca]">
              <label className="block">Username</label>

              <input
                name="username"
                type="text"
                placeholder="Choose a username"
                required
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]"
              />
              {fieldErrors.username && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {fieldErrors.username}
                </p>
              )}
            </div>
          )}

          {!isLogin && (
            <div className="block text-xs font-semibold text-[#c6c7ca]">
              <label className="block">Phone number</label>

              <input
                name="phone"
                type="tel"
                placeholder="+1234567890"
                required
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]"
              />
              {fieldErrors.phone && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          )}

          <div className="block text-xs font-semibold text-[#c6c7ca]">
            <label className="block">
              {isLogin ? "Email" : "Email address"}
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]"
            />
            {fieldErrors.email && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="block text-xs font-semibold text-[#c6c7ca]">
            <label className="block">Password</label>

            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]"
            />
            {fieldErrors.password && (
              <p className="mt-2 text-xs font-medium text-red-400">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {!isLogin && (
            <div className="block text-xs font-semibold text-[#c6c7ca]">
              <label className="block">Confirm password</label>

              <input
                name="passwordConfirmation"
                type="password"
                placeholder="Repeat your password"
                required
                minLength={6}
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#252628] px-3 text-sm font-normal text-[#f7f7f3] outline-none placeholder:text-[#6f7178] focus:border-[#ffd015]"
              />
              {fieldErrors.confirmPassword && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          {success && (
            <p className="text-sm font-medium text-green-400">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#ffd015] text-sm font-bold text-[#141414] transition hover:bg-[#ffe066] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
                ? "Login"
                : "Create account"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#85878d]">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <Link
            href={isLogin ? "/sign-up" : "/login"}
            className="font-semibold text-[#ffd015] hover:text-[#ffe066]"
          >
            {isLogin ? "Create account" : "Login"}
          </Link>
        </p>
      </section>
    </main>
  );
}
