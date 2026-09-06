import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = Number(id);

  if (isNaN(userId) || userId <= 0){
          return NextResponse.json(
        { status: 400, message: "Invalid user ID." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      return NextResponse.json(
        { status: 404, message: "User not found." },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);

    return NextResponse.json({
      status: 500,
      message: "Failed to fetch user.",
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (!userId) {
      return NextResponse.json(
        { status: 400, message: "Invalid user ID." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { status: 404, message: "User not found." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const username = getText(body?.username);
    const email = getText(body?.email).toLowerCase();
    const phone = getText(body?.phone);
    const password = getText(body?.password);
    const incomingRole = getText(body?.role);
    const role: "USER" | "ADMIN" | "PROVIDER" =
      incomingRole === "ADMIN" || incomingRole === "PROVIDER"
        ? incomingRole
        : existingUser.role;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(username ? { username } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(password ? { password: hashPassword(password) } : {}),
        ...(incomingRole ? { role } : {}),
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
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Failed to update user:", error);

    return NextResponse.json({
      status: 500,
      message: "Failed to update user.",
    });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { status: 400, message: "Invalid user ID." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { status: 404, message: "User not found." },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "User deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete user:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to delete user.",
      },
      { status: 500 }
    );
  }
}