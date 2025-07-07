import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

const locales = ["en", "ar"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const token = request.cookies.get("token"); 
  const guestToken = request.cookies.get("guest_token");

  if (!token && !guestToken) {
    const generatedToken = uuidv4();
    response.cookies.set("guest_token", generatedToken, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, 
    });
  }

  if (token && guestToken) {
    response.cookies.set("guest_token", "", {
      path: "/",
      maxAge: 0,
    });
  }

  // ignore static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(.*)$/.test(pathname)
  ) {
    return response;
  }

   // Prevent authenticated users from accessing /auth
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pathnameParts = pathname.split("/").filter(Boolean);
  const hasLocale = locales.includes(pathnameParts[0]);

  //  ONLY add locale if it's NOT already in the path
if (!hasLocale) {
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;

  const locale = locales.includes(localeFromCookie ?? "")
    ? localeFromCookie
    : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}
  return response;
}
