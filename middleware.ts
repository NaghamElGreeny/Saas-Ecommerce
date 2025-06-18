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

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pathnameParts = pathname.split("/").filter(Boolean);
  const hasLocale = locales.includes(pathnameParts[0]);

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return response;
}


// import createMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import { routing } from "./i18n/routing";

// export async function middleware(request: NextRequest) {
//     const response = NextResponse.next();
//     const isArabicLocale = request.nextUrl.pathname.startsWith("/ar");

//     if (request.nextUrl.pathname.startsWith("/en")) {
//         const newPathname = request.nextUrl.pathname.replace("/en", "");
//         const url = new URL(request.nextUrl.origin + newPathname);

//         return NextResponse.redirect(url);
//     }

//     response.cookies.set("NEXT_LOCALE", isArabicLocale ? "ar" : "en");

//     // Handle guest token
//   const serverCookies = await cookies()
//   const guest_token = serverCookies.get('guest_token')
//   if (!guest_token.value) {
//     serverCookies.set('guest_token', '')
//   }

//     // Handle internationalization routing
//     const handleI18nRouting = createMiddleware(routing);
//     const i18nResponse = handleI18nRouting(request);

//     // Merge headers and cookies from i18nResponse to response
//     i18nResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//     });

//     const setCookieHeaders = i18nResponse.headers.get("set-cookie");
//     if (setCookieHeaders) {
//         setCookieHeaders.split(",").forEach((cookie) => {
//             response.headers.append("set-cookie", cookie);
//         });
//     }

//     return response;
// }

// export const config = {
//     matcher: [
//         "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public/|assets/images|logo.png|logo.webp|favicon.webp|header.gif|footer_logo.png).*)",
//     ],

// };
