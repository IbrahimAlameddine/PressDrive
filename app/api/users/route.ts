import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      status: 200,
      data: users,
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);

    return NextResponse.json({
      status: 500,
      message: "Failed to fetch users.",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = getText(body?.username);
    const email = getText(body?.email).toLowerCase();
    const phone = getText(body?.phone);
    const password = getText(body?.password);
    const incomingRole = getText(body?.role);
    const role: "USER" | "ADMIN" | "PROVIDER" =
      incomingRole === "ADMIN" || incomingRole === "PROVIDER"
        ? incomingRole
        : "USER";

    if (!username || !email || !phone || !password) {
      return NextResponse.json(
        {
          status: 400,
          message: "Username, email, phone, and password are required.",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }, { phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          status: 409,
          message: "A user with this username, email, or phone already exists.",
        },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        phone,
        password: hashPassword(password),
        role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      status: 201,
      data: user,
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);

    return NextResponse.json({
      status: 500,
      message: "Failed to create user.",
    });
  }
}
