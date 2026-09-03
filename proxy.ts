import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("pressdrive_session")?.value;
  const sessionUser = await parseSessionToken(sessionToken);

  if (!sessionUser) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAdmin = sessionUser.role === "ADMIN";
  const isProvider = sessionUser.role === "PROVIDER";

  if (pathname === "/dashboard/users" || pathname === "/dashboard/providers") {
    if (!isAdmin) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (pathname === "/dashboard" || pathname === "/dashboard/cars") {
    if (!isAdmin && !isProvider) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
