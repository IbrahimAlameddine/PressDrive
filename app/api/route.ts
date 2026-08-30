import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "PressDrive API is running",
    routes: [
      "POST /api/user?action=signup",
      "POST /api/user?action=login",
    ],
  });
}
