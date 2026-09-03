import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Role } from "@prisma/client";

function encodeBase64Url(value: Uint8Array) {
  let binary = "";
  value.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  const base64 = typeof btoa === "function" ? btoa(binary) : Buffer.from(binary, "binary").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (normalized.length % 4)) % 4;
  const base64 = normalized + "=".repeat(padLength);

  const binary = typeof atob === "function" ? atob(base64) : Buffer.from(base64, "base64").toString("binary");
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export type SessionUser = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: Role;
};

export const SESSION_COOKIE_NAME = "pressdrive_session";

function getSessionSecret() {
  return process.env.SESSION_SECRET ?? "pressdrive-dev-secret";
}

async function signPayload(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", secretKey, data);
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(user: SessionUser) {
  const payload = JSON.stringify(user);
  const encodedPayload = encodeBase64Url(new TextEncoder().encode(payload));
  const signature = await signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function parseSessionToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = await signPayload(encodedPayload);
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = new TextDecoder().decode(decodeBase64Url(encodedPayload));
    const parsed = JSON.parse(payload) as Partial<SessionUser>;

    if (
      typeof parsed.id === "number" &&
      typeof parsed.username === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.phone === "string" &&
      typeof parsed.role === "string"
    ) {
      return {
        id: parsed.id,
        username: parsed.username,
        email: parsed.email,
        phone: parsed.phone,
        role: parsed.role as Role,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return parseSessionToken(token);
}

export async function requireUserSession() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireDashboardAccess(allowedRoles: Role[]) {
  const user = await requireUserSession();

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}

export async function setSessionCookie(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, await createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
