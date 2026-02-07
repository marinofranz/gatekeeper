import { NextRequest, NextResponse, type ProxyConfig } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "gatekeeper",
  });

  // Optimistic redirection, not a substitute for real auth protection.
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ["/dashboard/:path*"],
};
