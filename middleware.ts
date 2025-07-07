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
  
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(.*)$/.test(pathname)
  ) {
    return response;
  }

  if (token && pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const ProtectedRoutes = ['profile', 'checkout', 'reservations', 'orders'];
  const isProtected = ProtectedRoutes.some(route => pathname.includes(route));
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const pathnameParts = pathname.split("/").filter(Boolean);
  const currentLocale = pathnameParts[0];
  const hasLocale = locales.includes(currentLocale);

  if (hasLocale) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale !== currentLocale) {
      response.cookies.set("NEXT_LOCALE", currentLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // سنة
      });
    }
  }

  if (!hasLocale) {
    const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value;
    const locale = locales.includes(localeFromCookie ?? "") ? localeFromCookie : defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return response;
}
