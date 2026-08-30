import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "User API is working." });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = getText(body?.action);

    if (action === "signup") {
      const username = getText(body?.username);
      const email = getText(body?.email).toLowerCase();
      const phone = getText(body?.phone);
      const password = getText(body?.password);

      if (!username || !email || !phone || !password) {
        return NextResponse.json(
          { message: "Username, email, phone, and password are required." },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }, { phone }],
        },
      });

      if (existingUser) {
        if (existingUser.username === username) {
          return NextResponse.json({ message: "This username is already taken." }, { status: 409 });
        }
        if (existingUser.email === email) {
          return NextResponse.json({ message: "This email is already registered." }, { status: 409 });
        }
        if (existingUser.phone === phone) {
          return NextResponse.json({ message: "This phone number is already registered." }, { status: 409 });
        }
      }

      const user = await prisma.user.create({
        data: {
          username,
          email,
          phone,
          password: hashPassword(password),
        },
        select: {
          id: true,
          username: true,
          email: true,
          phone: true,
          role: true,
        },
      });

      return NextResponse.json({ message: "User created successfully.", user }, { status: 201 });
    }

    if (action === "login") {
      const email = getText(body?.email).toLowerCase();
      const password = getText(body?.password);

      if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.password !== hashPassword(password)) {
        return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
      }

      return NextResponse.json({
        message: "Login successful.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    }

    return NextResponse.json({ message: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("User API error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
