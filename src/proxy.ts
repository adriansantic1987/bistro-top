import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /admin, except the login screen itself
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const expectedPassword = (process.env.ADMIN_PASSWORD || "tonifruk1987!").trim();
    const cookieVal = (sessionCookie || "").trim();

    console.log(`[Proxy] Path: ${pathname}`);
    console.log(`[Proxy] Cookie present: ${!!sessionCookie}`);
    console.log(`[Proxy] Cookie value trimmed: "${cookieVal}"`);
    console.log(`[Proxy] Expected password trimmed: "${expectedPassword}"`);
    console.log(`[Proxy] Match: ${cookieVal === expectedPassword}`);

    // Check if session is authenticated
    if (!cookieVal || cookieVal !== expectedPassword) {
      console.log(`[Proxy] Redirecting unauthorized user to login`);
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    } else {
      console.log(`[Proxy] Authorized. Allowing path: ${pathname}`);
    }
  }

  return NextResponse.next();
}

// Export both default and named proxy for maximum compatibility with Next.js 16
export default proxy;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
